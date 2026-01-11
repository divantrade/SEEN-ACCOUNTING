// ==================== بوت تليجرام لنظام SEEN المحاسبي ====================
/**
 * ملف بوت تليجرام الرئيسي
 * يتعامل مع استقبال الرسائل وإرسال الردود وإدارة المحادثات
 */

// ==================== إعدادات البوت ====================
/**
 * معالجة التحديثات المعلقة (للاستخدام مع Time Trigger)
 * شغّل هذه الدالة كل دقيقة عبر Trigger
 */
/**
 * معالجة التحديثات المعلقة (Long Polling Loop)
 * يعمل هذا الإصدار لمدة 50 ثانية تقريباً للحفاظ على الاتصال مفتوحاً
 * مما يوفر استجابة شبه فورية (Real-time) دون الحاجة للويب هوك
 */
function processPendingUpdates() {
    const token = getBotToken();
    const cache = CacheService.getScriptCache();

    // بدء المؤقت
    const startTime = new Date().getTime();
    // الحد الأقصى للتنفيذ: 50 ثانية (لترك هامش أمان 10 ثوان قبل الدقيقة التالية)
    const MAX_EXECUTION_TIME = 50000;

    console.log('🔄 Starting Long Polling Loop...');

    // حلقة تكرار تستمر حتى انتهاء الوقت المسموح
    while (new Date().getTime() - startTime < MAX_EXECUTION_TIME) {

        // جلب الـ offset الحالي في كل دورة
        let offset = parseInt(cache.get('telegram_offset') || '0');

        try {
            // timeout=5: تليجرام ينتظر 5 ثوان إذا لم تكن هناك رسائل (Long Polling)
            // إذا وصلت رسالة، يرد فوراً.
            const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=5`;
            const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
            const data = JSON.parse(response.getContentText());

            if (data.ok && data.result.length > 0) {
                console.log(`📥 Received ${data.result.length} updates`);

                for (const update of data.result) {
                    try {
                        if (update.message) {
                            handleMessage(update.message);
                        } else if (update.callback_query) {
                            handleCallbackQuery(update.callback_query);
                        }
                        // تحديث الـ offset لتجاوز هذه الرسالة مستقبلاً
                        offset = update.update_id + 1;
                    } catch (e) {
                        console.log('Error processing update: ' + e.message);
                    }
                }

                // حفظ آخر offset بعد المعالجة
                cache.put('telegram_offset', String(offset), 21600);

                // بما أننا وجدنا رسائل، نكمل الحلقة فوراً لجلب المزيد دون انتظار
            } else {
                // إذا لم توجد رسائل، الـ timeout في الرابط تكفل بالانتظار 5 ثوان
                // لا داعي لعمل Utilities.sleep هنا
            }

        } catch (e) {
            console.log('🔥 Error in polling loop: ' + e.message);
            // انتظار بسيط عند الخطأ لتجنب التكرار السريع جداً
            Utilities.sleep(1000);
        }
    }

    console.log('⏹️ Polling Loop finished (Time limit reached).');
}

/**
 * إعداد مشغل زمني (Trigger) للعمل بنظام Polling
 * بديل للويب هوك في حالة فشله
 */
function setupPollingTrigger() {
    // 1. حذف التغييرات القديمة لتجنب التكرار
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
        if (trigger.getHandlerFunction() === 'processPendingUpdates') {
            ScriptApp.deleteTrigger(trigger);
        }
    }

    // 2. إنشاء مشغل جديد كل دقيقة
    ScriptApp.newTrigger('processPendingUpdates')
        .timeBased()
        .everyMinutes(1)
        .create();

    // 3. حذف الويب هوك لتجنب التضارب
    try {
        deleteWebhookWithDrop();
    } catch (e) {
        console.log('Error deleting webhook: ' + e.message);
    }

    console.log('✅ تم تفعيل نظام Polling بنجاح (كل دقيقة).');
    console.log('تم حذف Webhook القديم لتجنب التضارب.');
}
/**
 * الحصول على Token البوت من Script Properties
 */
function getBotToken() {
    const token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
    if (!token) {
        throw new Error('لم يتم تعيين TELEGRAM_BOT_TOKEN في Script Properties');
    }
    return token;
}

/**
 * تعيين Token البوت
 * يتم استدعاؤها مرة واحدة عند الإعداد
 */
function setBotToken(token) {
    PropertiesService.getScriptProperties().setProperty('TELEGRAM_BOT_TOKEN', token);
    Logger.log('تم تعيين Token البوت بنجاح');
}

/**
 * الحصول على Chat ID للمحاسب (للإشعارات)
 */
function getAccountantChatId() {
    return PropertiesService.getScriptProperties().getProperty('ACCOUNTANT_CHAT_ID');
}

/**
 * تعيين Chat ID للمحاسب
 */
function setAccountantChatId(chatId) {
    PropertiesService.getScriptProperties().setProperty('ACCOUNTANT_CHAT_ID', chatId);
    Logger.log('تم تعيين Chat ID للمحاسب: ' + chatId);
}

/**
 * تسجيل قائمة الأوامر في تليجرام
 * شغّل هذه الدالة مرة واحدة لإظهار الأوامر في البوت
 * ملاحظة: تليجرام يقبل فقط أحرف إنجليزية صغيرة في الأوامر
 * لكن البوت يفهم أيضاً الأوامر العربية (مثل /مصروف)
 */
function setBotCommands() {
    const token = getBotToken();

    // الأوامر بالإنجليزية للقائمة (تليجرام لا يقبل العربية هنا)
    // لكن المستخدم يمكنه كتابة /مصروف أو /expense - كلاهما يعمل
    const commands = [
        { command: 'start', description: '🏠 البداية' },
        { command: 'expense', description: '📤 مصروف جديد' },
        { command: 'revenue', description: '📥 إيراد جديد' },
        { command: 'finance', description: '🏦 تمويل (قرض/سداد)' },
        { command: 'insurance', description: '🔐 تأمين (دفع/استرداد)' },
        { command: 'transfer', description: '🔄 تحويل داخلي' },
        { command: 'status', description: '📊 حالة حركاتك' },
        { command: 'help', description: '❓ المساعدة' },
        { command: 'cancel', description: '❌ إلغاء' }
    ];

    const url = `https://api.telegram.org/bot${token}/setMyCommands`;

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ commands: commands }),
        muteHttpExceptions: true
    };

    try {
        const response = UrlFetchApp.fetch(url, options);
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            Logger.log('✅ تم تسجيل الأوامر بنجاح!');
            Logger.log('الأوامر المسجلة: ' + commands.map(c => '/' + c.command).join(', '));
            Logger.log('💡 ملاحظة: يمكن للمستخدم كتابة الأوامر بالعربية أيضاً (مثل /مصروف)');
        } else {
            Logger.log('❌ فشل تسجيل الأوامر: ' + result.description);
        }

        return result;
    } catch (error) {
        Logger.log('❌ خطأ: ' + error.message);
        return { ok: false, error: error.message };
    }
}

/**
 * حذف قائمة الأوامر من تليجرام
 */
function deleteBotCommands() {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/deleteMyCommands`;

    try {
        const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        const result = JSON.parse(response.getContentText());
        Logger.log(result.ok ? '✅ تم حذف الأوامر' : '❌ فشل: ' + result.description);
        return result;
    } catch (error) {
        Logger.log('❌ خطأ: ' + error.message);
        return { ok: false, error: error.message };
    }
}

/**
 * الحصول على الأوامر المسجلة حالياً
 */
function getMyCommands() {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/getMyCommands`;

    try {
        const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            Logger.log('📋 الأوامر المسجلة حالياً:');
            if (result.result.length === 0) {
                Logger.log('⚠️ لا توجد أوامر مسجلة!');
            } else {
                result.result.forEach(cmd => {
                    Logger.log(`  /${cmd.command} - ${cmd.description}`);
                });
            }
        } else {
            Logger.log('❌ فشل: ' + result.description);
        }
        return result;
    } catch (error) {
        Logger.log('❌ خطأ: ' + error.message);
        return { ok: false, error: error.message };
    }
}

/**
 * تعيين زر قائمة الأوامر (☰)
 * type: 'commands' لإظهار قائمة الأوامر
 * type: 'default' للسلوك الافتراضي
 */
function setChatMenuButton(type) {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/setChatMenuButton`;

    const menuButton = type === 'commands'
        ? { type: 'commands' }
        : { type: 'default' };

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ menu_button: menuButton }),
        muteHttpExceptions: true
    };

    try {
        const response = UrlFetchApp.fetch(url, options);
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            Logger.log('✅ تم تعيين زر القائمة بنجاح!');
        } else {
            Logger.log('❌ فشل: ' + result.description);
        }
        return result;
    } catch (error) {
        Logger.log('❌ خطأ: ' + error.message);
        return { ok: false, error: error.message };
    }
}

/**
 * إعداد القائمة الكاملة (الأوامر + الزر)
 * شغّل هذه الدالة مرة واحدة لإظهار قائمة الأوامر
 */
function setupBotMenu() {
    Logger.log('🔄 إعداد قائمة البوت...\n');

    // 1. تسجيل الأوامر
    Logger.log('1️⃣ تسجيل الأوامر:');
    const commandsResult = setBotCommands();

    // 2. تعيين زر القائمة
    Logger.log('\n2️⃣ تعيين زر القائمة:');
    const menuResult = setChatMenuButton('commands');

    // 3. التحقق
    Logger.log('\n3️⃣ التحقق من الأوامر المسجلة:');
    getMyCommands();

    if (commandsResult.ok && menuResult.ok) {
        Logger.log('\n✅ تم إعداد القائمة بالكامل!');
        Logger.log('📱 أغلق محادثة البوت وأعد فتحها لرؤية التغييرات.');
    } else {
        Logger.log('\n⚠️ حدث خطأ في بعض الخطوات');
    }
}

// ==================== Webhook ====================

/**
 * إعداد Webhook للبوت
 * يجب استدعاؤها بعد نشر السكريبت كـ Web App
 */
function setWebhook() {
    const token = getBotToken();
    const webAppUrl = ScriptApp.getService().getUrl();

    const url = `https://api.telegram.org/bot${token}/setWebhook?url=${webAppUrl}`;

    const response = UrlFetchApp.fetch(url);
    const result = JSON.parse(response.getContentText());

    Logger.log('Webhook setup result: ' + JSON.stringify(result));

    if (result.ok) {
        SpreadsheetApp.getUi().alert('✅ تم إعداد Webhook بنجاح!\n\nالبوت جاهز للاستخدام.');
    } else {
        SpreadsheetApp.getUi().alert('❌ فشل إعداد Webhook:\n' + result.description);
    }

    return result;
}

/**
 * حذف Webhook مع إسقاط التحديثات العالقة
 * هذا هو الحل لمشكلة التكرار
 */
function deleteWebhookWithDrop() {
    const token = getBotToken();
    // خيار drop_pending_updates غير موجود في deleteWebhook مباشرة في التوثيق القديم
    // لكن يمكن تحقيقه بإعادة تعيين الويب هوك مع الرابط
    // أو استخدام أمر deleteWebhook مع المعامل if supported

    // الطريقة الأضمن: setWebhook برابط فارغ ثم setWebhook جديد
    // لكن api تليجرام يدعم drop_pending_updates في setWebhook أو deleteWebhook

    const url = `https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=true`;

    const response = UrlFetchApp.fetch(url);
    const result = JSON.parse(response.getContentText());

    Logger.log('Delete Webhook result: ' + JSON.stringify(result));
    return result;
}

/**
 * إصلاح كامل: حذف الويب هوك وتصفية الطابور ثم إعادة التعيين
 */
/**
 * إصلاح كامل: حذف الويب هوك وتصفية الطابور ثم إعادة التعيين
 * (نسخة آمنة بدون واجهة مستخدم للإصلاح السريع)
 */
function fullWebhookReset() {
    Logger.log('🔄 جاري عملية إعادة الضبط الكاملة...');

    // 1. حذف وتصفية
    const deleteResult = deleteWebhookWithDrop();

    if (!deleteResult.ok) {
        Logger.log('❌ فشل الحذف: ' + deleteResult.description);
        return;
    }
    Logger.log('✅ تم حذف Webhook وتصفية التحديثات العالقة.');

    // 2. انتظار قليل
    Utilities.sleep(2000);

    // 3. إعادة التعيين
    try {
        const token = getBotToken();
        const webAppUrl = ScriptApp.getService().getUrl();
        const url = `https://api.telegram.org/bot${token}/setWebhook?url=${webAppUrl}`;
        const response = UrlFetchApp.fetch(url);
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            Logger.log('✅ تم إعادة تعيين Webhook بنجاح!');
            Logger.log('الرابط: ' + webAppUrl);
        } else {
            Logger.log('❌ فشل تعيين Webhook: ' + result.description);
        }
    } catch (e) {
        Logger.log('❌ خطأ في إعادة التعيين: ' + e.message);
    }
}

/**
 * حذف Webhook
 */
function deleteWebhook() {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/deleteWebhook`;

    const response = UrlFetchApp.fetch(url);
    return JSON.parse(response.getContentText());
}

/**
 * تفريغ طابور الرسائل العالقة يدوياً
 * استخدم هذه الدالة عندما يفشل fullWebhookReset
 */
function flushPendingUpdates() {
    Logger.log('🧹 جاري تفريغ طابور الرسائل العالقة...');

    const token = getBotToken();

    // 1. حذف الويب هوك أولاً
    Logger.log('1️⃣ حذف Webhook...');
    const deleteUrl = `https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=true`;
    const deleteResponse = UrlFetchApp.fetch(deleteUrl);
    const deleteResult = JSON.parse(deleteResponse.getContentText());
    Logger.log('Delete result: ' + JSON.stringify(deleteResult));

    // 2. انتظار قليل
    Utilities.sleep(2000);

    // 3. استخدام getUpdates لسحب جميع الرسائل وتخطيها
    Logger.log('2️⃣ سحب جميع التحديثات العالقة...');
    const getUrl = `https://api.telegram.org/bot${token}/getUpdates?timeout=1`;
    const getResponse = UrlFetchApp.fetch(getUrl);
    const updates = JSON.parse(getResponse.getContentText());

    if (updates.ok && updates.result.length > 0) {
        const lastUpdateId = updates.result[updates.result.length - 1].update_id;
        Logger.log('📊 وجدنا ' + updates.result.length + ' رسائل عالقة');
        Logger.log('آخر update_id: ' + lastUpdateId);

        // 4. تخطي جميع الرسائل باستخدام offset
        const offsetUrl = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=1`;
        UrlFetchApp.fetch(offsetUrl);
        Logger.log('✅ تم تخطي جميع الرسائل العالقة');
    } else {
        Logger.log('ℹ️ لا توجد رسائل عالقة');
    }

    // 5. إعادة تعيين الويب هوك
    Logger.log('3️⃣ إعادة تعيين Webhook...');
    const webAppUrl = ScriptApp.getService().getUrl();
    const setUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${webAppUrl}`;
    const setResponse = UrlFetchApp.fetch(setUrl);
    const setResult = JSON.parse(setResponse.getContentText());

    if (setResult.ok) {
        Logger.log('✅ تم إعادة تعيين Webhook بنجاح!');
        Logger.log('الرابط: ' + webAppUrl);
        Logger.log('🎉 انتهى! جرب إرسال رسالة جديدة للبوت الآن');
    } else {
        Logger.log('❌ فشل تعيين Webhook: ' + setResult.description);
    }
}

/**
 * اختبار صلاحية Token البوت
 * يتحقق من أن التوكن صحيح ويعرض معلومات البوت
 */
function testBotToken() {
    try {
        const token = getBotToken();
        const url = `https://api.telegram.org/bot${token}/getMe`;

        const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            const bot = result.result;
            const message = `✅ Token صحيح!\n\n` +
                `🤖 اسم البوت: ${bot.first_name}\n` +
                `📛 Username: @${bot.username}\n` +
                `🆔 Bot ID: ${bot.id}`;

            SpreadsheetApp.getUi().alert('✅ اختبار Token', message, SpreadsheetApp.getUi().ButtonSet.OK);
            Logger.log('Bot Token is valid: ' + JSON.stringify(bot));
            return { success: true, bot: bot };
        } else {
            SpreadsheetApp.getUi().alert('❌ Token غير صحيح',
                `الخطأ: ${result.description}\n\n` +
                'يرجى الحصول على Token جديد من @BotFather',
                SpreadsheetApp.getUi().ButtonSet.OK);
            Logger.log('Bot Token invalid: ' + result.description);
            return { success: false, error: result.description };
        }
    } catch (error) {
        SpreadsheetApp.getUi().alert('❌ خطأ', error.message, SpreadsheetApp.getUi().ButtonSet.OK);
        Logger.log('Error testing token: ' + error.message);
        return { success: false, error: error.message };
    }
}

/**
 * تحديث Token وإعداد Webhook
 * يسأل عن Token جديد ويقوم بإعداد كل شيء
 */
function updateBotTokenAndSetup() {
    const ui = SpreadsheetApp.getUi();

    const result = ui.prompt(
        '🔐 تحديث Bot Token',
        'الصق الـ Token الجديد من @BotFather:\n\n' +
        '(مثال: 123456789:ABCdefGHI...)',
        ui.ButtonSet.OK_CANCEL
    );

    if (result.getSelectedButton() !== ui.Button.OK) {
        return;
    }

    const newToken = result.getResponseText().trim();
    if (!newToken) {
        ui.alert('❌ خطأ', 'لم يتم إدخال Token', ui.ButtonSet.OK);
        return;
    }

    // اختبار التوكن الجديد
    try {
        const testUrl = `https://api.telegram.org/bot${newToken}/getMe`;
        const response = UrlFetchApp.fetch(testUrl, { muteHttpExceptions: true });
        const testResult = JSON.parse(response.getContentText());

        if (!testResult.ok) {
            ui.alert('❌ Token غير صحيح',
                `الخطأ: ${testResult.description}\n\n` +
                'تأكد من نسخ التوكن بشكل صحيح من @BotFather',
                ui.ButtonSet.OK);
            return;
        }

        // حفظ التوكن الجديد
        PropertiesService.getScriptProperties().setProperty('TELEGRAM_BOT_TOKEN', newToken);
        Logger.log('New token saved for bot: @' + testResult.result.username);

        // إعداد Webhook
        const webAppUrl = ScriptApp.getService().getUrl();
        const webhookUrl = `https://api.telegram.org/bot${newToken}/setWebhook?url=${encodeURIComponent(webAppUrl)}`;

        const webhookResponse = UrlFetchApp.fetch(webhookUrl, { muteHttpExceptions: true });
        const webhookResult = JSON.parse(webhookResponse.getContentText());

        if (webhookResult.ok) {
            ui.alert('✅ تم بنجاح!',
                `تم تحديث Token وإعداد Webhook بنجاح!\n\n` +
                `🤖 البوت: @${testResult.result.username}\n` +
                `🔗 Webhook URL: ${webAppUrl}\n\n` +
                `البوت جاهز للاستخدام!`,
                ui.ButtonSet.OK);
        } else {
            ui.alert('⚠️ تم حفظ Token لكن فشل Webhook',
                `تم حفظ Token بنجاح\n` +
                `لكن فشل إعداد Webhook: ${webhookResult.description}\n\n` +
                `حاول تشغيل setWebhook مرة أخرى`,
                ui.ButtonSet.OK);
        }

    } catch (error) {
        ui.alert('❌ خطأ', error.message, ui.ButtonSet.OK);
    }
}

/**
 * تعيين Webhook يدوياً برابط محدد
 * استخدم هذه الدالة إذا لم تعمل setWebhook تلقائياً
 */
/**
 * تعيين Webhook يدوياً برابط محدد
 * (تم التعديل لتعمل من المحرر مباشرة)
 */
function setWebhookManually() {
    // 👇👇👇 أدخل رابط الـ Web App (المنتهي بـ /exec) هنا بين علامتي التنصيص 👇👇👇
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxmdDeGESS8LSTXmeMIgP958MhUqQDPlT0ZO_0yKfVWpbHpENACBwR0PCrqn4cJldUz6Q/exec';
    // 👆👆👆 تم وضع الرابط الخاص بك 👆👆👆

    Logger.log('🔄 جاري تعيين Webhook يدوياً...');
    Logger.log('الرابط المستخدم: ' + webAppUrl);

    if (webAppUrl === 'PUT_YOUR_EXEC_URL_HERE' || !webAppUrl.includes('/exec')) {
        Logger.log('❌ خطأ: لم يتم وضع الرابط الصحيح!');
        Logger.log('⚠️ التعليمات:');
        Logger.log('1. انسخ رابط الـ Web App (Type: Web App) من Deploy > Manage deployments');
        Logger.log('2. ألصقه مكان "PUT_YOUR_EXEC_URL_HERE" في السطر 239 تقريباً');
        Logger.log('3. اضغط Run مرة أخرى');
        return;
    }

    try {
        const token = getBotToken();
        const url = `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webAppUrl)}`;

        const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        const webhookResult = JSON.parse(response.getContentText());

        if (webhookResult.ok) {
            Logger.log('✅ تم بنجاح!');
            Logger.log(`تم ربط البوت بالرابط: ${webAppUrl}`);
            Logger.log('جرب إرسال /start للبوت الآن.');
        } else {
            Logger.log('❌ فشل تعيين Webhook: ' + webhookResult.description);
        }
    } catch (error) {
        Logger.log('❌ خطأ: ' + error.message);
    }
}

/**
 * عرض حالة Webhook الحالية
 */
function getWebhookInfo() {
    try {
        const token = getBotToken();
        const url = `https://api.telegram.org/bot${token}/getWebhookInfo`;

        const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            const info = result.result;
            let message = `📡 معلومات Webhook:\n\n`;
            message += `🔗 URL: ${info.url || '(غير معين)'}\n`;
            message += `⏳ Pending updates: ${info.pending_update_count}\n`;

            if (info.last_error_date) {
                const errorDate = new Date(info.last_error_date * 1000);
                message += `\n❌ آخر خطأ:\n`;
                message += `📅 التاريخ: ${errorDate.toLocaleString('ar-EG')}\n`;
                message += `💬 الرسالة: ${info.last_error_message}`;
            }

            SpreadsheetApp.getUi().alert('📡 Webhook Info', message, SpreadsheetApp.getUi().ButtonSet.OK);
            Logger.log('Webhook info: ' + JSON.stringify(info));
            return info;
        } else {
            SpreadsheetApp.getUi().alert('❌ خطأ', result.description, SpreadsheetApp.getUi().ButtonSet.OK);
            return null;
        }
    } catch (error) {
        SpreadsheetApp.getUi().alert('❌ خطأ', error.message, SpreadsheetApp.getUi().ButtonSet.OK);
        return null;
    }
}

/**
 * معالجة الطلبات الواردة من تليجرام (Webhook endpoint)
 */
/**
 * معالجة الطلبات الواردة من تليجرام (Webhook endpoint)
 */
// ==================== Debugging Helper ====================
function logToSheet(message) {
    // ⚠️ تم إيقاف الكتابة في الشيت لأنها تسبب بطء شديد وتوقف البوت (Timeout)
    // ⚡️ نستخدم console.log بدلاً منها (سريع جداً)
    console.log(message);
}

function doPost(e) {
    logToSheet('🚀 doPost Triggered!');

    let debugChatId = null;
    try {
        if (!e || !e.postData || !e.postData.contents) {
            logToSheet('❌ No postData received');
            return ContentService.createTextOutput('OK');
        }

        const update = JSON.parse(e.postData.contents);
        logToSheet('📨 Payload: ' + JSON.stringify(update));

        const updateId = String(update.update_id);

        // ============================================================
        // 🔒 منع التكرار القوي (Anti-Loop Protection)
        // ============================================================
        const cache = CacheService.getScriptCache();
        if (cache.get(updateId)) {
            logToSheet('⚠️ Duplicate update detected: ' + updateId);
            // ⚡️ FAST EXIT (JSON)
            return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
        }
        cache.put(updateId, 'processed', 21600);
        logToSheet('✅ New update processed: ' + updateId);

        // ... rest of the logic ...

        if (update.message) {
            debugChatId = update.message.chat.id;
            logToSheet('📩 Message detected from chatId: ' + debugChatId);
        } else if (update.callback_query) {
            debugChatId = update.callback_query.message.chat.id;
            logToSheet('🔘 Callback query detected from chatId: ' + debugChatId);
        }

        logToSheet('🔄 About to handle message/callback...');

        if (update.message) {
            handleMessage(update.message);
            logToSheet('✔️ handleMessage completed');
        } else if (update.callback_query) {
            handleCallbackQuery(update.callback_query);
            logToSheet('✔️ handleCallbackQuery completed');
        }

        logToSheet('✅ doPost completed successfully');
        return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        logToSheet('🔥 FATAL ERROR: ' + error.message);
        logToSheet('🔥 Stack: ' + error.stack);
        return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * للاختبار - Web App GET
 * يعرض رقم الإصدار للتحقق من النشر
 */
const BOT_VERSION = '5.2.3'; // [v5.2.2 Connection Check]

function doGet(e) {
    return ContentService.createTextOutput('SEEN Accounting Bot v' + BOT_VERSION + ' is running!');
}

/**
 * إرسال رسالة اختبار للتحقق من عمل البوت
 * شغّل هذه الدالة من Apps Script
 */
function sendTestMessage() {
    const ui = SpreadsheetApp.getUi();

    const result = ui.prompt(
        '📤 إرسال رسالة اختبار',
        'أدخل Chat ID الخاص بك (يمكنك الحصول عليه من @userinfobot):',
        ui.ButtonSet.OK_CANCEL
    );

    if (result.getSelectedButton() !== ui.Button.OK) {
        return;
    }

    const chatId = result.getResponseText().trim();
    if (!chatId) {
        ui.alert('❌ خطأ', 'لم يتم إدخال Chat ID', ui.ButtonSet.OK);
        return;
    }

    try {
        const response = sendMessage(chatId,
            '✅ *رسالة اختبار*\n\n' +
            'البوت يعمل بشكل صحيح!\n' +
            'الإصدار: ' + BOT_VERSION + '\n\n' +
            'جرب إرسال /start',
            null, 'Markdown');

        if (response && response.ok) {
            ui.alert('✅ نجاح', 'تم إرسال رسالة الاختبار بنجاح!', ui.ButtonSet.OK);
        } else {
            ui.alert('❌ فشل', 'فشل إرسال الرسالة: ' + JSON.stringify(response), ui.ButtonSet.OK);
        }
    } catch (error) {
        ui.alert('❌ خطأ', error.message, ui.ButtonSet.OK);
    }
}

// ==================== معالجة الرسائل ====================

/**
 * معالجة الرسائل الواردة
 */
function handleMessage(message) {
    const chatId = message.chat.id;
    const text = message.text || '';
    const contact = message.contact;
    const photo = message.photo;
    const document = message.document;

    // استخراج اسم المستخدم من تليجرام
    const username = message.from ? message.from.username : null;

    logToSheet('═══ handleMessage START ═══');
    logToSheet('chatId: ' + chatId + ', text: "' + text + '", username: ' + username);
    logToSheet('has contact: ' + (contact ? 'YES' : 'NO'));

    // التحقق من المستخدم
    const userPhone = getUserPhoneFromMessage(message);
    logToSheet('userPhone extracted: ' + userPhone);

    logToSheet('Calling checkUserAuthorization...');
    const authResult = checkUserAuthorization(userPhone, chatId, username);
    logToSheet('authResult: ' + JSON.stringify(authResult));

    if (!authResult.authorized) {
        logToSheet('⛔ User NOT authorized');
        // إذا لم يتم مشاركة رقم الهاتف بعد، نطلبه (حتى لو كان لديه username)
        // لأن الـ username قد لا يكون مسجلاً في الشيت
        if (!userPhone) {
            logToSheet('Requesting phone number...');
            requestPhoneNumber(chatId);
            return;
        }
        // إذا شارك الهاتف ولكنه غير مصرح
        logToSheet('Sending unauthorized message...');
        sendMessage(chatId, CONFIG.TELEGRAM_BOT.MESSAGES.UNAUTHORIZED);
        return;
    }

    logToSheet('✅ User authorized: ' + authResult.name);

    // حفظ بيانات المستخدم في الجلسة
    const userSession = getUserSession(chatId);
    userSession.userName = authResult.name;
    userSession.permission = authResult.permission;
    userSession.authorized = true; // علامة للتحقق السريع
    if (username) {
        userSession.username = username; // حفظ اسم المستخدم
    }
    saveUserSession(chatId, userSession); // حفظ الجلسة!
    logToSheet('Session saved for user');

    // معالجة رقم الهاتف المُرسل
    if (contact) {
        logToSheet('Processing contact...');
        handleContactReceived(chatId, contact, username);
        return;
    }

    // معالجة الصور والملفات
    if (photo || document) {
        logToSheet('Processing attachment...');
        handleAttachment(chatId, message);
        return;
    }

    // معالجة الأوامر
    // تنظيف النص من المسافات الزائدة (Trim)
    const cleanText = text.trim();

    if (cleanText.startsWith('/')) {
        logToSheet('Processing command: ' + cleanText);
        handleCommand(chatId, cleanText, userSession);
        return;
    }

    // معالجة النص حسب حالة المحادثة
    logToSheet('Processing text input based on state...');
    handleTextInput(chatId, text, userSession);
    logToSheet('═══ handleMessage END ═══');
}

/**
 * استخراج رقم الهاتف من الرسالة
 */
function getUserPhoneFromMessage(message) {
    if (message.contact && message.contact.phone_number) {
        return message.contact.phone_number;
    }

    // محاولة الحصول من الجلسة
    const session = getUserSession(message.chat.id);
    return session.phoneNumber || null;
}

/**
 * طلب رقم الهاتف من المستخدم
 */
function requestPhoneNumber(chatId) {
    const keyboard = {
        keyboard: [[{
            text: '📱 مشاركة رقم الهاتف',
            request_contact: true
        }]],
        resize_keyboard: true,
        one_time_keyboard: true
    };

    sendMessage(chatId,
        '👋 مرحباً!\n\nللتحقق من هويتك، يرجى مشاركة رقم هاتفك بالضغط على الزر أدناه:',
        keyboard
    );
}

/**
 * معالجة رقم الهاتف المُستلم
 */
function handleContactReceived(chatId, contact, username) {
    const phoneNumber = contact.phone_number;
    const session = getUserSession(chatId);

    session.phoneNumber = phoneNumber;
    saveUserSession(chatId, session);

    const authResult = checkUserAuthorization(phoneNumber, chatId, username);

    if (authResult.authorized) {
        session.userName = authResult.name;
        session.permission = authResult.permission;
        saveUserSession(chatId, session);

        // إزالة لوحة المفاتيح وإظهار الترحيب
        const removeKeyboard = { remove_keyboard: true };
        sendMessage(chatId,
            `✅ تم التحقق بنجاح!\n\nمرحباً ${authResult.name}`,
            removeKeyboard
        );

        // إرسال رسالة الترحيب بعد تأخير بسيط
        Utilities.sleep(500);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.WELCOME, null, 'Markdown');
    } else {
        sendMessage(chatId, CONFIG.TELEGRAM_BOT.MESSAGES.UNAUTHORIZED);
    }
}

/**
 * معالجة الأوامر
 */
function handleCommand(chatId, command, session) {
    const cmd = command.split(' ')[0].toLowerCase();
    logToSheet('═══ handleCommand ═══');
    logToSheet('Command: ' + cmd + ', chatId: ' + chatId);

    switch (cmd) {
        case '/start':
            logToSheet('Sending welcome message...');
            sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.WELCOME, null, 'Markdown');
            logToSheet('Welcome message sent');
            resetSession(chatId);
            break;

        case '/expense':
        case '/مصروف':
            logToSheet('Starting expense flow...');
            startExpenseFlow(chatId, session);
            break;

        case '/revenue':
        case '/ايراد':
            logToSheet('Starting revenue flow...');
            startRevenueFlow(chatId, session);
            break;

        case '/finance':
        case '/تمويل':
            logToSheet('Starting finance flow...');
            startFinanceFlow(chatId, session);
            break;

        case '/insurance':
        case '/تأمين':
            logToSheet('Starting insurance flow...');
            startInsuranceFlow(chatId, session);
            break;

        case '/transfer':
        case '/تحويل':
            logToSheet('Starting transfer flow...');
            startTransferFlow(chatId, session);
            break;

        case '/status':
        case '/حالة':
            logToSheet('Showing status...');
            showUserTransactionsStatus(chatId, session);
            break;

        case '/help':
        case '/مساعدة':
            logToSheet('Sending help...');
            sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.HELP, null, 'Markdown');
            break;

        case '/cancel':
        case '/الغاء':
            logToSheet('Cancelling...');
            resetSession(chatId);
            sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.CANCELLED);
            break;

        default:
            logToSheet('Unknown command');
            sendMessage(chatId, '❓ أمر غير معروف\n\nاستخدم /help لعرض الأوامر المتاحة');
    }
    logToSheet('═══ handleCommand END ═══');
}

/**
 * بدء تدفق المصروفات
 */
function startExpenseFlow(chatId, session) {
    try {
        Logger.log('startExpenseFlow - chatId: ' + chatId);

        session.transactionType = 'expense';
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
        session.data = {};
        saveUserSession(chatId, session);

        const keyboard = {
            inline_keyboard: [
                [
                    { text: '📤 استحقاق مصروف (فاتورة)', callback_data: 'nature_استحقاق مصروف' }
                ],
                [
                    { text: '💸 دفعة مصروف (سداد)', callback_data: 'nature_دفعة مصروف' }
                ],
                [
                    { text: '❌ إلغاء', callback_data: 'cancel' }
                ]
            ]
        };

        const result = sendMessage(chatId, '💰 *تسجيل مصروف*\n\nاختر نوع الحركة:', keyboard, 'Markdown');
        Logger.log('startExpenseFlow - sendMessage result: ' + JSON.stringify(result));
    } catch (error) {
        Logger.log('Error in startExpenseFlow: ' + error.message + '\nStack: ' + error.stack);
        sendMessage(chatId, '❌ خطأ في بدء تسجيل المصروف: ' + error.message);
    }
}

/**
 * بدء تدفق الإيرادات
 */
function startRevenueFlow(chatId, session) {
    session.transactionType = 'revenue';
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
    session.data = {};
    saveUserSession(chatId, session);

    const keyboard = {
        inline_keyboard: [
            [
                { text: '📥 استحقاق إيراد (فاتورة)', callback_data: 'nature_استحقاق إيراد' }
            ],
            [
                { text: '💰 تحصيل إيراد (استلام)', callback_data: 'nature_تحصيل إيراد' }
            ],
            [
                { text: '❌ إلغاء', callback_data: 'cancel' }
            ]
        ]
    };

    sendMessage(chatId, '📈 *تسجيل إيراد*\n\nاختر نوع الحركة:', keyboard, 'Markdown');
}

/**
 * بدء تدفق التمويل
 */
function startFinanceFlow(chatId, session) {
    session.transactionType = 'finance';
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
    session.data = {};
    saveUserSession(chatId, session);

    const keyboard = {
        inline_keyboard: [
            [
                { text: '🏦 تمويل (دخول قرض)', callback_data: 'nature_تمويل (دخول قرض)' }
            ],
            [
                { text: '💳 سداد تمويل', callback_data: 'nature_سداد تمويل' }
            ],
            [
                { text: '❌ إلغاء', callback_data: 'cancel' }
            ]
        ]
    };

    sendMessage(chatId, '🏦 *تسجيل تمويل*\n\nاختر نوع الحركة:', keyboard, 'Markdown');
}

/**
 * بدء تدفق التأمين
 */
function startInsuranceFlow(chatId, session) {
    session.transactionType = 'insurance';
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
    session.data = {};
    saveUserSession(chatId, session);

    const keyboard = {
        inline_keyboard: [
            [
                { text: '🔒 تأمين مدفوع للقناة', callback_data: 'nature_تأمين مدفوع للقناة' }
            ],
            [
                { text: '🔓 استرداد تأمين من القناة', callback_data: 'nature_استرداد تأمين من القناة' }
            ],
            [
                { text: '❌ إلغاء', callback_data: 'cancel' }
            ]
        ]
    };

    sendMessage(chatId, '🔐 *تسجيل تأمين*\n\nاختر نوع الحركة:', keyboard, 'Markdown');
}

/**
 * بدء تدفق التحويل الداخلي
 */
function startTransferFlow(chatId, session) {
    session.transactionType = 'transfer';
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
    session.data = {};
    session.data.nature = 'تحويل داخلي';
    saveUserSession(chatId, session);

    // التحويل الداخلي نوع واحد فقط، ننتقل مباشرة للتصنيف
    sendMessage(chatId, '🔄 *تسجيل تحويل داخلي*\n\n📊 اختر تصنيف التحويل:', BOT_CONFIG.KEYBOARDS.CLASSIFICATION, 'Markdown');

    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_CLASSIFICATION;
    saveUserSession(chatId, session);
}

/**
 * معالجة النص المُدخل
 */
function handleTextInput(chatId, text, session) {
    const state = session.state || BOT_CONFIG.CONVERSATION_STATES.IDLE;

    switch (state) {
        case BOT_CONFIG.CONVERSATION_STATES.WAITING_PROJECT:
            handleProjectSearch(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_ITEM:
            handleItemSearch(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_PARTY:
            handlePartySearch(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT:
            handleAmountInput(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_EXCHANGE_RATE:
            handleExchangeRateInput(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_DETAILS:
            handleDetailsInput(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_WEEKS:
            handleWeeksInput(chatId, text, session);
            break;

        case BOT_CONFIG.CONVERSATION_STATES.WAITING_CUSTOM_DATE:
            handleCustomDateInput(chatId, text, session);
            break;

        default:
            sendMessage(chatId, '[v5.0 DEBUG] ❓ أمر غير معروف\n\nتأكد من كتابة الأمر بشكل صحيح (مثال: /expense)');
    }
}

// ==================== معالجة Callback Queries ====================

/**
 * معالجة الضغط على الأزرار
 */
function handleCallbackQuery(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;
    const callbackId = callbackQuery.id;

    // الرد على الـ callback لإزالة ساعة الانتظار
    answerCallbackQuery(callbackId);

    const session = getUserSession(chatId);

    // التحقق من المستخدم (بالهاتف أو اسم المستخدم أو علامة التفويض)
    if (!session.authorized && !session.phoneNumber && !session.username) {
        sendMessage(chatId, CONFIG.TELEGRAM_BOT.MESSAGES.UNAUTHORIZED + '\n\nأرسل /start للبدء من جديد');
        return;
    }

    // معالجة الإلغاء
    if (data === 'cancel') {
        resetSession(chatId);
        editMessage(chatId, messageId, BOT_CONFIG.INTERACTIVE_MESSAGES.CANCELLED);
        return;
    }

    // معالجة حسب نوع البيانات
    if (data.startsWith('nature_')) {
        handleNatureSelection(chatId, messageId, data.replace('nature_', ''), session);
    } else if (data.startsWith('class_')) {
        handleClassificationSelection(chatId, messageId, data.replace('class_', ''), session);
    } else if (data.startsWith('project_')) {
        handleProjectSelection(chatId, messageId, data.replace('project_', ''), session);
    } else if (data.startsWith('item_')) {
        handleItemSelection(chatId, messageId, data.replace('item_', ''), session);
    } else if (data.startsWith('party_')) {
        handlePartySelection(chatId, messageId, data.replace('party_', ''), session);
    } else if (data.startsWith('partytype_')) {
        handleNewPartyType(chatId, messageId, data.replace('partytype_', ''), session);
    } else if (data.startsWith('currency_')) {
        handleCurrencySelection(chatId, messageId, data.replace('currency_', ''), session);
    } else if (data.startsWith('payment_')) {
        handlePaymentMethodSelection(chatId, messageId, data.replace('payment_', ''), session);
    } else if (data.startsWith('term_')) {
        handlePaymentTermSelection(chatId, messageId, data.replace('term_', ''), session);
    } else if (data.startsWith('attach_')) {
        handleAttachmentChoice(chatId, messageId, data.replace('attach_', ''), session);
    } else if (data.startsWith('confirm_')) {
        handleConfirmation(chatId, messageId, data.replace('confirm_', ''), session);
    } else if (data.startsWith('editfield_')) {
        handleEditFieldSelection(chatId, messageId, data.replace('editfield_', ''), session);
    } else if (data === 'new_party') {
        handleNewPartyRequest(chatId, messageId, session);
    } else if (data === 'edit_resend') {
        handleEditAndResend(chatId, messageId, session);
    } else if (data === 'edit_delete') {
        handleDeleteRejected(chatId, messageId, session);
    }
}

/**
 * معالجة اختيار طبيعة الحركة
 */
function handleNatureSelection(chatId, messageId, nature, session) {
    session.data.nature = nature;

    // إذا كنا في وضع التعديل، نعود لشاشة اختيار الحقل
    if (session.data.isEditMode) {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_EDIT_FIELD;
        saveUserSession(chatId, session);
        showEditFieldSelection(chatId, messageId, session);
        return;
    }

    // الانتقال لاختيار التصنيف
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_CLASSIFICATION;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ طبيعة الحركة: *${nature}*`);
    sendMessage(chatId, '📊 *اختر تصنيف الحركة:*', BOT_CONFIG.KEYBOARDS.CLASSIFICATION, 'Markdown');
}

/**
 * معالجة اختيار تصنيف الحركة
 */
function handleClassificationSelection(chatId, messageId, classification, session) {
    session.data.classification = classification;

    // إذا كنا في وضع التعديل، نعود لشاشة اختيار الحقل
    if (session.data.isEditMode) {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_EDIT_FIELD;
        saveUserSession(chatId, session);
        showEditFieldSelection(chatId, messageId, session);
        return;
    }

    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PROJECT;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ تصنيف الحركة: *${classification}*`);
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_PROJECT, null, 'Markdown');
}

/**
 * عرض شاشة اختيار الحقل للتعديل (مساعدة)
 */
function showEditFieldSelection(chatId, messageId, session) {
    let summary = '✏️ *تعديل الحركة*\n';
    summary += '━━━━━━━━━━━━━━━━━━━━\n\n';
    summary += '📋 *البيانات المحدّثة:*\n\n';
    summary += `📤 *طبيعة الحركة:* ${session.data.nature || '-'}\n`;
    summary += `📊 *التصنيف:* ${session.data.classification || '-'}\n`;
    summary += `🎬 *المشروع:* ${session.data.projectName || '-'}\n`;
    summary += `📁 *البند:* ${session.data.item || '-'}\n`;
    summary += `👤 *الطرف:* ${session.data.partyName || '-'}\n`;
    summary += `💰 *المبلغ:* ${session.data.amount || 0} ${session.data.currency || 'USD'}\n`;
    summary += `📝 *التفاصيل:* ${session.data.details || '-'}\n\n`;
    summary += '━━━━━━━━━━━━━━━━━━━━\n';
    summary += '👇 *اختر حقل آخر للتعديل أو أرسل:*';

    editMessage(chatId, messageId, summary, BOT_CONFIG.KEYBOARDS.EDIT_FIELD_SELECT, 'Markdown');
}

/**
 * معالجة البحث عن مشروع
 */
function handleProjectSearch(chatId, searchText, session) {
    const projects = searchProjects(searchText);

    if (projects.length === 0) {
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.NO_RESULTS);
        return;
    }

    const buttons = projects.slice(0, 5).map(project => ([{
        text: `🎬 ${project.name}`,
        callback_data: `project_${project.code}`
    }]));

    buttons.push([{ text: '❌ إلغاء', callback_data: 'cancel' }]);

    const keyboard = { inline_keyboard: buttons };
    sendMessage(chatId, '🔍 *نتائج البحث:*', keyboard, 'Markdown');
}

/**
 * معالجة اختيار المشروع
 */
function handleProjectSelection(chatId, messageId, projectCode, session) {
    const project = getProjectByCode(projectCode);

    if (project) {
        session.data.projectCode = project.code;
        session.data.projectName = project.name;
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ITEM;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ المشروع: *${project.name}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_ITEM, null, 'Markdown');
    }
}

/**
 * معالجة البحث عن بند
 */
function handleItemSearch(chatId, searchText, session) {
    const items = searchItems(searchText);

    if (items.length === 0) {
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.NO_RESULTS);
        return;
    }

    const buttons = items.slice(0, 5).map(item => ([{
        text: `📋 ${item.name}`,
        callback_data: `item_${item.name}`
    }]));

    buttons.push([{ text: '❌ إلغاء', callback_data: 'cancel' }]);

    const keyboard = { inline_keyboard: buttons };
    sendMessage(chatId, '🔍 *نتائج البحث:*', keyboard, 'Markdown');
}

/**
 * معالجة اختيار البند
 */
function handleItemSelection(chatId, messageId, itemName, session) {
    session.data.item = itemName;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PARTY;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ البند: *${itemName}*`);
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_PARTY, null, 'Markdown');
}

/**
 * معالجة البحث عن طرف
 */
function handlePartySearch(chatId, searchText, session) {
    const parties = searchParties(searchText);

    const buttons = parties.slice(0, 5).map(party => ([{
        text: `👤 ${party.name} (${party.type})`,
        callback_data: `party_${party.name}`
    }]));

    // إضافة زر إضافة طرف جديد
    buttons.push([{
        text: `➕ إضافة "${searchText}" كطرف جديد`,
        callback_data: 'new_party'
    }]);

    // حفظ اسم الطرف الجديد المحتمل
    session.data.potentialNewParty = searchText;
    saveUserSession(chatId, session);

    buttons.push([{ text: '❌ إلغاء', callback_data: 'cancel' }]);

    const keyboard = { inline_keyboard: buttons };

    if (parties.length === 0) {
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.PARTY_NOT_FOUND, keyboard, 'Markdown');
    } else {
        sendMessage(chatId, '🔍 *نتائج البحث:*', keyboard, 'Markdown');
    }
}

/**
 * معالجة اختيار الطرف
 */
function handlePartySelection(chatId, messageId, partyName, session) {
    session.data.partyName = partyName;
    session.data.isNewParty = false;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ الطرف: *${partyName}*`);
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_AMOUNT, null, 'Markdown');
}

/**
 * معالجة طلب إضافة طرف جديد
 */
function handleNewPartyRequest(chatId, messageId, session) {
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NEW_PARTY_TYPE;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `➕ إضافة طرف جديد: *${session.data.potentialNewParty}*`);
    sendMessage(chatId, '📝 *اختر نوع الطرف:*', BOT_CONFIG.KEYBOARDS.NEW_PARTY_TYPE, 'Markdown');
}

/**
 * معالجة اختيار نوع الطرف الجديد
 */
function handleNewPartyType(chatId, messageId, partyType, session) {
    session.data.partyName = session.data.potentialNewParty;
    session.data.partyType = partyType;
    session.data.isNewParty = true;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ طرف جديد: *${session.data.partyName}* (${partyType})`);
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_AMOUNT, null, 'Markdown');
}

/**
 * معالجة إدخال المبلغ
 */
function handleAmountInput(chatId, text, session) {
    // تنظيف النص واستخراج الرقم
    const cleanText = text.replace(/[^\d.,]/g, '').replace(',', '.');
    const amount = parseFloat(cleanText);

    if (isNaN(amount) || amount <= 0) {
        sendMessage(chatId, '❌ المبلغ غير صحيح\n\nيرجى إدخال رقم صحيح (مثال: 500)');
        return;
    }

    session.data.amount = amount;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT; // نفس الحالة للعملة
    saveUserSession(chatId, session);

    sendMessage(chatId, `✅ المبلغ: *${amount}*\n\n${BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_CURRENCY}`,
        BOT_CONFIG.KEYBOARDS.CURRENCY, 'Markdown');
}

/**
 * معالجة اختيار العملة
 */
function handleCurrencySelection(chatId, messageId, currency, session) {
    session.data.currency = currency;

    if (currency === 'USD') {
        session.data.exchangeRate = 1;
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_DETAILS;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ العملة: *${currency}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_DETAILS, null, 'Markdown');
    } else {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_EXCHANGE_RATE;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ العملة: *${currency}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_EXCHANGE_RATE, null, 'Markdown');
    }
}

/**
 * معالجة إدخال سعر الصرف
 */
function handleExchangeRateInput(chatId, text, session) {
    const rate = parseFloat(text.replace(',', '.'));

    if (isNaN(rate) || rate <= 0) {
        sendMessage(chatId, '❌ سعر الصرف غير صحيح\n\nيرجى إدخال رقم صحيح');
        return;
    }

    session.data.exchangeRate = rate;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_DETAILS;
    saveUserSession(chatId, session);

    sendMessage(chatId, `✅ سعر الصرف: *${rate}*`, null, 'Markdown');
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_DETAILS, null, 'Markdown');
}

/**
 * معالجة إدخال التفاصيل
 */
function handleDetailsInput(chatId, text, session) {
    session.data.details = text;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PAYMENT_METHOD;
    saveUserSession(chatId, session);

    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_PAYMENT_METHOD,
        BOT_CONFIG.KEYBOARDS.PAYMENT_METHOD, 'Markdown');
}

/**
 * معالجة اختيار طريقة الدفع
 */
function handlePaymentMethodSelection(chatId, messageId, method, session) {
    session.data.paymentMethod = method;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PAYMENT_TERM;
    saveUserSession(chatId, session);

    editMessage(chatId, messageId, `✅ طريقة الدفع: *${method}*`);
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SELECT_PAYMENT_TERM,
        BOT_CONFIG.KEYBOARDS.PAYMENT_TERMS, 'Markdown');
}

/**
 * معالجة اختيار شرط الدفع
 */
function handlePaymentTermSelection(chatId, messageId, term, session) {
    session.data.paymentTermType = term;

    if (term === 'بعد التسليم') {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_WEEKS;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ شرط الدفع: *${term}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_WEEKS, null, 'Markdown');
    } else if (term === 'تاريخ مخصص') {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_CUSTOM_DATE;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ شرط الدفع: *${term}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ENTER_CUSTOM_DATE, null, 'Markdown');
    } else {
        // فوري - انتقل للمرفقات
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ATTACHMENT;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, `✅ شرط الدفع: *${term}*`);
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ASK_ATTACHMENT,
            BOT_CONFIG.KEYBOARDS.ATTACHMENT, 'Markdown');
    }
}

/**
 * معالجة إدخال عدد الأسابيع
 */
function handleWeeksInput(chatId, text, session) {
    const weeks = parseInt(text);

    if (isNaN(weeks) || weeks < 0 || weeks > 52) {
        sendMessage(chatId, '❌ عدد الأسابيع غير صحيح\n\nيرجى إدخال رقم بين 0 و 52');
        return;
    }

    session.data.weeks = weeks;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ATTACHMENT;
    saveUserSession(chatId, session);

    sendMessage(chatId, `✅ عدد الأسابيع: *${weeks}*`, null, 'Markdown');
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ASK_ATTACHMENT,
        BOT_CONFIG.KEYBOARDS.ATTACHMENT, 'Markdown');
}

/**
 * معالجة إدخال تاريخ مخصص
 */
function handleCustomDateInput(chatId, text, session) {
    // محاولة تحليل التاريخ
    const dateParts = text.split('/');
    if (dateParts.length !== 3) {
        sendMessage(chatId, '❌ صيغة التاريخ غير صحيحة\n\nيرجى إدخال التاريخ بصيغة: يوم/شهر/سنة');
        return;
    }

    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
        sendMessage(chatId, '❌ التاريخ غير صحيح\n\nيرجى التأكد من صحة التاريخ');
        return;
    }

    session.data.customDate = date;
    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ATTACHMENT;
    saveUserSession(chatId, session);

    const formattedDate = Utilities.formatDate(date, 'Asia/Istanbul', 'dd/MM/yyyy');
    sendMessage(chatId, `✅ تاريخ الاستحقاق: *${formattedDate}*`, null, 'Markdown');
    sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.ASK_ATTACHMENT,
        BOT_CONFIG.KEYBOARDS.ATTACHMENT, 'Markdown');
}

/**
 * معالجة اختيار المرفقات
 */
function handleAttachmentChoice(chatId, messageId, choice, session) {
    if (choice === 'skip') {
        session.data.attachmentUrl = '';
        showTransactionSummary(chatId, session);
    } else if (choice === 'yes') {
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ATTACHMENT;
        saveUserSession(chatId, session);

        editMessage(chatId, messageId, '📎 *إرفاق ملف*');
        sendMessage(chatId, BOT_CONFIG.INTERACTIVE_MESSAGES.SEND_ATTACHMENT, null, 'Markdown');
    }
}

/**
 * معالجة المرفقات (صور/ملفات)
 */
function handleAttachment(chatId, message) {
    const session = getUserSession(chatId);

    if (session.state !== BOT_CONFIG.CONVERSATION_STATES.WAITING_ATTACHMENT) {
        sendMessage(chatId, '❓ لم يتم طلب مرفق حالياً');
        return;
    }

    try {
        let fileId;
        let fileName;

        if (message.photo) {
            // أخذ أكبر حجم من الصورة
            const photo = message.photo[message.photo.length - 1];
            fileId = photo.file_id;
            fileName = 'photo.jpg';
        } else if (message.document) {
            fileId = message.document.file_id;
            fileName = message.document.file_name;
        }

        // حفظ الملف في Google Drive
        const attachmentUrl = saveAttachmentToDrive(fileId, fileName, session);
        session.data.attachmentUrl = attachmentUrl;
        saveUserSession(chatId, session);

        sendMessage(chatId, '✅ تم إرفاق الملف بنجاح!');
        showTransactionSummary(chatId, session);

    } catch (error) {
        Logger.log('Error handling attachment: ' + error.message);
        sendMessage(chatId, '❌ حدث خطأ في رفع الملف\n\nهل تريد المتابعة بدون مرفق؟',
            BOT_CONFIG.KEYBOARDS.ATTACHMENT);
    }
}

/**
 * عرض ملخص الحركة
 */
function showTransactionSummary(chatId, session) {
    const data = session.data;

    let summary = BOT_CONFIG.INTERACTIVE_MESSAGES.TRANSACTION_SUMMARY
        .replace('{nature}', data.nature)
        .replace('{project}', data.projectName || '-')
        .replace('{item}', data.item || '-')
        .replace('{party}', data.partyName + (data.isNewParty ? ' (جديد)' : ''))
        .replace('{amount}', data.amount)
        .replace('{currency}', data.currency)
        .replace('{details}', data.details || '-')
        .replace('{payment_method}', data.paymentMethod || '-')
        .replace('{payment_term}', data.paymentTermType || '-')
        .replace('{attachment}', data.attachmentUrl ? 'نعم ✓' : 'لا');

    session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_CONFIRMATION;
    saveUserSession(chatId, session);

    sendMessage(chatId, summary, BOT_CONFIG.KEYBOARDS.CONFIRMATION, 'Markdown');
}

/**
 * معالجة التأكيد
 */
function handleConfirmation(chatId, messageId, choice, session) {
    if (choice === 'yes') {
        // حفظ الحركة
        saveTransaction(chatId, session);
    } else if (choice === 'edit') {
        // العودة للتعديل
        sendMessage(chatId, '✏️ اختر الحقل الذي تريد تعديله:\n\n/الغاء للإلغاء والبدء من جديد');
        // TODO: إضافة أزرار لاختيار الحقل للتعديل
    } else if (choice === 'cancel') {
        resetSession(chatId);
        editMessage(chatId, messageId, BOT_CONFIG.INTERACTIVE_MESSAGES.CANCELLED);
    }
}

/**
 * حفظ الحركة
 */
function saveTransaction(chatId, session) {
    try {
        const data = session.data;

        // إعداد بيانات الحركة
        const transactionData = {
            date: new Date(),
            nature: data.nature,
            classification: data.classification,
            projectCode: data.projectCode,
            projectName: data.projectName,
            item: data.item,
            details: data.details,
            partyName: data.partyName,
            amount: data.amount,
            currency: data.currency,
            exchangeRate: data.exchangeRate,
            paymentMethod: data.paymentMethod,
            paymentTermType: data.paymentTermType,
            weeks: data.weeks,
            customDate: data.customDate,
            telegramUser: session.userName,
            chatId: chatId,
            attachmentUrl: data.attachmentUrl,
            isNewParty: data.isNewParty
        };

        // حفظ الحركة
        const result = addBotTransaction(transactionData);

        if (result.success) {
            // إذا كان طرف جديد، أضفه لشيت الأطراف
            if (data.isNewParty) {
                addBotParty({
                    name: data.partyName,
                    type: data.partyType,
                    telegramUser: session.userName,
                    chatId: chatId,
                    linkedTransactionId: result.transactionId
                });
            }

            // إرسال رسالة النجاح
            const successMessage = BOT_CONFIG.INTERACTIVE_MESSAGES.SUCCESS
                .replace('{id}', result.transactionId);
            sendMessage(chatId, successMessage, null, 'Markdown');

            // إرسال إشعار للمحاسب
            notifyAccountant(transactionData, result.transactionId);

            // مسح الجلسة
            resetSession(chatId);
        } else {
            sendMessage(chatId, CONFIG.TELEGRAM_BOT.MESSAGES.ERROR);
        }

    } catch (error) {
        Logger.log('Error saving transaction: ' + error.message);
        sendMessage(chatId, CONFIG.TELEGRAM_BOT.MESSAGES.ERROR);
    }
}

/**
 * معالجة طلب تعديل وإعادة إرسال حركة مرفوضة
 */
function handleEditAndResend(chatId, messageId, session) {
    try {
        // البحث عن آخر حركة مرفوضة لهذا المستخدم
        const sheet = getBotTransactionsSheet();
        const columns = BOT_CONFIG.BOT_TRANSACTIONS_COLUMNS;
        const data = sheet.getDataRange().getValues();

        let rejectedTransaction = null;
        let rejectedRowIndex = -1;
        let rejectionReason = '';

        // البحث من الأحدث للأقدم
        for (let i = data.length - 1; i >= 1; i--) {
            const row = data[i];
            const rowChatId = String(row[columns.TELEGRAM_CHAT_ID.index - 1]);
            const status = row[columns.REVIEW_STATUS.index - 1];

            if (rowChatId === String(chatId) && status === CONFIG.TELEGRAM_BOT.REVIEW_STATUS.REJECTED) {
                rejectedTransaction = row;
                rejectedRowIndex = i + 1;
                rejectionReason = row[columns.REVIEW_NOTES.index - 1] || '';
                break;
            }
        }

        if (!rejectedTransaction) {
            editMessage(chatId, messageId, '❌ لم يتم العثور على حركة مرفوضة للتعديل');
            return;
        }

        // استعادة البيانات للجلسة للتعديل
        session.data = {
            nature: rejectedTransaction[columns.NATURE.index - 1],
            classification: rejectedTransaction[columns.CLASSIFICATION.index - 1],
            projectCode: rejectedTransaction[columns.PROJECT_CODE.index - 1],
            projectName: rejectedTransaction[columns.PROJECT_NAME.index - 1],
            item: rejectedTransaction[columns.ITEM.index - 1],
            details: rejectedTransaction[columns.DETAILS.index - 1],
            partyName: rejectedTransaction[columns.PARTY_NAME.index - 1],
            amount: rejectedTransaction[columns.AMOUNT.index - 1],
            currency: rejectedTransaction[columns.CURRENCY.index - 1],
            exchangeRate: rejectedTransaction[columns.EXCHANGE_RATE.index - 1],
            paymentMethod: rejectedTransaction[columns.PAYMENT_METHOD.index - 1],
            paymentTermType: rejectedTransaction[columns.PAYMENT_TERM_TYPE.index - 1],
            weeks: rejectedTransaction[columns.WEEKS.index - 1],
            customDate: rejectedTransaction[columns.CUSTOM_DATE.index - 1],
            attachmentUrl: rejectedTransaction[columns.ATTACHMENT_URL.index - 1],
            isNewParty: rejectedTransaction[columns.IS_NEW_PARTY.index - 1] === 'نعم',
            originalRejectedRow: rejectedRowIndex,
            isEditMode: true
        };

        // الانتقال لوضع التعديل التفاعلي
        session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_EDIT_FIELD;
        saveUserSession(chatId, session);

        // عرض ملخص البيانات مع أزرار اختيار الحقل
        let summary = '✏️ *تعديل الحركة المرفوضة*\n';
        summary += '━━━━━━━━━━━━━━━━━━━━\n\n';

        if (rejectionReason) {
            summary += `❌ *سبب الرفض:* ${rejectionReason}\n\n`;
        }

        summary += '📋 *البيانات الحالية:*\n\n';
        summary += `📤 *طبيعة الحركة:* ${session.data.nature || '-'}\n`;
        summary += `📊 *التصنيف:* ${session.data.classification || '-'}\n`;
        summary += `🎬 *المشروع:* ${session.data.projectName || '-'}\n`;
        summary += `📁 *البند:* ${session.data.item || '-'}\n`;
        summary += `👤 *الطرف:* ${session.data.partyName || '-'}\n`;
        summary += `💰 *المبلغ:* ${session.data.amount || 0} ${session.data.currency || 'USD'}\n`;
        summary += `📝 *التفاصيل:* ${session.data.details || '-'}\n\n`;
        summary += '━━━━━━━━━━━━━━━━━━━━\n';
        summary += '👇 *اختر الحقل الذي تريد تعديله:*';

        editMessage(chatId, messageId, summary, BOT_CONFIG.KEYBOARDS.EDIT_FIELD_SELECT, 'Markdown');

    } catch (error) {
        Logger.log('Error in handleEditAndResend: ' + error.message);
        sendMessage(chatId, '❌ حدث خطأ أثناء استعادة البيانات. حاول مرة أخرى.');
    }
}

/**
 * معالجة اختيار الحقل للتعديل
 */
function handleEditFieldSelection(chatId, messageId, field, session) {
    try {
        if (field === 'submit') {
            // إرسال الحركة المعدلة
            submitEditedTransaction(chatId, messageId, session);
            return;
        }

        session.editingField = field;
        saveUserSession(chatId, session);

        switch (field) {
            case 'nature':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_NATURE;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `📤 *طبيعة الحركة الحالية:* ${session.data.nature || '-'}\n\n👇 اختر الطبيعة الجديدة:`,
                    BOT_CONFIG.KEYBOARDS.TRANSACTION_TYPE, 'Markdown');
                break;

            case 'classification':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_CLASSIFICATION;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `📊 *التصنيف الحالي:* ${session.data.classification || '-'}\n\n👇 اختر التصنيف الجديد:`,
                    BOT_CONFIG.KEYBOARDS.CLASSIFICATION, 'Markdown');
                break;

            case 'project':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PROJECT;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `🎬 *المشروع الحالي:* ${session.data.projectName || '-'}\n\n✍️ اكتب اسم المشروع للبحث:`);
                break;

            case 'item':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_ITEM;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `📁 *البند الحالي:* ${session.data.item || '-'}\n\n✍️ اكتب اسم البند للبحث:`);
                break;

            case 'party':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_PARTY;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `👤 *الطرف الحالي:* ${session.data.partyName || '-'}\n\n✍️ اكتب اسم الطرف للبحث:`);
                break;

            case 'amount':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT;
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `💰 *المبلغ الحالي:* ${session.data.amount || 0} ${session.data.currency || 'USD'}\n\n✍️ اكتب المبلغ الجديد (رقم فقط):`);
                break;

            case 'currency':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_AMOUNT;
                session.editingField = 'currency_only';
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `💱 *العملة الحالية:* ${session.data.currency || 'USD'}\n\n👇 اختر العملة الجديدة:`,
                    BOT_CONFIG.KEYBOARDS.CURRENCY, 'Markdown');
                break;

            case 'details':
                session.state = BOT_CONFIG.CONVERSATION_STATES.WAITING_EDIT_VALUE;
                session.editingField = 'details';
                saveUserSession(chatId, session);
                editMessage(chatId, messageId, `📝 *التفاصيل الحالية:* ${session.data.details || '-'}\n\n✍️ اكتب التفاصيل الجديدة:`);
                break;

            default:
                sendMessage(chatId, '❌ حقل غير معروف');
        }

    } catch (error) {
        Logger.log('Error in handleEditFieldSelection: ' + error.message);
        sendMessage(chatId, '❌ حدث خطأ. حاول مرة أخرى.');
    }
}

/**
 * إرسال الحركة المعدلة
 */
function submitEditedTransaction(chatId, messageId, session) {
    try {
        // تحديث حالة الحركة القديمة إلى "معدّل"
        if (session.data.originalRejectedRow) {
            const sheet = getBotTransactionsSheet();
            const columns = BOT_CONFIG.BOT_TRANSACTIONS_COLUMNS;
            sheet.getRange(session.data.originalRejectedRow, columns.REVIEW_STATUS.index).setValue('📝 تم التعديل');
        }

        // إزالة علامات التعديل
        delete session.data.originalRejectedRow;
        delete session.data.isEditMode;
        delete session.editingField;

        // حفظ كحركة جديدة
        const transactionData = {
            date: new Date(),
            nature: session.data.nature,
            classification: session.data.classification,
            projectCode: session.data.projectCode,
            projectName: session.data.projectName,
            item: session.data.item,
            details: session.data.details,
            partyName: session.data.partyName,
            amount: session.data.amount,
            currency: session.data.currency,
            exchangeRate: session.data.exchangeRate || 1,
            paymentMethod: session.data.paymentMethod,
            paymentTermType: session.data.paymentTermType || 'فوري',
            weeks: session.data.weeks,
            customDate: session.data.customDate,
            telegramUser: session.userName,
            chatId: chatId,
            attachmentUrl: session.data.attachmentUrl,
            isNewParty: session.data.isNewParty
        };

        const result = addBotTransaction(transactionData);

        if (result.success) {
            editMessage(chatId, messageId,
                `✅ *تم إعادة إرسال الحركة بنجاح!*\n\n` +
                `🔖 رقم الحركة: *${result.transactionId}*\n\n` +
                `الحركة الآن في انتظار المراجعة.`,
                null, 'Markdown');

            // إشعار المحاسب
            notifyAccountant(transactionData, result.transactionId);

            resetSession(chatId);
        } else {
            sendMessage(chatId, '❌ حدث خطأ أثناء حفظ الحركة. حاول مرة أخرى.');
        }

    } catch (error) {
        Logger.log('Error in submitEditedTransaction: ' + error.message);
        sendMessage(chatId, '❌ حدث خطأ. حاول مرة أخرى.');
    }
}

/**
 * معالجة حذف حركة مرفوضة نهائياً
 */
function handleDeleteRejected(chatId, messageId, session) {
    try {
        // البحث عن آخر حركة مرفوضة لهذا المستخدم
        const sheet = getBotTransactionsSheet();
        const columns = BOT_CONFIG.BOT_TRANSACTIONS_COLUMNS;
        const data = sheet.getDataRange().getValues();

        let rejectedRowIndex = -1;
        let transactionId = '';

        // البحث من الأحدث للأقدم
        for (let i = data.length - 1; i >= 1; i--) {
            const row = data[i];
            const rowChatId = String(row[columns.TELEGRAM_CHAT_ID.index - 1]);
            const status = row[columns.REVIEW_STATUS.index - 1];

            if (rowChatId === String(chatId) && status === CONFIG.TELEGRAM_BOT.REVIEW_STATUS.REJECTED) {
                rejectedRowIndex = i + 1;
                transactionId = row[columns.TRANSACTION_ID.index - 1];
                break;
            }
        }

        if (rejectedRowIndex === -1) {
            editMessage(chatId, messageId, '❌ لم يتم العثور على حركة مرفوضة للحذف');
            return;
        }

        // تحديث حالة الحركة إلى "محذوف" بدلاً من حذفها فعلياً
        sheet.getRange(rejectedRowIndex, columns.REVIEW_STATUS.index).setValue('🗑️ محذوف');
        sheet.getRange(rejectedRowIndex, columns.REVIEW_NOTES.index).setValue(
            (sheet.getRange(rejectedRowIndex, columns.REVIEW_NOTES.index).getValue() || '') +
            ' | حذف نهائي بواسطة المستخدم'
        );

        editMessage(chatId, messageId,
            `🗑️ *تم الحذف النهائي*\n\n` +
            `تم حذف الحركة رقم: ${transactionId}\n\n` +
            `يمكنك إنشاء حركة جديدة باستخدام /start`
        );

        // مسح الجلسة
        resetSession(chatId);

    } catch (error) {
        Logger.log('Error in handleDeleteRejected: ' + error.message);
        sendMessage(chatId, '❌ حدث خطأ أثناء الحذف. حاول مرة أخرى.');
    }
}

/**
 * عرض حالة حركات المستخدم
 */
function showUserTransactionsStatus(chatId, session) {
    const sheet = getBotTransactionsSheet();
    const columns = BOT_CONFIG.BOT_TRANSACTIONS_COLUMNS;
    const data = sheet.getDataRange().getValues();

    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    let pendingList = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowChatId = row[columns.TELEGRAM_CHAT_ID.index - 1];

        if (String(rowChatId) === String(chatId)) {
            const status = row[columns.REVIEW_STATUS.index - 1];
            const amount = row[columns.AMOUNT.index - 1];
            const currency = row[columns.CURRENCY.index - 1];
            const party = row[columns.PARTY_NAME.index - 1];

            if (status === CONFIG.TELEGRAM_BOT.REVIEW_STATUS.PENDING) {
                pendingCount++;
                pendingList.push(`• ${amount} ${currency} - ${party}`);
            } else if (status === CONFIG.TELEGRAM_BOT.REVIEW_STATUS.APPROVED) {
                approvedCount++;
            } else if (status === CONFIG.TELEGRAM_BOT.REVIEW_STATUS.REJECTED) {
                rejectedCount++;
            }
        }
    }

    let message = `📊 *حالة حركاتك*\n\n`;
    message += `⏳ قيد الانتظار: ${pendingCount}\n`;
    message += `✅ معتمدة: ${approvedCount}\n`;
    message += `❌ مرفوضة: ${rejectedCount}\n`;

    if (pendingList.length > 0) {
        message += `\n📋 *الحركات المعلقة:*\n`;
        message += pendingList.slice(0, 5).join('\n');
        if (pendingList.length > 5) {
            message += `\n... و${pendingList.length - 5} حركات أخرى`;
        }
    }

    sendMessage(chatId, message, null, 'Markdown');
}

// ==================== إدارة الجلسات ====================

/**
 * الحصول على جلسة المستخدم
 */
function getUserSession(chatId) {
    const cache = CacheService.getScriptCache();
    const sessionKey = 'session_' + chatId;
    const cached = cache.get(sessionKey);

    if (cached) {
        return JSON.parse(cached);
    }

    return {
        state: BOT_CONFIG.CONVERSATION_STATES.IDLE,
        data: {},
        phoneNumber: null,
        userName: null,
        permission: null
    };
}

/**
 * حفظ جلسة المستخدم
 */
function saveUserSession(chatId, session) {
    const cache = CacheService.getScriptCache();
    const sessionKey = 'session_' + chatId;
    cache.put(sessionKey, JSON.stringify(session), 3600); // ساعة واحدة
}

/**
 * إعادة تعيين جلسة المستخدم
 * يحافظ على بيانات التفويض
 */
function resetSession(chatId) {
    const session = getUserSession(chatId);
    session.state = BOT_CONFIG.CONVERSATION_STATES.IDLE;
    session.data = {};
    // الحفاظ على: authorized, userName, permission, phoneNumber, username
    saveUserSession(chatId, session);
}

// ==================== دوال Telegram API ====================

/**
 * إرسال رسالة
 */
function sendMessage(chatId, text, replyMarkup, parseMode) {
    logToSheet('>>> sendMessage START - chatId: ' + chatId);
    logToSheet('Text length: ' + text.length + ', parseMode: ' + parseMode);

    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const payload = {
        chat_id: chatId,
        text: text,
        parse_mode: parseMode || 'HTML'
    };

    if (replyMarkup) {
        payload.reply_markup = JSON.stringify(replyMarkup);
    }

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    try {
        logToSheet('Calling Telegram API...');
        const response = UrlFetchApp.fetch(url, options);
        const result = JSON.parse(response.getContentText());

        if (result.ok) {
            logToSheet('✅ Message sent successfully');
        } else {
            logToSheet('❌ Telegram API error: ' + result.description);
        }

        logToSheet('>>> sendMessage END');
        return result;
    } catch (error) {
        logToSheet('🔥 sendMessage ERROR: ' + error.message);
        return null;
    }
}

/**
 * تعديل رسالة
 */
function editMessage(chatId, messageId, text, replyMarkup, parseMode) {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/editMessageText`;

    const payload = {
        chat_id: chatId,
        message_id: messageId,
        text: text,
        parse_mode: parseMode || 'Markdown'
    };

    if (replyMarkup) {
        payload.reply_markup = JSON.stringify(replyMarkup);
    }

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    try {
        const response = UrlFetchApp.fetch(url, options);
        return JSON.parse(response.getContentText());
    } catch (error) {
        Logger.log('Error editing message: ' + error.message);
        return null;
    }
}

/**
 * الرد على Callback Query
 */
function answerCallbackQuery(callbackQueryId, text) {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;

    const payload = {
        callback_query_id: callbackQueryId
    };

    if (text) {
        payload.text = text;
    }

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    try {
        UrlFetchApp.fetch(url, options);
    } catch (error) {
        Logger.log('Error answering callback: ' + error.message);
    }
}

/**
 * الحصول على معلومات الملف
 */
function getFileInfo(fileId) {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;

    const response = UrlFetchApp.fetch(url);
    return JSON.parse(response.getContentText());
}

/**
 * تنزيل ملف من تليجرام
 */
function downloadTelegramFile(filePath) {
    const token = getBotToken();
    const url = `https://api.telegram.org/file/bot${token}/${filePath}`;

    const response = UrlFetchApp.fetch(url);
    return response.getBlob();
}

// ==================== إشعارات المحاسب ====================

/**
 * إرسال إشعار للمحاسب
 */
function notifyAccountant(transactionData, transactionId) {
    const accountantChatId = getAccountantChatId();
    if (!accountantChatId) {
        Logger.log('Accountant Chat ID not set');
        return;
    }

    const message = `
📥 *حركة جديدة من البوت*
─────────────────
📌 رقم الحركة: #${transactionId}
📋 النوع: ${transactionData.nature}
🎬 المشروع: ${transactionData.projectName || '-'}
👤 الطرف: ${transactionData.partyName}${transactionData.isNewParty ? ' (جديد)' : ''}
💵 المبلغ: ${transactionData.amount} ${transactionData.currency}
📝 التفاصيل: ${transactionData.details || '-'}
👤 المُدخل: ${transactionData.telegramUser}
─────────────────
⏳ في انتظار المراجعة
    `;

    const keyboard = {
        inline_keyboard: [[
            { text: '📋 فتح شيت المراجعة', url: SpreadsheetApp.getActiveSpreadsheet().getUrl() }
        ]]
    };

    sendMessage(accountantChatId, message, keyboard, 'Markdown');
}

/**
 * إرسال إشعار للمستخدم بالاعتماد
 */
function notifyUserApproval(chatId, transactionData) {
    const message = BOT_CONFIG.INTERACTIVE_MESSAGES.APPROVED_NOTIFICATION
        .replace('{id}', transactionData.transactionId)
        .replace('{date}', transactionData.date)
        .replace('{amount}', transactionData.amount + ' ' + transactionData.currency)
        .replace('{party}', transactionData.partyName);

    sendMessage(chatId, message, null, 'Markdown');
}

/**
 * إرسال إشعار للمستخدم بالرفض
 */
function notifyUserRejection(chatId, transactionData, reason) {
    const message = BOT_CONFIG.INTERACTIVE_MESSAGES.REJECTED_NOTIFICATION
        .replace('{id}', transactionData.transactionId)
        .replace('{date}', transactionData.date)
        .replace('{amount}', transactionData.amount + ' ' + transactionData.currency)
        .replace('{party}', transactionData.partyName)
        .replace('{reason}', reason);

    sendMessage(chatId, message, BOT_CONFIG.KEYBOARDS.EDIT_AFTER_REJECT, 'Markdown');
}
