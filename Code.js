// ==================== نظام المحاسبة للأفلام الوثائقية - نسخة العملات + الأطراف الموحدة ====================
// ✅ العملة الأساسية: USD (مع دعم TRY / EGP)
// ✅ قلب الحركة المالية من العمود 10: مبلغ أصلي + عملة + سعر صرف + قيمة بالدولار + نوع الحركة
// ✅ التلوين حسب نوع الحركة فقط (مدين استحقاق / دائن دفعة)
// ✅ قاعدة بيانات موحدة للأطراف (مورد / عميل / ممول)
// ✅ الميزانيات تعتمد على القيمة بالدولار للحركات المدينة (استحقاق)


// ==================== CONFIGURATION OBJECT ====================
/**
 * كائن الإعدادات المركزي لنظام SEEN المحاسبي
 * جميع الثوابت والإعدادات في مكان واحد لسهولة الصيانة والتعديل
 */
const CONFIG = {

  // ==================== أسماء الشيتات ====================
  SHEETS: {
    TRANSACTIONS: 'دفتر الحركات المالية',
    PROJECTS: 'قاعدة بيانات المشاريع',
    PARTIES: 'قاعدة بيانات الأطراف',
    ITEMS: 'قاعدة بيانات البنود',
    BUDGETS: 'الميزانيات المخططة',
    ALERTS: 'التنبيهات والاستحقاقات',
    INVOICE: 'فاتورة قناة / جهة',

    // كشوف الحسابات
    VENDOR_STATEMENT: 'كشف حساب مورد - شيت',
    CLIENT_STATEMENT: 'كشف حساب عميل',
    FUNDER_STATEMENT: 'كشف حساب ممول',

    // التقارير
    PROJECT_REPORT: 'تقرير المشروع التفصيلي',
    VENDORS_REPORT: 'تقرير الموردين',
    EXPENSES_REPORT: 'تقرير المصروفات',
    REVENUE_REPORT: 'تقرير الإيرادات',
    CASHFLOW: 'التدفقات النقدية',
    DASHBOARD: 'لوحة التحكم',

    // حسابات البنك والخزنة
    BANK_USD: 'حساب البنك - دولار',
    BANK_TRY: 'حساب البنك - ليرة',
    CASH_USD: 'خزنة العهدة - دولار',
    CASH_TRY: 'خزنة العهدة - ليرة',
    CARD_TRY: 'حساب البطاقة - ليرة',

    // أسماء قديمة (للتوافقية)
    LEGACY_VENDORS: 'قاعدة بيانات الموردين',
    LEGACY_CLIENTS: 'قاعدة بيانات العملاء',
    LEGACY_FUNDERS: 'قاعدة بيانات الممولين'
  },

  // ==================== الألوان ====================
  COLORS: {
    // ألوان الهيدر الرئيسية
    HEADER: {
      TRANSACTIONS: '#1a237e',
      PROJECTS: '#004d40',
      PARTIES: '#33691e',
      ITEMS: '#6a1b9a',
      BUDGETS: '#4a148c',
      ALERTS: '#b71c1c',
      REPORTS: '#0277bd',
      DASHBOARD: '#1565c0',
      CASHFLOW: '#d84315',
      REVENUE: '#2e7d32',
      FUNDER: '#0d47a1',
      VENDORS: '#00695c',
      SUMMARY: '#1e88e5',
      TOTALS: '#1b5e20',
      DETAILS: '#01579b'
    },

    // ألوان الخلفية
    BG: {
      WHITE: '#ffffff',
      LIGHT_BLUE: '#e3f2fd',
      LIGHT_ORANGE: '#fff3e0',
      LIGHT_GREEN: '#e0f2f1',
      LIGHT_GREEN_2: '#f1f8e9',
      LIGHT_GREEN_3: '#c8e6c9',
      LIGHT_YELLOW: '#fff9c4',
      ZEBRA_ODD: '#f5f5f5',
      GRAY: '#eeeeee',
      DARK_GRAY: '#555555'
    },

    // ألوان النص
    TEXT: {
      WHITE: '#ffffff',
      DARK: '#444444',
      SUCCESS: '#2e7d32',
      SUCCESS_DARK: '#1b5e20',
      DANGER: '#c62828',
      DANGER_DARK: '#b71c1c',
      WARNING: '#ff9800',
      PRIMARY: '#1565c0',
      TEAL: '#004d40'
    },

    // ألوان الحدود
    BORDER: {
      LIGHT: '#bdbdbd',
      WHITE: '#ffffff',
      PRIMARY: '#1976d2'
    },

    // ألوان التبويب
    TAB: {
      TRANSACTIONS: '#2e7d32',
      VENDOR_STATEMENT: '#00897b'
    },

    // ألوان الحالة
    STATUS: {
      POSITIVE: '#ffeb3b',
      NEGATIVE: '#ff5252'
    }
  },

  // ==================== العملات ====================
  CURRENCIES: {
    LIST: ['USD', 'TRY', 'EGP', 'دولار', 'ليرة', 'جنيه مصري'],
    DEFAULT: 'USD',
    SYMBOLS: { USD: '$', TRY: '₺', EGP: 'ج.م' }
  },

  // ==================== أنواع الحركات ====================
  MOVEMENT: {
    DEBIT: 'مدين استحقاق',
    CREDIT: 'دائن دفعة',
    TYPES: ['مدين استحقاق', 'دائن دفعة']
  },

  // ==================== شروط الدفع ====================
  PAYMENT_TERMS: {
    IMMEDIATE: 'فوري',
    AFTER_DELIVERY: 'بعد التسليم',
    CUSTOM: 'تاريخ مخصص',
    LIST: ['فوري', 'بعد التسليم', 'تاريخ مخصص']
  },

  // ==================== حالة السداد ====================
  PAYMENT_STATUS: {
    PAID: 'مدفوع بالكامل',
    PENDING: 'معلق',
    OPERATION: 'عملية دفع/تحصيل'
  },

  // ==================== أحجام الخط ====================
  FONT: {
    SMALL: 10,
    NORMAL: 11,
    MEDIUM: 12,
    LARGE: 13,
    XLARGE: 15,
    TITLE: 16,
    HEADER: 18
  },

  // ==================== إعدادات الشيتات ====================
  SHEET: {
    DEFAULT_ROWS: 500,
    FROZEN_ROWS: 1,
    FROZEN_COLS: 0
  },

  // ==================== تنسيقات الأرقام ====================
  FORMATS: {
    CURRENCY: '#,##0.00',
    RATE: '#,##0.0000',
    DATE: 'yyyy-mm-dd',
    MONTH: 'YYYY-MM'
  },

  // ==================== أنواع الأطراف ====================
  PARTY_TYPES: {
    VENDOR: 'مورد',
    CLIENT: 'عميل',
    FUNDER: 'ممول',
    LIST: ['مورد', 'عميل', 'ممول']
  },

  // ==================== طبيعة الحركة ====================
  NATURE_TYPES: [
    '💰 استحقاق مصروف',
    '💸 دفعة مصروف',
    '📈 استحقاق إيراد',
    '✅ تحصيل إيراد',
    '🏦 تمويل',
    '💳 سداد تمويل',
    '🟡 تأمين مدفوع للقناة',
    '🟢 استرداد تأمين من القناة'
  ]
};


// ==================== القائمة الرئيسية ====================
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('📊 نظام المحاسبة')

    // 🔍 التقارير السريعة
    .addItem('📊 تحديث لوحة التحكم', 'refreshDashboard')
    .addItem('📈 إعادة بناء كل التقارير الملخصة', 'rebuildAllSummaryReports')
    .addSeparator()

    // 👇 الاستخدام اليومي العادي
    .addItem('➕ إضافة حركة جديدة', 'addTransactionWithDate')
    .addItem('🔃 ترتيب الحركات حسب التاريخ', 'sortTransactionsByDate')
    .addSeparator()
    .addItem('📊 إضافة ميزانية', 'addBudgetForm')
    .addItem('📈 مقارنة الميزانية', 'compareBudget')
    .addSeparator()
    .addItem('🔄 تحديث القوائم المنسدلة', 'refreshDropdowns')
    .addItem('🔔 عرض الاستحقاقات (نافذة)', 'showUpcomingPayments')
    .addItem('⚠️ تحديث التنبيهات', 'updateAlerts')
    .addSeparator()

    // 👤 الموردون / العملاء / الممولون
    .addSubMenu(
      ui.createMenu('👤 الموردون / العملاء / الممولون')
        .addItem('📄 كشف حساب مورد في شيت', 'generateVendorStatementSheet')
        .addItem('📄 كشف حساب عميل في شيت', 'generateClientStatementSheet')
        .addItem('📄 كشف حساب ممول في شيت', 'generateFunderStatementSheet')
    )

    // 📑 تقارير الملخص
    .addSubMenu(
      ui.createMenu('📑 تقارير الملخص')
        .addItem('📌 تقرير المشروع التفصيلي', 'rebuildProjectDetailReport')
        .addItem('📌 تقرير الموردين الملخص', 'rebuildVendorSummaryReport')
        .addItem('📌 تقرير المصروفات الملخص', 'rebuildExpenseSummaryReport')
        .addItem('📌 تقرير الإيرادات الملخص', 'rebuildRevenueSummaryReport')
        .addItem('📌 تقرير التدفقات النقدية', 'rebuildCashFlowReport')
        .addSeparator()
        .addItem('🔁 تحديث كل التقارير الملخصة', 'rebuildAllSummaryReports')
    )

    // 🏦 البنك وخزنة العهدة
    .addSubMenu(
      ui.createMenu('🏦 البنك وخزنة العهدة')
        .addItem('🔁 تحديث شيتات البنك وخزنة العهدة والبطاقة', 'rebuildBankAndCashFromTransactions')
    )

    // 🧮 شيتات مطابقة البنك والكارت
    .addSubMenu(
      ui.createMenu('🏦 مطابقة الحساب البنكي / الكارت')
        .addItem('📄 إنشاء شيت مطابقة دولار', 'createBankReconciliationUsdSheet')
        .addItem('📄 إنشاء شيت مطابقة ليرة', 'createBankReconciliationTrySheet')
        .addItem('📄 إنشاء شيت مطابقة الكارت', 'createCardReconciliationSheet')
        .addSeparator()
        .addItem('🔍 مطابقة حساب البنك - دولار', 'reconcileBankUsd')
        .addItem('🔍 مطابقة حساب البنك - ليرة', 'reconcileBankTry')
        .addItem('💳 مطابقة الكارت', 'reconcileCard')
    )

    // 💹 الربحية والفواتير
    .addSubMenu(
      ui.createMenu('💹 الربحية والفواتير')
        .addItem('💹 تقرير ربحية مشروع (نافذة)', 'showProjectProfitability')
        .addItem('🧾 إنشاء فاتورة قناة من مشروع', 'generateChannelInvoice')
    )

    .addSeparator()

    // ⚙️ إعدادات متقدمة
    .addSubMenu(
      ui.createMenu('⚙️ إعدادات متقدمة')
        .addItem('🛑 إنشاء النظام - الجزء 1 (حذف كامل)', 'setupPart1')
        .addItem('🛑 إنشاء النظام - الجزء 2 (حذف كامل)', 'setupPart2')
        .addSeparator()
        .addItem('📂 إنشاء نسخة احتياطية للشيت', 'backupSpreadsheet')
    )

    .addSeparator()
    .addItem('📖 دليل الاستخدام', 'showGuide')
    .addToUi();
}


// ==================== إضافة حركة جديدة ====================
/**
 * يعرض نافذة لاختيار نوع الحركة والتاريخ
 */
function addTransactionWithDate() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // الخطوة 1: اختيار نوع الحركة
  var menuText = '➕ اختر نوع الحركة:\n\n';
  for (var i = 0; i < CONFIG.NATURE_TYPES.length; i++) {
    menuText += (i + 1) + '. ' + CONFIG.NATURE_TYPES[i] + '\n';
  }
  menuText += '\nأدخل رقم الخيار (1-' + CONFIG.NATURE_TYPES.length + '):';

  var natureResponse = ui.prompt('➕ إضافة حركة جديدة', menuText, ui.ButtonSet.OK_CANCEL);
  if (natureResponse.getSelectedButton() !== ui.Button.OK) return;

  var natureChoice = parseInt(natureResponse.getResponseText().trim(), 10);
  if (isNaN(natureChoice) || natureChoice < 1 || natureChoice > CONFIG.NATURE_TYPES.length) {
    ui.alert('❌ خطأ', 'رقم غير صحيح!', ui.ButtonSet.OK);
    return;
  }
  var natureType = CONFIG.NATURE_TYPES[natureChoice - 1];

  // الخطوة 2: اختيار التاريخ
  var dateChoice = ui.alert(
    '📅 اختيار التاريخ',
    'نعم = تاريخ اليوم\nلا = إدخال تاريخ مختلف',
    ui.ButtonSet.YES_NO_CANCEL
  );
  if (dateChoice === ui.Button.CANCEL) return;

  var formattedDate;
  if (dateChoice === ui.Button.YES) {
    formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  } else {
    var dateResponse = ui.prompt(
      '📅 إدخال التاريخ',
      'أدخل التاريخ بصيغة: يوم.شهر.سنة\nمثال: 24.12.2025',
      ui.ButtonSet.OK_CANCEL
    );
    if (dateResponse.getSelectedButton() !== ui.Button.OK) return;

    var dateInput = dateResponse.getResponseText().trim();
    if (!dateInput) {
      ui.alert('❌ خطأ', 'لم تدخل تاريخ!', ui.ButtonSet.OK);
      return;
    }

    var parseResult = parseDateInput_(dateInput);
    if (!parseResult.success) {
      ui.alert('❌ خطأ', parseResult.error, ui.ButtonSet.OK);
      return;
    }
    formattedDate = parseResult.date;
  }

  // الخطوة 3: تحديد آخر صف فيه تاريخ في العمود B
  var targetRow = findLastDataRowInColumn_(sheet, 2) + 1;
  if (targetRow < 2) targetRow = 2;

  // الخطوة 4: إدراج البيانات
  // A = معادلة رقم الحركة، B = التاريخ، C = طبيعة الحركة
  var transactionFormula = '=IF(B' + targetRow + '="","",ROW()-1)';

  sheet.getRange(targetRow, 1).setFormula(transactionFormula);
  sheet.getRange(targetRow, 2).setValue(formattedDate);
  sheet.getRange(targetRow, 3).setValue(natureType);

  ss.toast('✅ صف ' + targetRow + ': ' + natureType, 'تم', 3);
}

/**
 * البحث عن آخر صف فيه بيانات في عمود معين
 */
function findLastDataRowInColumn_(sheet, colNum) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;

  var data = sheet.getRange(2, colNum, lastRow - 1, 1).getValues();
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][0] !== '' && data[i][0] !== null) {
      return i + 2; // +2 لأن البيانات تبدأ من الصف 2
    }
  }
  return 1;
}

/**
 * تحويل صيغة التاريخ من dd.MM.yyyy إلى yyyy-MM-dd
 */
function parseDateInput_(dateStr) {
  const regex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
  const match = dateStr.match(regex);

  if (!match) {
    return { success: false, error: 'صيغة غير صحيحة!\nالمطلوب: يوم.شهر.سنة\nمثال: 24.12.2025' };
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (month < 1 || month > 12) return { success: false, error: 'الشهر يجب أن يكون 1-12' };
  if (day < 1 || day > 31) return { success: false, error: 'اليوم يجب أن يكون 1-31' };

  const dateObj = new Date(year, month - 1, day);
  if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1) {
    return { success: false, error: 'تاريخ غير موجود!' };
  }

  return {
    success: true,
    date: year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0')
  };
}

/**
 * ترتيب الحركات في دفتر الحركات المالية حسب التاريخ (من الأقدم للأحدث)
 */
function sortTransactionsByDate() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // تأكيد من المستخدم
  const response = ui.alert(
    '🔃 ترتيب الحركات',
    'سيتم ترتيب جميع الحركات حسب التاريخ من الأقدم للأحدث.\n\nهل تريد المتابعة؟',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    return;
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow <= 1) {
    ui.alert('ℹ️ تنبيه', 'لا توجد حركات للترتيب!', ui.ButtonSet.OK);
    return;
  }

  // ترتيب البيانات حسب العمود B (التاريخ) - من الأقدم للأحدث
  const range = sheet.getRange(2, 1, lastRow - 1, lastCol);
  range.sort({ column: 2, ascending: true });

  // رسالة نجاح
  ui.alert(
    '✅ تم الترتيب',
    'تم ترتيب ' + (lastRow - 1) + ' حركة حسب التاريخ من الأقدم للأحدث.',
    ui.ButtonSet.OK
  );

  SpreadsheetApp.getActiveSpreadsheet().toast('تم ترتيب الحركات بنجاح!', '✅ تم', 3);
}


// ==================== إنشاء النظام - الجزء 1 ====================
function confirmReset() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    '⚠️ تحذير خطير',
    'هذا الإجراء سيحذف كل شيتات النظام ويعيد إنشائها من الصفر.\n\nلو حضرتك متأكد 100% اكتب كلمة: DELETE',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    ui.alert('❌ تم إلغاء العملية.');
    return false;
  }

  if (response.getResponseText() !== 'DELETE') {
    ui.alert('❌ تم إلغاء العملية — كلمة السر غير صحيحة.');
    return false;
  }

  return true;
}

function setupPart1() {
  if (!confirmReset()) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // نحذف كل الشيتات القديمة
  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    try {
      ss.deleteSheet(sheet);
    } catch (e) {}
  });
  
  // إنشاء الشيتات الأساسية
  createTransactionsSheet(ss);   // دفتر الحركات (بنظام العملات)
  createProjectsSheet(ss);       // المشاريع
  createPartiesSheet(ss);        // 🆕 قاعدة بيانات الأطراف الموحدة
  createItemsSheet(ss);          // 🆕 قاعدة بيانات البنود (مبسطة)
  createBudgetsSheet(ss);        // الميزانيات
  createAlertsSheet(ss);         // التنبيهات

  // 🆕 شيتات البنك وخزنة العهدة (دولار / ليرة)
  createBankAndCashSheets(ss);

  ui.alert(
    '✅ تم إنشاء الجزء 1 بنجاح!\n\n' +
    '🆕 التحديثات:\n' +
    '• نظام حركة مالية جديد (عملة أصلية + سعر صرف + قيمة بالدولار + نوع الحركة)\n' +
    '• قاعدة بيانات أطراف موحدة (مورد / عميل / ممول)\n' +
    '• قاعدة بيانات البنود\n' +
    '• شيتات البنك وخزنة العهدة بالدولار والليرة\n' +
    '• التلوين حسب نوع الحركة فقط (استحقاق / دفعة)\n' +
    '• العملة الأساسية: USD\n\n' +
    'الآن اختر: 🔧 إنشاء النظام - الجزء 2 (لو موجود عندك في ملف آخر).'
  );
}


// ==================== 1. دفتر الحركات المالية (مع العملات + نوع الحركة) ====================
function createTransactionsSheet(ss) {
  let oldSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (oldSheet) ss.deleteSheet(oldSheet);
  
  let sheet = ss.insertSheet(CONFIG.SHEETS.TRANSACTIONS);
  sheet.setTabColor(CONFIG.COLORS.TAB.TRANSACTIONS);   // أخضر لدفتر الحركات المالية
  
  const headers = [
    'رقم الحركة',          // 1 - A
    'التاريخ',             // 2 - B
    'طبيعة الحركة',        // 3 - C
    'تصنيف الحركة',        // 4 - D
    'كود المشروع',         // 5 - E
    'اسم المشروع',         // 6 - F
    'البند',               // 7 - G
    'التفاصيل',            // 8 - H
    'اسم المورد/الجهة',    // 9 - I

    // 💰 قلب الحركة المالية يبدأ من هنا:
    'المبلغ بالعملة الأصلية', // 10 - J
    'العملة',              // 11 - K
    'سعر الصرف',           // 12 - L
    'القيمة بالدولار',      // 13 - M
    'نوع الحركة',           // 14 - N (مدين استحقاق / دائن دفعة)

    'الرصيد',              // 15 - O
    'رقم مرجعي',           // 16 - P
    'طريقة الدفع',         // 17 - Q
    'نوع شرط الدفع',       // 18 - R
    'عدد الأسابيع',        // 19 - S
    'تاريخ مخصص',          // 20 - T
    'تاريخ الاستحقاق',     // 21 - U
    'حالة السداد',         // 22 - V
    'الشهر',               // 23 - W
    'ملاحظات'              // 24 - X
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.TRANSACTIONS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  
  const widths = [
    80,   // A
    100,  // B
    170,  // C
    170,  // D
    110,  // E
    180,  // F
    180,  // G
    220,  // H
    150,  // I
    130,  // J
    90,   // K
    110,  // L
    130,  // M
    130,  // N
    120,  // O
    120,  // P
    120,  // Q
    130,  // R
    100,  // S
    120,  // T
    130,  // U
    130,  // V
    90,   // W
    250   // X
  ];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  const lastRow = 500;
  
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  const partiesSheet  = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  const itemsSheet    = ss.getSheetByName(CONFIG.SHEETS.ITEMS);
  
  // ✅ طبيعة الحركة من "قاعدة بيانات البنود" عمود B
  if (itemsSheet) {
    const movementRange = itemsSheet.getRange('B2:B200');
    const movementValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(movementRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر طبيعة الحركة من "قاعدة بيانات البنود"')
      .build();
    sheet.getRange(2, 3, lastRow, 1) // C
      .setDataValidation(movementValidation)
      .setHorizontalAlignment('center');
  }
  
  // ✅ تصنيف الحركة من "قاعدة بيانات البنود" عمود C
  if (itemsSheet) {
    const classRange = itemsSheet.getRange('C2:C200');
    const classValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(classRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر تصنيف الحركة من "قاعدة بيانات البنود"')
      .build();
    sheet.getRange(2, 4, lastRow, 1) // D
      .setDataValidation(classValidation)
      .setHorizontalAlignment('center');
  }
  
  // كود المشروع (E)
  if (projectsSheet) {
    const projectRange = projectsSheet.getRange('A2:A200');
    const projectValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر كود المشروع من القائمة أو اكتب يدوياً')
      .build();
    sheet.getRange(2, 5, lastRow, 1)
      .setDataValidation(projectValidation);
  }
  
  // اسم المورد/الجهة (I) من قاعدة بيانات الأطراف
  if (partiesSheet) {
    const partyRange = partiesSheet.getRange('A2:A200');
    const partyValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(partyRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر اسم الطرف من "قاعدة بيانات الأطراف" أو اكتب يدوياً')
      .build();
    sheet.getRange(2, 9, lastRow, 1) // I
      .setDataValidation(partyValidation);
  }
  
  // ✅ البند من "قاعدة بيانات البنود" عمود A (G)
  if (itemsSheet) {
    const itemsRange = itemsSheet.getRange('A2:A200');
    const itemValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(itemsRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر البند من "قاعدة بيانات البنود" أو اكتب يدوياً')
      .build();
    sheet.getRange(2, 7, lastRow, 1) // G
      .setDataValidation(itemValidation);
  }
  
  // 🆕 دروب داون "نوع الحركة" (N)
  const movementTypeValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.MOVEMENT.TYPES, true)
    .setAllowInvalid(true)
    .setHelpText('اختر نوع الحركة: مدين استحقاق أو دائن دفعة')
    .build();
  sheet.getRange(2, 14, lastRow, 1) // N
    .setDataValidation(movementTypeValidation)
    .setHorizontalAlignment('center');
  
  // 🆕 دروب داون العملة (K)
  const currencyValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.CURRENCIES.LIST, true)
    .setAllowInvalid(true)
    .setHelpText('اختر العملة (USD / TRY / EGP)')
    .build();
  sheet.getRange(2, 11, lastRow, 1).setDataValidation(currencyValidation); // K
  
  // طريقة الدفع (Q = 17)
  const payMethodValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['نقدي', 'تحويل بنكي', 'شيك', 'بطاقة', 'أخرى'])
    .setAllowInvalid(true)
    .setHelpText('اختر طريقة الدفع')
    .build();
  sheet.getRange(2, 17, lastRow, 1) // Q
    .setDataValidation(payMethodValidation);
  
  // نوع شرط الدفع (R = 18)
  const termValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.PAYMENT_TERMS.LIST)
    .setAllowInvalid(true)
    .setHelpText('اختر شرط الدفع')
    .build();
  sheet.getRange(2, 18, lastRow, 1) // R
    .setDataValidation(termValidation);
  
  // المعادلات لكل صف - باستخدام Batch Operations للأداء الأمثل
  // بدلاً من 4000 طلب API (8 معادلات × 500 صف) = 8 طلبات فقط
  const numRows = lastRow - 1;

  const formulasA = [];  // رقم الحركة (A)
  const formulasF = [];  // اسم المشروع (F)
  const formulasM = [];  // القيمة بالدولار (M)
  const formulasO = [];  // الرصيد (O)
  const formulasP = [];  // رقم مرجعي (P)
  const formulasU = [];  // تاريخ الاستحقاق (U)
  const formulasV = [];  // حالة السداد (V)
  const formulasW = [];  // الشهر (W)

  for (let row = 2; row <= lastRow; row++) {
    // رقم الحركة (A)
    formulasA.push([`=IF(B${row}="","",ROW()-1)`]);

    // اسم المشروع من كود المشروع (F)
    formulasF.push([`=IFERROR(VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A:B,2,FALSE),"")`]);

    // القيمة بالدولار (M) = المبلغ الأصلي × سعر الصرف (لو موجود)
    formulasM.push([`=IF(J${row}="","",IF(L${row}="",J${row},J${row}*L${row}))`]);

    // الرصيد O = مجموع (مدين استحقاق - دائن دفعة) لنفس الطرف حتى هذا الصف
    formulasO.push([
      `=IF(I${row}="","",` +
      `SUMIFS($M$2:M${row},$I$2:I${row},I${row},$N$2:N${row},"مدين استحقاق")-` +
      `SUMIFS($M$2:M${row},$I$2:I${row},I${row},$N$2:N${row},"دائن دفعة"))`
    ]);

    // رقم مرجعي P (16) للحركات المدينة
    formulasP.push([
      `=IF(AND(N${row}="مدين استحقاق",B${row}<>""),` +
      `"REF-"&TEXT(B${row},"YYYYMMDD")&"-"&ROW(),"")`
    ]);

    // تاريخ الاستحقاق U (21)
    formulasU.push([
      `=IF(N${row}<>"مدين استحقاق","",` +
      `IF(R${row}="فوري",B${row},` +
      `IF(R${row}="بعد التسليم",` +
      `IFERROR(VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A:K,11,FALSE),"")+S${row}*7,` +
      `IF(R${row}="تاريخ مخصص",T${row},""))))`
    ]);

    // حالة السداد V (22)
    formulasV.push([
      `=IF(N${row}="مدين استحقاق",` +
      `IF(O${row}<=0,"مدفوع بالكامل","معلق"),` +
      `IF(N${row}="دائن دفعة","عملية دفع/تحصيل",""))`
    ]);

    // الشهر W (23)
    formulasW.push([`=IF(B${row}="","",TEXT(B${row},"YYYY-MM"))`]);
  }

  // تطبيق كل المعادلات دفعة واحدة (8 طلبات بدلاً من 4000)
  sheet.getRange(2, 1, numRows, 1).setFormulas(formulasA);   // A: رقم الحركة
  sheet.getRange(2, 6, numRows, 1).setFormulas(formulasF);   // F: اسم المشروع
  sheet.getRange(2, 13, numRows, 1).setFormulas(formulasM);  // M: القيمة بالدولار
  sheet.getRange(2, 15, numRows, 1).setFormulas(formulasO);  // O: الرصيد
  sheet.getRange(2, 16, numRows, 1).setFormulas(formulasP);  // P: رقم مرجعي
  sheet.getRange(2, 21, numRows, 1).setFormulas(formulasU);  // U: تاريخ الاستحقاق
  sheet.getRange(2, 22, numRows, 1).setFormulas(formulasV);  // V: حالة السداد
  sheet.getRange(2, 23, numRows, 1).setFormulas(formulasW);  // W: الشهر
  
  // تنسيقات الأرقام والتواريخ
  sheet.getRange(2, 10, lastRow, 1).setNumberFormat('#,##0.00');   // J
  sheet.getRange(2, 12, lastRow, 1).setNumberFormat('#,##0.0000'); // L
  sheet.getRange(2, 13, lastRow, 1).setNumberFormat('#,##0.00');   // M
  sheet.getRange(2, 15, lastRow, 1).setNumberFormat('#,##0.00');   // O

  sheet.getRange(2, 2,  lastRow, 1).setNumberFormat('yyyy-mm-dd'); // B
  sheet.getRange(2, 20, lastRow, 1).setNumberFormat('yyyy-mm-dd'); // T
  sheet.getRange(2, 21, lastRow, 1).setNumberFormat('yyyy-mm-dd'); // U
  
  // 🎨 تلوين شرطي حسب نوع الحركة فقط
  applyConditionalFormatting(sheet, lastRow);
  
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  
  sheet.getRange('N1').setNote(
    'نوع الحركة:\n' +
    '• مدين استحقاق = فاتورة/استحقاق على الطرف\n' +
    '• دائن دفعة = دفعة/تحصيل تقلل الرصيد'
  );
}

// ==================== التلوين الشرطي (حسب نوع الحركة فقط) ====================
function applyConditionalFormatting(sheet, lastRow) {
  const rules = [];
  const dataRange = sheet.getRange(2, 1, lastRow, 24); // من A إلى X
  
  // استحقاق = لون
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$N2="مدين استحقاق"')
      .setBackground(CONFIG.COLORS.BG.LIGHT_ORANGE) // برتقالي فاتح
      .setRanges([dataRange])
      .build()
  );
  
  // دفعة = لون
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$N2="دائن دفعة"')
      .setBackground(CONFIG.COLORS.BG.LIGHT_BLUE) // أزرق فاتح
      .setRanges([dataRange])
      .build()
  );
  
  sheet.setConditionalFormatRules(rules);
}


// ==================== 2. قاعدة بيانات المشاريع ====================
function createProjectsSheet(ss) {
  let oldSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  if (oldSheet) ss.deleteSheet(oldSheet);
  
  let sheet = ss.insertSheet(CONFIG.SHEETS.PROJECTS);
  
  const headers = [
    'كود المشروع', 'اسم المشروع', 'نوع المشروع', 'القناة/الجهة',
    'اسم البرنامج', 'سنة الإنتاج', 'نوع التمويل', 'قيمة التمويل',
    'قيمة العقد مع القناة', 'تاريخ البدء', 'تاريخ التسليم المتوقع',
    'تاريخ التسليم الفعلي', 'المدة (أسابيع)', '🆕 مدة المشروع (أشهر)',
    'حالة المشروع', 'ملاحظات'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.PROJECTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center');
  
  const widths = [150, 200, 130, 150, 150, 100, 130, 130, 150, 120, 150, 150, 120, 150, 130, 250];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  // القوائم
  sheet.getRange(2, 3, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['وثائقي قصير', 'وثائقي طويل', 'سلسلة وثائقية', 'تقرير إخباري', 'فيلم روائي', 'برومو'])
      .build()
  );
  
  sheet.getRange(2, 7, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['خارجي', 'ذاتي', 'مشترك', 'لا يوجد'])
      .build()
  );
  
  const years = [];
  for (let y = 2020; y <= 2030; y++) years.push(y.toString());
  sheet.getRange(2, 6, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(years)
      .build()
  );
  
  sheet.getRange(2, 15, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['تخطيط', 'جاري التنفيذ', 'تصوير', 'مونتاج', 'مراجعة', 'مكتمل', 'مسلّم', 'ملغي', 'معلق'])
      .build()
  );
  
  // المعادلات
  for (let row = 2; row <= 100; row++) {
    sheet.getRange(row, 1).setFormula(
      `=IF(OR(D${row}="",E${row}="",F${row}=""),"",` +
      `UPPER(LEFT(D${row},2))&"-"&UPPER(LEFT(E${row},2))&"-"&` +
      `RIGHT(F${row},2)&"-"&TEXT(COUNTIFS($D$2:D${row},D${row},$E$2:E${row},E${row},$F$2:F${row},F${row}),"000"))`
    );
    sheet.getRange(row, 13).setFormula(
      `=IF(OR(J${row}="",K${row}=""),"",ROUND((K${row}-J${row})/7,1))`
    );
  }
  
  // تنسيق
  sheet.getRange(2, 8, 200, 2).setNumberFormat('$#,##0.00');
  sheet.getRange(2, 10, 200, 1).setNumberFormat('yyyy-mm-dd');
  sheet.getRange(2, 11, 200, 1).setNumberFormat('yyyy-mm-dd');
  sheet.getRange(2, 12, 200, 1).setNumberFormat('yyyy-mm-dd');
  sheet.getRange(2, 14, 200, 1).setNumberFormat('0');
  
  // تلوين حالة المشروع
  const rules = [];
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('مكتمل')
      .setBackground(CONFIG.COLORS.BG.LIGHT_GREEN_3)
      .setRanges([sheet.getRange(2, 15, 200, 1)])
      .build()
  );
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('جاري التنفيذ')
      .setBackground(CONFIG.COLORS.BG.LIGHT_YELLOW)
      .setRanges([sheet.getRange(2, 15, 200, 1)])
      .build()
  );
  sheet.setConditionalFormatRules(rules);
  
  sheet.setFrozenRows(1);
  
  const protection = sheet.getRange(2, 1, 200, 1).protect();
  protection.setDescription('كود المشروع محسوب تلقائياً');
  protection.setWarningOnly(true);
  
  sheet.getRange('N1').setNote('🆕 مدة المشروع بالأشهر\nيُستخدم لحساب المصروفات العمومية 30% في تقرير الربحية');
}


// ==================== 3. قاعدة بيانات الأطراف (مورد / عميل / ممول) ====================
function createPartiesSheet(ss) {
  let oldSheet = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  if (oldSheet) ss.deleteSheet(oldSheet);
  
  let sheet = ss.insertSheet(CONFIG.SHEETS.PARTIES);
  
  const headers = [
    'اسم الطرف',      // A
    'نوع الطرف',      // B (مورد / عميل / ممول)
    'التخصص / الفئة', // C
    'رقم الهاتف',     // D
    'البريد الإلكتروني', // E
    'المدينة / الدولة', // F
    'طريقة الدفع المفضلة', // G
    'بيانات الحساب البنكي / شروط خاصة', // H
    'ملاحظات'         // I
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.PARTIES)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [200, 140, 160, 140, 220, 160, 170, 260, 260];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  // نوع الطرف
  sheet.getRange(2, 2, 500, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['مورد', 'عميل', 'ممول'], true)
      .build()
  );
  
  // طريقة الدفع المفضلة
  sheet.getRange(2, 7, 500, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['نقدي', 'تحويل بنكي', 'شيك', 'بطاقة', 'أخرى'], true)
      .build()
  );
  
  sheet.setFrozenRows(1);
  
  sheet.getRange('A1').setNote(
    'قاعدة موحدة لكل الأطراف (موردين / عملاء / ممولين)\n' +
    'يتم الربط مع دفتر الحركات من عمود "اسم المورد/الجهة".'
  );
}


// ==================== 4. قاعدة بيانات البنود (مدمجة) ====================
function createItemsSheet(ss) {
  // حذف الشيت القديم إن وجد
  let oldSheet = ss.getSheetByName(CONFIG.SHEETS.ITEMS);
  if (oldSheet) ss.deleteSheet(oldSheet);

  let sheet = ss.insertSheet(CONFIG.SHEETS.ITEMS);

  // 4 أعمدة
  const headers = [
    'البند',           // A
    'طبيعة الحركة',    // B
    'تصنيف الحركة',    // C
    'ملاحظات'          // D
  ];

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.ITEMS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);

  // عرض الأعمدة
  const widths = [200, 180, 180, 250];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));

  // تجميد الصف الأول
  sheet.setFrozenRows(1);

  // البيانات التجريبية
  const sampleData = [
    ['مونتاج',           '💰 استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['تصوير',            '💰 استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['صوت',              '💰 استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['معدات',            '💰 استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['🏢 إيجار مكتب',    '💰 استحقاق مصروف', 'مصروفات عمومية', ''],
    ['👥 مرتبات إدارية', '💰 استحقاق مصروف', 'مصروفات عمومية', ''],
    ['⚡ مرافق',          '💰 استحقاق مصروف', 'مصروفات عمومية', ''],
    ['🧾 أخرى',          '💰 استحقاق مصروف', 'مصروفات أخرى',   '']
  ];
  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);

  // ملاحظات الأعمدة
  sheet.getRange('B1').setNote(
    'طبيعة الحركة (مثال):\n' +
    '💰 استحقاق مصروف / 💸 دفعة مصروف / 📈 استحقاق إيراد / ✅ تحصيل إيراد / 🏦 تمويل / 💳 سداد تمويل'
  );

  sheet.getRange('C1').setNote(
    'تصنيف الحركة (مثال):\n' +
    'مصروفات مباشرة / مصروفات عمومية / تحصيل فواتير / استلام قرض / سداد قرض'
  );

  // إرجاع الشيت
  return sheet;
}


// ==================== 5. شيت الميزانيات ====================
function createBudgetsSheet(ss) {
  let oldSheet = ss.getSheetByName(CONFIG.SHEETS.BUDGETS);
  if (oldSheet) ss.deleteSheet(oldSheet);
  
  let sheet = ss.insertSheet(CONFIG.SHEETS.BUDGETS);
  
  const headers = [
    'كود المشروع', 'اسم المشروع', 'البند', 'المبلغ المخطط',
    'المبلغ الفعلي', 'الفرق', 'نسبة التنفيذ %', 'ملاحظات'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.BUDGETS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [120, 180, 150, 120, 120, 120, 130, 250];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  const itemsSheet    = ss.getSheetByName(CONFIG.SHEETS.ITEMS);

  // كود المشروع
  if (projectsSheet) {
    const projectRange = projectsSheet.getRange('A2:A200');
    const projectValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر كود المشروع من القائمة أو اكتب يدوياً')
      .build();
    sheet.getRange(2, 1, 100, 1).setDataValidation(projectValidation);
  }

  // البند من قاعدة بيانات البنود
  if (itemsSheet) {
    const itemsRange = itemsSheet.getRange('A2:A200');
    const itemValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(itemsRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر البند من "قاعدة بيانات البنود"')
      .build();
    sheet.getRange(2, 3, 100, 1).setDataValidation(itemValidation);
  }

  // المعادلات
  for (let row = 2; row <= 100; row++) {
    // اسم المشروع من كود المشروع
    sheet.getRange(row, 2).setFormula(
      `=IFERROR(VLOOKUP(A${row},'قاعدة بيانات المشاريع'!A:B,2,FALSE),"")`
    );
    // المبلغ الفعلي = مجموع القيمة بالدولار من دفتر الحركات (مدين استحقاق فقط)
    sheet.getRange(row, 5).setFormula(
      `=SUMIFS('دفتر الحركات المالية'!M:M,` +
      `'دفتر الحركات المالية'!E:E,A${row},` +
      `'دفتر الحركات المالية'!G:G,C${row},` +
      `'دفتر الحركات المالية'!N:N,"مدين استحقاق")`
    );
    // الفرق
    sheet.getRange(row, 6).setFormula(
      `=IF(D${row}="","",D${row}-E${row})`
    );
    // نسبة التنفيذ
    sheet.getRange(row, 7).setFormula(
      `=IF(D${row}=0,"",E${row}/D${row})`
    );
  }
  
  // تنسيق الأرقام
  sheet.getRange(2, 4, 100, 2).setNumberFormat('$#,##0.00'); // المخطط + الفعلي
  sheet.getRange(2, 7, 100, 1).setNumberFormat('0.0%');
  sheet.setFrozenRows(1);
}


// ==================== 6. التنبيهات ====================
function createAlertsSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.ALERTS);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEETS.ALERTS);
  }
  sheet.clear();
  
  const headers = [
    'نوع التنبيه', 'الأولوية', 'المشروع', 'المورد', 'المبلغ',
    'تاريخ الاستحقاق', 'الأيام المتبقية', 'الحالة', 'الإجراء المطلوب'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.ALERTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [150, 100, 180, 150, 120, 130, 120, 120, 250];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  sheet.setFrozenRows(1);
}


// ==================== 7. الوظائف اليومية الأساسية ====================

// استحقاق جديد (مدين)
function addNewExpense() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  
  if (!sheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }
  
  const lastRow = sheet.getLastRow() + 1;
  
  ui.alert(
    '📝 تسجيل استحقاق جديد',
    'سيتم إضافة سطر جديد في الصف ' + lastRow + '\n\n' +
    'املأ البيانات التالية:\n' +
    '• التاريخ (B)\n' +
    '• طبيعة الحركة (C)\n' +
    '• تصنيف الحركة (D)\n' +
    '• كود المشروع (E)\n' +
    '• البند (G)\n' +
    '• اسم المورد/الجهة (I)\n' +
    '• المبلغ بالعملة الأصلية (J)\n' +
    '• العملة (K)\n' +
    '• سعر الصرف (L) إن وجد\n' +
    '• نوع الحركة = "مدين استحقاق" في (N)\n' +
    '• نوع شرط الدفع (R)\n\n' +
    'القيمة بالدولار (M) والرصيد (O) تتحسب تلقائياً.',
    ui.ButtonSet.OK
  );
  
  sheet.setActiveRange(sheet.getRange(lastRow, 2));
}

// دفعة (دائن)
function addPayment() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  
  if (!sheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }
  
  const vendorResponse = ui.prompt(
    '💵 تسجيل دفعة',
    'أدخل اسم المورد/الجهة كما هو في العمود I:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (vendorResponse.getSelectedButton() !== ui.Button.OK) return;
  const vendorName = vendorResponse.getResponseText().trim();
  
  if (!vendorName) {
    ui.alert('⚠️ يجب إدخال اسم المورد/الجهة!');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  let vendorBalance = 0;
  let vendorFound = false;
  
  // I = index 8, O = index 14
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === vendorName) {
      vendorBalance = data[i][14];
      vendorFound = true;
    }
  }
  
  if (!vendorFound) {
    ui.alert('⚠️ لم يتم العثور على أي حركة للطرف: ' + vendorName);
    return;
  }
  
  if (vendorBalance <= 0) {
    ui.alert('✅ رصيد ' + vendorName + ' = صفر أو أقل\n\nلا توجد مستحقات مفتوحة!');
    return;
  }
  
  const amountResponse = ui.prompt(
    '💵 تسجيل دفعة لـ ' + vendorName,
    'الرصيد الحالي (تقريبي بالدولار): $' + vendorBalance.toLocaleString() + '\n\n' +
    'أدخل مبلغ الدفعة (بالدولار):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (amountResponse.getSelectedButton() !== ui.Button.OK) return;
  const amountUsd = parseFloat(amountResponse.getResponseText());
  
  if (isNaN(amountUsd) || amountUsd <= 0) {
    ui.alert('⚠️ مبلغ غير صحيح!');
    return;
  }
  
  if (amountUsd > vendorBalance) {
    ui.alert('⚠️ المبلغ المدخل أكبر من الرصيد!\n\nالرصيد: $' + vendorBalance.toLocaleString());
    return;
  }
  
  const paymentResponse = ui.prompt(
    '💵 تسجيل دفعة لـ ' + vendorName,
    'المبلغ: $' + amountUsd.toLocaleString() + '\n\n' +
    'اختر طريقة الدفع:\n' +
    '1 = نقدي\n' +
    '2 = تحويل بنكي\n' +
    '3 = شيك',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (paymentResponse.getSelectedButton() !== ui.Button.OK) return;
  const paymentChoice = paymentResponse.getResponseText().trim();
  
  let paymentMethod;
  switch (paymentChoice) {
    case '1': paymentMethod = 'نقدي'; break;
    case '2': paymentMethod = 'تحويل بنكي'; break;
    case '3': paymentMethod = 'شيك'; break;
    default:
      ui.alert('⚠️ اختيار غير صحيح!');
      return;
  }
  
  const lastRow = sheet.getLastRow() + 1;
  const today = new Date();
  
  sheet.getRange(lastRow, 2).setValue(today);             // B التاريخ
  sheet.getRange(lastRow, 3).setValue('💸 دفعة مصروف');  // C طبيعة الحركة
  sheet.getRange(lastRow, 4).setValue('مصروفات مباشرة'); // D
  sheet.getRange(lastRow, 9).setValue(vendorName);        // I
  
  sheet.getRange(lastRow, 10).setValue(amountUsd);        // J المبلغ الأصلي
  sheet.getRange(lastRow, 11).setValue('USD');            // K
  sheet.getRange(lastRow, 12).setValue(1);                // L
  
  sheet.getRange(lastRow, 14).setValue('دائن دفعة');     // N
  sheet.getRange(lastRow, 17).setValue(paymentMethod);    // Q
  sheet.getRange(lastRow, 24).setValue('دفعة مسجلة تلقائياً'); // X
  
  ui.alert(
    '✅ تم تسجيل الدفعة بنجاح!\n\n' +
    'الطرف: ' + vendorName + '\n' +
    'المبلغ (بالدولار): $' + amountUsd.toLocaleString() + '\n' +
    'الطريقة: ' + paymentMethod + '\n\n' +
    'الرصيد التقريبي الجديد (على مستوى الطرف): $' + (vendorBalance - amountUsd).toLocaleString()
  );
}

// إيراد (تحصيل من عميل/قناة)
function addRevenue() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  
  if (!sheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }
  
  const lastRow = sheet.getLastRow() + 1;
  
  ui.alert(
    '💰 تسجيل إيراد جديد',
    'سيتم إضافة سطر جديد في الصف ' + lastRow + '\n\n' +
    'املأ البيانات التالية:\n' +
    '• التاريخ (B)\n' +
    '• طبيعة الحركة = "✅ تحصيل إيراد" (C)\n' +
    '• تصنيف الحركة = "تحصيل فواتير" (D)\n' +
    '• كود المشروع (E)\n' +
    '• اسم العميل/القناة في "اسم المورد/الجهة" (I)\n' +
    '• المبلغ بالعملة الأصلية (J) + العملة (K) + سعر الصرف (L)\n' +
    '• نوع الحركة = "دائن دفعة" في (N)\n\n' +
    'القيمة بالدولار (M) والرصيد (O) تتحسب تلقائياً.',
    ui.ButtonSet.OK
  );
  
  sheet.setActiveRange(sheet.getRange(lastRow, 2));
}

// إضافة ميزانية يدوية
function addBudgetForm() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.BUDGETS);
  
  if (!sheet) {
    ui.alert('⚠️ شيت "الميزانيات المخططة" غير موجود!');
    return;
  }
  
  const lastRow = sheet.getLastRow() + 1;
  
  ui.alert(
    '💰 إضافة ميزانية جديدة',
    'سيتم إضافة سطر جديد في الصف ' + lastRow + '\n\n' +
    'املأ البيانات التالية:\n' +
    '• كود المشروع (A)\n' +
    '• البند (C)\n' +
    '• المبلغ المخطط (D)\n\n' +
    'الباقي سيُحسب تلقائياً!',
    ui.ButtonSet.OK
  );
  
  sheet.setActiveRange(sheet.getRange(lastRow, 1));
}

// مقارنة الميزانية
function compareBudget() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    '📊 مقارنة الميزانية',
    'أدخل كود المشروع:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) return;
  
  const projectCode = response.getResponseText().trim();
  if (!projectCode) {
    ui.alert('⚠️ يجب إدخال كود المشروع!');
    return;
  }
  
  const budgetSheet = ss.getSheetByName(CONFIG.SHEETS.BUDGETS);
  if (!budgetSheet) {
    ui.alert('⚠️ شيت الميزانيات غير موجود!');
    return;
  }
  
  const data = budgetSheet.getDataRange().getValues();
  let report = '📊 مقارنة الميزانية - ' + projectCode + '\n\n';
  let found = false;
  let totalPlanned = 0;
  let totalActual = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === projectCode) { // كود المشروع في A
      found = true;
      const item = data[i][2];                     // C
      const planned = Number(data[i][3]) || 0;     // D
      const actual = Number(data[i][4]) || 0;      // E
      const diff = Number(data[i][5]) || 0;        // F
      const percent = Number(data[i][6]) || 0;     // G (0–1)
      
      report += `${item}:\n`;
      report += `  المخطط: $${planned.toLocaleString()}\n`;
      report += `  الفعلي: $${actual.toLocaleString()}\n`;
      report += `  الفرق: $${diff.toLocaleString()}\n`;
      report += `  النسبة: ${(percent * 100).toFixed(1)}%\n\n`;
      
      totalPlanned += planned;
      totalActual += actual;
    }
  }
  
  if (!found) {
    ui.alert('⚠️ لم يتم العثور على ميزانية للمشروع: ' + projectCode);
    return;
  }
  
  report += '─────────────────────\n';
  report += `الإجمالي المخطط: $${totalPlanned.toLocaleString()}\n`;
  report += `الإجمالي الفعلي: $${totalActual.toLocaleString()}\n`;
  report += `الفرق: $${(totalPlanned - totalActual).toLocaleString()}\n`;
  report += `نسبة التنفيذ: ${((totalActual / totalPlanned) * 100).toFixed(1)}%`;
  
  ui.alert(report);
}


// ==================== التنبيهات والاستحقاقات (محدث مع نوع الحركة + العملات) ====================
function updateAlerts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const alertSheet = ss.getSheetByName(CONFIG.SHEETS.ALERTS);
  
  if (!transSheet || !alertSheet) {
    SpreadsheetApp.getUi().alert('⚠️ شيت الحركات أو التنبيهات غير موجود!');
    return;
  }
  
  alertSheet.clear();
  
  const headers = [
    'نوع التنبيه', 'الأولوية', 'المشروع', 'الطرف', 'المبلغ (USD)',
    'تاريخ الاستحقاق', 'الأيام المتبقية', 'الحالة', 'الإجراء المطلوب'
  ];
  
  alertSheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.ALERTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold');
  
  const data = transSheet.getDataRange().getValues();
  const today = new Date();
  const alerts = [];
  
  for (let i = 1; i < data.length; i++) {
    const movementKind = data[i][13]; // N: نوع الحركة (مدين استحقاق / دائن دفعة)
    const project      = data[i][5];  // F: اسم المشروع
    const party        = data[i][8];  // I: الطرف (مورد/عميل/ممول)
    const amountUsd    = Number(data[i][12]) || 0; // M: القيمة بالدولار
    const dueDate      = data[i][20]; // U: تاريخ الاستحقاق
    const status       = data[i][21]; // V: حالة السداد
    
    if (movementKind === CONFIG.MOVEMENT.DEBIT && amountUsd > 0 && dueDate && status !== CONFIG.PAYMENT_STATUS.PAID) {
      const dueDateObj = new Date(dueDate);
      const daysLeft = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
      
      let priority, alertType, action;
      
      if (daysLeft < 0) {
        priority = '🔴 عاجل';
        alertType = 'استحقاق متأخر';
        action = 'سداد فوري';
      } else if (daysLeft <= 3) {
        priority = '🟠 مهم';
        alertType = 'استحقاق قريب';
        action = 'تجهيز المبلغ';
      } else if (daysLeft <= 7) {
        priority = '🟡 متوسط';
        alertType = 'استحقاق قادم';
        action = 'متابعة';
      } else {
        continue;
      }
      
      alerts.push([
        alertType,
        priority,
        project,
        party,
        amountUsd,
        Utilities.formatDate(dueDateObj, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
        daysLeft + ' يوم',
        status,
        action
      ]);
    }
  }
  
  if (alerts.length > 0) {
    // ترتيب حسب الأيام المتبقية (عمود "الأيام المتبقية" = index 6 في alerts)
    alerts.sort((a, b) => parseInt(a[6]) - parseInt(b[6]));
    alertSheet.getRange(2, 1, alerts.length, headers.length).setValues(alerts);
  }
  
  SpreadsheetApp.getUi().alert(
    '✅ تم تحديث التنبيهات!\n\n' +
    'عدد التنبيهات: ' + alerts.length
  );
}

// ==================== نافذة الاستحقاقات القادمة (30 يوم) ====================
function showUpcomingPayments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  
  if (!transSheet) {
    SpreadsheetApp.getUi().alert('⚠️ شيت دفتر الحركات غير موجود!');
    return;
  }
  
  const today = new Date();
  const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const transData = transSheet.getDataRange().getValues();
  let upcomingPayments = [];
  
  for (let i = 1; i < transData.length; i++) {
    const movementKind = transData[i][13];  // N: نوع الحركة
    const status       = transData[i][21];  // V: حالة السداد
    const dueDate      = transData[i][20];  // U: تاريخ الاستحقاق
    const balance      = Number(transData[i][14]) || 0; // O: الرصيد (بالدولار على مستوى الطرف)
    const party        = transData[i][8];   // I: الطرف
    const project      = transData[i][5];   // F: اسم المشروع
    
    if (movementKind === CONFIG.MOVEMENT.DEBIT && balance > 0 && dueDate && status !== CONFIG.PAYMENT_STATUS.PAID) {
      const dueDateObj = new Date(dueDate);
      if (dueDateObj <= next30Days) {
        const daysLeft = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
        upcomingPayments.push({
          party: party,
          project: project,
          amount: balance, // رصيد الطرف بالدولار
          dueDate: Utilities.formatDate(dueDateObj, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          daysLeft: daysLeft,
          status: status
        });
      }
    }
  }
  
  upcomingPayments.sort((a, b) => a.daysLeft - b.daysLeft);
  
  let message = '🔔 الاستحقاقات خلال الـ 30 يوم القادمة:\n\n';
  
  if (upcomingPayments.length === 0) {
    message += '✅ لا توجد استحقاقات خلال الفترة القادمة';
  } else {
    let total = 0;
    upcomingPayments.forEach(payment => {
      const statusIcon = payment.daysLeft < 0
        ? '🔴 متأخر'
        : payment.daysLeft <= 3
          ? '🟠 عاجل'
          : '🟢 قريب';
      message += `${statusIcon} ${payment.party} - ${payment.project}\n`;
      message += `   المبلغ (USD): $${payment.amount.toLocaleString()} | التاريخ: ${payment.dueDate} | متبقي: ${payment.daysLeft} يوم\n\n`;
      total += payment.amount;
    });
    message += `\n💰 إجمالي المستحقات (تقريباً بالدولار): $${total.toLocaleString()}`;
  }
  
  SpreadsheetApp.getUi().alert(message);
}


// ==================== تقرير مورد تفصيلي (محدث بالعملات) ====================
function generateVendorDetailedReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    '👤 تقرير طرف تفصيلي',
    'أدخل اسم الطرف (مورد/عميل/ممول) بالضبط كما في دفتر الحركات:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) return;
  
  const partyName = response.getResponseText().trim();
  if (!partyName) {
    ui.alert('⚠️ يجب إدخال اسم الطرف!');
    return;
  }
  
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (!transSheet) {
    ui.alert('⚠️ شيت الحركات غير موجود!');
    return;
  }
  
  const data = transSheet.getDataRange().getValues();
  const rows = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === partyName) {  // I: اسم الطرف
      rows.push({
        date:           data[i][1],   // B: التاريخ
        movementType:   data[i][2],   // C: طبيعة الحركة
        classification: data[i][3],   // D: تصنيف الحركة
        project:        data[i][5],   // F: اسم المشروع
        item:           data[i][6],   // G: البند
        details:        data[i][7],   // H: التفاصيل
        amountOriginal: Number(data[i][9])  || 0,  // J: المبلغ الأصلي
        currency:       data[i][10] || '',        // K: العملة
        rate:           Number(data[i][11]) || 0, // L: سعر الصرف
        amountUsd:      Number(data[i][12]) || 0, // M: القيمة بالدولار
        movementKind:   data[i][13],             // N: نوع الحركة
        balance:        Number(data[i][14]) || 0, // O: الرصيد
        refNum:         data[i][15],             // P: رقم مرجعي
        notes:          data[i][23]              // X: ملاحظات
      });
    }
  }
  
  if (rows.length === 0) {
    ui.alert('⚠️ لم يتم العثور على حركات للطرف: ' + partyName);
    return;
  }
  
  // ترتيب زمني
  rows.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let totalDebitUsd = 0;
  let totalCreditUsd = 0;
  let paymentCount = 0;
  
  rows.forEach(row => {
    if (row.movementKind === CONFIG.MOVEMENT.DEBIT) {
      totalDebitUsd += row.amountUsd;
    } else if (row.movementKind === CONFIG.MOVEMENT.CREDIT) {
      totalCreditUsd += row.amountUsd;
      if (row.amountUsd > 0) paymentCount++;
    }
  });
  
  const currentBalanceCalc = totalDebitUsd - totalCreditUsd;
  const lastBalance = rows[rows.length - 1].balance || currentBalanceCalc;
  
  let report = `📊 تقرير تفصيلي - ${partyName}\n`;
  report += '═'.repeat(50) + '\n\n';
  
  report += '💰 ملخص الحساب (بالدولار):\n';
  report += `• إجمالي الاستحقاقات (مدين استحقاق): $${totalDebitUsd.toLocaleString()}\n`;
  report += `• إجمالي الدفعات (دائن دفعة): $${totalCreditUsd.toLocaleString()}\n`;
  report += `• الرصيد الحالي التقريبي: $${lastBalance.toLocaleString()}\n`;
  report += `• عدد الدفعات: ${paymentCount}\n\n`;
  
  report += '📋 كشف الحساب التفصيلي:\n';
  report += '─'.repeat(50) + '\n';
  
  rows.forEach(row => {
    const dateStr = row.date
      ? Utilities.formatDate(new Date(row.date), Session.getScriptTimeZone(), 'yyyy-MM-dd')
      : '';
    
    report += `\n📅 ${dateStr} | ${row.movementType} (${row.classification})\n`;
    report += `   المشروع: ${row.project || '-'} - ${row.item || '-'}\n`;
    
    if (row.details) {
      report += `   التفاصيل: ${row.details}\n`;
    }
    
    // تنسيق مبلغ أصلي + بالدولار
    let originalPart = '';
    if (row.amountOriginal) {
      originalPart = `${row.amountOriginal.toLocaleString()} ${row.currency || ''}`.trim();
    }
    const usdPart = row.amountUsd ? `$${row.amountUsd.toLocaleString()}` : '';
    let amountText = usdPart;
    if (originalPart && usdPart) {
      amountText = `${originalPart} ≈ ${usdPart}`;
    } else if (originalPart) {
      amountText = originalPart;
    }
    
    if (row.movementKind === CONFIG.MOVEMENT.DEBIT) {
      report += `   مدين (استحقاق): ${amountText}\n`;
    } else if (row.movementKind === CONFIG.MOVEMENT.CREDIT) {
      report += `   دائن (دفعة/تحصيل): ${amountText}\n`;
    }
    
    report += `   الرصيد (USD): $${row.balance.toLocaleString()}\n`;
    
    if (row.refNum) {
      report += `   رقم مرجعي: ${row.refNum}\n`;
    }
    if (row.notes) {
      report += `   📝 ${row.notes}\n`;
    }
  });
  
  report += '\n' + '═'.repeat(50) + '\n';
  report += `🔚 نهاية التقرير - الرصيد النهائي (تقريبي): $${lastBalance.toLocaleString()}`;
  
  ui.alert(report);
}


// ==================== كشف حساب طرف مختصر (محدث) ====================
function showVendorStatement() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    '📋 كشف حساب طرف',
    'أدخل اسم الطرف (مورد/عميل/ممول):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) return;
  
  const partyName = response.getResponseText().trim();
  if (!partyName) {
    ui.alert('⚠️ يجب إدخال اسم الطرف!');
    return;
  }
  
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (!transSheet) {
    ui.alert('⚠️ شيت الحركات غير موجود!');
    return;
  }
  
  const data = transSheet.getDataRange().getValues();
  const rows = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === partyName) { // I: الطرف
      rows.push({
        date:         data[i][1],              // B
        movementType: data[i][2],              // C
        movementKind: data[i][13],             // N
        amountUsd:    Number(data[i][12]) || 0,// M
        balance:      Number(data[i][14]) || 0 // O
      });
    }
  }
  
  if (rows.length === 0) {
    ui.alert('⚠️ لم يتم العثور على حركات للطرف: ' + partyName);
    return;
  }
  
  rows.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let statement = `📋 كشف حساب: ${partyName}\n`;
  statement += '═'.repeat(40) + '\n\n';
  
  let currentBalance = 0;
  
  rows.forEach(row => {
    const dateStr = row.date
      ? Utilities.formatDate(new Date(row.date), Session.getScriptTimeZone(), 'yyyy-MM-dd')
      : '';
    
    statement += `${dateStr} | ${row.movementType}\n`;
    
    if (row.movementKind === CONFIG.MOVEMENT.DEBIT) {
      statement += `         مدين (استحقاق): $${row.amountUsd.toLocaleString()}\n`;
    } else if (row.movementKind === CONFIG.MOVEMENT.CREDIT) {
      statement += `         دائن (دفعة/تحصيل): $${row.amountUsd.toLocaleString()}\n`;
    }
    
    currentBalance = row.balance;
    statement += `         رصيد (USD): $${row.balance.toLocaleString()}\n\n`;
  });
  
  statement += '═'.repeat(40) + '\n';
  statement += `الرصيد الحالي (تقريبي بالدولار): $${currentBalance.toLocaleString()}`;
  
  ui.alert(statement);
}


// ==================== تقرير ربحية المشروع (محدث باستخدام القيمة بالدولار) ====================
function showProjectProfitability() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.prompt(
    '💹 تقرير ربحية مشروع',
    'أدخل كود المشروع:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) return;
  
  const projectCode = response.getResponseText().trim();
  if (!projectCode) {
    ui.alert('⚠️ يجب إدخال كود المشروع!');
    return;
  }
  
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  const transSheet    = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  
  if (!projectsSheet || !transSheet) {
    ui.alert('⚠️ الشيتات المطلوبة غير موجودة!');
    return;
  }
  
  const projectsData = projectsSheet.getDataRange().getValues();
  let projectInfo = null;
  
  // كود المشروع (A)، اسم المشروع (B)، نوع التمويل (G)، قيمة التمويل (H)، قيمة العقد (I)، مدة المشروع بالأشهر (N)
  for (let i = 1; i < projectsData.length; i++) {
    if (projectsData[i][0] === projectCode) {
      projectInfo = {
        name:            projectsData[i][1],
        fundingType:     projectsData[i][6],
        fundingValue:    Number(projectsData[i][7]) || 0,
        contractValue:   Number(projectsData[i][8]) || 0,
        projectDuration: projectsData[i][13] || 1
      };
      break;
    }
  }
  
  if (!projectInfo) {
    ui.alert('⚠️ لم يتم العثور على المشروع: ' + projectCode);
    return;
  }
  
  const transData = transSheet.getDataRange().getValues();
  let directExpenses    = 0;  // مصروفات مباشرة (مدين استحقاق)
  let overheadExpenses  = 0;  // مصروفات عمومية (مدين استحقاق)
  let revenues          = 0;  // إيرادات (تحصيل فعلي)
  
  for (let i = 1; i < transData.length; i++) {
    if (transData[i][4] === projectCode) { // E: كود المشروع
      const movementType   = transData[i][2];  // C: طبيعة الحركة (إيموجي)
      const classification = transData[i][3];  // D: تصنيف الحركة
      const movementKind   = transData[i][13]; // N: نوع الحركة
      const amountUsd      = Number(transData[i][12]) || 0; // M: القيمة بالدولار
      
      // مصروفات مباشرة/عمومية (استحقاق فقط)
      if (movementKind === CONFIG.MOVEMENT.DEBIT && classification === 'مصروفات مباشرة') {
        directExpenses += amountUsd;
      }
      if (movementKind === CONFIG.MOVEMENT.DEBIT && classification === 'مصروفات عمومية') {
        overheadExpenses += amountUsd;
      }
      
      // إيرادات محصّلة (نقدية) = تحصيل إيراد + نوع الحركة دائن دفعة
      if (movementType === '✅ تحصيل إيراد' && movementKind === CONFIG.MOVEMENT.CREDIT) {
        revenues += amountUsd;
      }
    }
  }
  
  // مصروفات عمومية محسوبة 30% للتمويل الخارجي/المشترك
  let calculatedOverhead = 0;
  if (projectInfo.fundingType === 'خارجي' || projectInfo.fundingType === 'مشترك') {
    calculatedOverhead = (directExpenses * 0.30) * (Number(projectInfo.projectDuration) || 1);
  }
  
  const totalOverhead  = overheadExpenses + calculatedOverhead;
  const totalExpenses  = directExpenses + totalOverhead;
  const netProfit      = revenues - totalExpenses;
  const profitMargin   = revenues > 0 ? (netProfit / revenues) * 100 : 0;
  
  let report = `💹 تقرير ربحية - ${projectCode}\n`;
  report += `${projectInfo.name}\n`;
  report += '═'.repeat(50) + '\n\n';
  
  report += '📊 البيانات الأساسية:\n';
  report += `• نوع التمويل: ${projectInfo.fundingType}\n`;
  report += `• قيمة التمويل: $${projectInfo.fundingValue.toLocaleString()}\n`;
  report += `• قيمة العقد مع القناة: $${projectInfo.contractValue.toLocaleString()}\n`;
  report += `• مدة المشروع (أشهر): ${projectInfo.projectDuration}\n\n`;
  
  report += '💰 التكاليف (USD):\n';
  report += `• مصروفات مباشرة (استحقاق): $${directExpenses.toLocaleString()}\n`;
  report += `• مصروفات عمومية مسجلة: $${overheadExpenses.toLocaleString()}\n`;
  
  if (calculatedOverhead > 0) {
    report += `• مصروفات عمومية محسوبة (30% × ${projectInfo.projectDuration} شهر): $${calculatedOverhead.toLocaleString()}\n`;
  }
  
  report += `• إجمالي المصروفات العمومية: $${totalOverhead.toLocaleString()}\n`;
  report += `• إجمالي المصروفات: $${totalExpenses.toLocaleString()}\n\n`;
  
  report += '💵 الإيرادات (USD):\n';
  report += `• إجمالي الإيرادات المحصّلة: $${revenues.toLocaleString()}\n\n`;
  
  report += '📈 الربحية:\n';
  const profitIcon = netProfit >= 0 ? '✅' : '❌';
  report += `${profitIcon} صافي الربح: $${netProfit.toLocaleString()}\n`;
  report += `📊 هامش الربح: ${profitMargin.toFixed(2)}%\n\n`;
  
  if (projectInfo.fundingValue > 0) {
    const roi = ((netProfit / projectInfo.fundingValue) * 100).toFixed(2);
    report += `💹 العائد على الاستثمار (ROI): ${roi}%\n`;
  }
  
  ui.alert(report);
}


// ==================== دليل الاستخدام (محدث لنظام العملات + نوع الحركة) ====================
function showGuide() {
  const ui = SpreadsheetApp.getUi();
  
  ui.alert(
    '📖 دليل الاستخدام - نظام العملات + نوع الحركة',
    '1️⃣ دفتر الحركات المالية:\n' +
    '   • J: المبلغ بالعملة الأصلية (TRY / USD / EGP ...)\n' +
    '   • K: العملة\n' +
    '   • L: سعر الصرف إلى دولار (لو فضلت فاضي = نفس العملة USD)\n' +
    '   • M: القيمة بالدولار (تحسب تلقائياً = J × L)\n' +
    '   • N: نوع الحركة = "مدين استحقاق" أو "دائن دفعة"\n' +
    '   • O: الرصيد بالدولار على مستوى الطرف (مجموع المدين - الدائن)\n\n' +
    '2️⃣ طبيعة الحركة (C) وتصنيف الحركة (D):\n' +
    '   • طبيعة الحركة: مثل 💰 استحقاق مصروف / 💸 دفعة مصروف / 📈 استحقاق إيراد / ✅ تحصيل إيراد\n' +
    '   • تصنيف الحركة: مصروفات مباشرة / مصروفات عمومية / تحصيل فواتير / ...\n\n' +
    '3️⃣ حالة السداد (V):\n' +
    '   • "معلق"      = استحقاق لم يُغلق بالكامل\n' +
    '   • "مدفوع بالكامل" = لا يوجد رصيد مفتوح على الطرف\n' +
    '   • "عملية دفع/تحصيل" = سطر دفعة/تحصيل فقط\n\n' +
    '4️⃣ التقارير:\n' +
    '   • تقرير ربحية المشروع يعتمد على القيمة بالدولار (M)\n' +
    '   • كشف حساب الطرف يوضح الاستحقاقات والدفعات بالدولار مع المحافظة على بيانات العملة الأصلية في الدفتر\n' +
    '   • التنبيهات والاستحقاقات تعتمد على نوع الحركة "مدين استحقاق" وتاريخ الاستحقاق (U).\n\n' +
    '5️⃣ قاعدة بيانات الأطراف:\n' +
    '   • شيت "قاعدة بيانات الأطراف" يحتوي على الموردين والعملاء والممولين في مكان واحد، والربط يتم من عمود "اسم المورد/الجهة" في دفتر الحركات.',
    ui.ButtonSet.OK
  );
}


// ==================== تحديث القوائم المنسدلة (موافق للهيكل الجديد) ====================
function refreshDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const transSheet    = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  const partiesSheet  = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  const itemsSheet    = ss.getSheetByName(CONFIG.SHEETS.ITEMS);
  const budgetSheet   = ss.getSheetByName(CONFIG.SHEETS.BUDGETS);
  
  if (!transSheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }
  
  const lastRow = 500;
  
  // كود المشروع في دفتر الحركات (E)
  if (projectsSheet) {
    const projectRange = projectsSheet.getRange('A2:A200');
    const projectValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر كود المشروع من القائمة أو اكتب يدوياً')
      .build();
    transSheet.getRange(2, 5, lastRow, 1).setDataValidation(projectValidation); // E
  }
  
  // اسم الطرف (مورد/عميل/ممول) في دفتر الحركات (I)
  if (partiesSheet) {
    const partyRange = partiesSheet.getRange('A2:A500');
    const partyValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(partyRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر اسم الطرف من "قاعدة بيانات الأطراف" أو اكتب يدوياً')
      .build();
    transSheet.getRange(2, 9, lastRow, 1).setDataValidation(partyValidation); // I
  }
  
  // البنود + طبيعة الحركة + تصنيف الحركة من "قاعدة بيانات البنود"
  if (itemsSheet) {
    const lastItemsRow = Math.max(itemsSheet.getLastRow() - 1, 1);
    
    // البند (G) من عمود A
    const itemsRange = itemsSheet.getRange(2, 1, lastItemsRow, 1); // A2:A
    const itemValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(itemsRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر البند من "قاعدة بيانات البنود" أو اكتب يدوياً')
      .build();
    transSheet.getRange(2, 7, lastRow, 1).setDataValidation(itemValidation); // G
    
    // طبيعة الحركة (C) من عمود B
    const movementRange = itemsSheet.getRange(2, 2, lastItemsRow, 1); // B2:B
    const movementValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(movementRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر طبيعة الحركة من "قاعدة بيانات البنود" (عمود B)')
      .build();
    transSheet.getRange(2, 3, lastRow, 1).setDataValidation(movementValidation); // C
    
    // تصنيف الحركة (D) من عمود C
    const classRange = itemsSheet.getRange(2, 3, lastItemsRow, 1); // C2:C
    const classValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(classRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر تصنيف الحركة من "قاعدة بيانات البنود" (عمود C)')
      .build();
    transSheet.getRange(2, 4, lastRow, 1).setDataValidation(classValidation); // D
  }
  
  // كود المشروع في شيت الميزانيات (A) + البند (C)
  if (budgetSheet && projectsSheet) {
    const projectRange = projectsSheet.getRange('A2:A200');
    const projectValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر كود المشروع من القائمة أو اكتب يدوياً')
      .build();
    budgetSheet.getRange(2, 1, 100, 1).setDataValidation(projectValidation); // A
  }
  
  if (budgetSheet && itemsSheet) {
    const lastItemsRow = Math.max(itemsSheet.getLastRow() - 1, 1);
    const itemsRange = itemsSheet.getRange(2, 1, lastItemsRow, 1); // A2:A
    const itemValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(itemsRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر البند من "قاعدة بيانات البنود"')
      .build();
    budgetSheet.getRange(2, 3, 100, 1).setDataValidation(itemValidation); // C
  }
  
  ui.alert(
    '✅ تم تحديث القوائم المنسدلة!\n\n' +
    '• كود المشروع في دفتر الحركات والميزانيات\n' +
    '• اسم الطرف من "قاعدة بيانات الأطراف"\n' +
    '• البنود + طبيعة الحركة + تصنيف الحركة من "قاعدة بيانات البنود"'
  );
}


// ==================== تصحيح عنوان عمود الملاحظات (مواكب للهيكل الجديد) ====================
function patchRenameNotesColumn() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (!sheet) return;
  // العمود 24 هو عمود الملاحظات (X) في الهيكل الجديد
  sheet.getRange(1, 24).setValue('ملاحظات');
}

// ==================== التقارير - الجزء 2 ====================
function setupPart2() {
  if (!confirmReset()) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  createProjectReportSheet(ss);
  createVendorReportSheet(ss);
  createExpenseReportSheet(ss);
  createRevenueReportSheet(ss);
  createCashFlowSheet(ss);
  createDashboardSheet(ss);
  createInvoiceTemplateSheet(ss);   // 🆕 نموذج فاتورة القناة
  
  SpreadsheetApp.getUi().alert(
    '✅ تم إنشاء الجزء 2 بنجاح!\n\n' +
    'التقارير المتاحة:\n' +
    '• تقرير المشروع التفصيلي\n' +
    '• تقرير الموردين الملخص\n' +
    '• تقرير المصروفات\n' +
    '• تقرير الإيرادات\n' +
    '• التدفقات النقدية\n' +
    '• لوحة التحكم\n' +
    '• 🧾 نموذج فاتورة قناة\n\n' +
    '🎉 النظام جاهز!'
  );
}

// ==================== نموذج الفاتورة الإنجليزي ====================
function createInvoiceTemplateSheet(ss) {
  // نشتغل على نفس التاب اللي عندك في الصورة
  let sheet = ss.getSheetByName(CONFIG.SHEETS.INVOICE) || ss.getSheetByName('Invoice');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEETS.INVOICE);
  }

  // نفرّغ ونبني من جديد
  sheet.clear();
  sheet.setRightToLeft(false);

  // عرض الأعمدة
  sheet.setColumnWidth(1, 220); // A
  sheet.setColumnWidth(2, 160); // B
  sheet.setColumnWidth(3, 120); // C
  sheet.setColumnWidth(4, 140); // D

  // ===== Company header =====
  sheet.getRange('A1:D1').merge()
    .setValue('START SCENE MEDIA PRODUKSIYON LIMITED')
    .setFontSize(13)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A2:D2').merge()
    .setValue('212 My Office - Office No177 - Istanbul - Bagcilar')
    .setHorizontalAlignment('center');

  sheet.getRange('A3:D3').merge()
    .setValue('Finance@seenfilm.net  |   www.seenfilm.net')
    .setHorizontalAlignment('center');

  // ===== INVOICE title =====
  sheet.getRange('A5:D5').merge()
    .setValue('INVOICE')
    .setFontSize(18)
    .setFontWeight('bold')
    .setFontColor(CONFIG.COLORS.TEXT.WARNING)
    .setHorizontalAlignment('center');

  // ===== Invoice basic info =====
  sheet.getRange('A7').setValue('Invoice No:').setFontWeight('bold');
  sheet.getRange('B7').setValue(''); // سيتم ملؤه من الدالة

  sheet.getRange('A8').setValue('Invoice Date:').setFontWeight('bold');
  sheet.getRange('B8').setNumberFormat('yyyy-mm-dd'); // سيتم ملؤه من الدالة

  // ===== Client (TV Channel) =====
  sheet.getRange('A10').setValue('Client (TV Channel):').setFontWeight('bold');
  sheet.getRange('B10:D10').merge();   // Al Araby, Al Jazeera, ...

  sheet.getRange('A11').setValue('Client Email:').setFontWeight('bold');
  sheet.getRange('B11:D11').merge();

  // ===== Project name only =====
  sheet.getRange('A13').setValue('Project Name:').setFontWeight('bold');
  sheet.getRange('B13:D13').merge();

  // ===== Items table =====
  sheet.getRange('A15:D15')
    .setValues([['Description', 'Qty', 'Unit Price (USD)', 'Total (USD)']])
    .setBackground(CONFIG.COLORS.BG.GRAY)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // سطر افتراضي للبند الرئيسي (هيتغيّر من الدالة)
  sheet.getRange('A16').setValue('Full project contract value');
  sheet.getRange('B16').setValue(1);
  sheet.getRange('C16').setNumberFormat('$#,##0.00');
  sheet.getRange('D16').setFormula('=B16*C16').setNumberFormat('$#,##0.00');

  // صفين إضافيين
  sheet.getRange('C17:C18').setNumberFormat('$#,##0.00');
  sheet.getRange('D17:D18').setFormulaR1C1('=RC[-1]*RC[-2]').setNumberFormat('$#,##0.00');

  // إجمالي
  sheet.getRange('C20').setValue('TOTAL:').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.getRange('D20')
    .setFormula('=SUM(D16:D18)')
    .setNumberFormat('$#,##0.00')
    .setFontWeight('bold');

  // ===== Notes =====
  sheet.getRange('A22:D22').merge()
    .setValue('Notes:')
    .setFontWeight('bold')
    .setHorizontalAlignment('left');

  sheet.getRange('A23:D25').merge().setWrap(true);

  // ===== Bank details =====
  sheet.getRange('A27:D27').merge()
    .setValue('BANK ACCOUNT DETAILS')
    .setBackground(CONFIG.COLORS.BG.DARK_GRAY)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('left');

  sheet.getRange('A28').setValue('Bank Name:').setFontWeight('bold');
  sheet.getRange('B28:D28').merge().setValue('KUVEYT TURK');

  sheet.getRange('A29').setValue('Account No:').setFontWeight('bold');
  sheet.getRange('B29:D29').merge().setValue('96160301');

  sheet.getRange('A30').setValue('IBAN:').setFontWeight('bold');
  sheet.getRange('B30:D30').merge().setValue('TR460020500009616030100101');

  sheet.getRange('A31').setValue('Account Name:').setFontWeight('bold');
  sheet.getRange('B31:D31').merge().setValue('Start Scene Media Produksiyon Limited');

  sheet.getRange('A32').setValue('Swift Code:').setFontWeight('bold');
  sheet.getRange('B32:D32').merge().setValue('KTEFTRIS');

  // خلي كل قيم بيانات البنك نص ومحاذاة موحدة لليسار
  sheet.getRange('B28:D32')
    .setNumberFormat('@')               // ← نص، وليس رقم
    .setHorizontalAlignment('left');    // ← نحيّة الشمال

  sheet.setFrozenRows(6);

  return sheet;
}

// ==================== إنشاء الفاتورة وملء البيانات ====================
function generateChannelInvoice() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  if (!projectsSheet) {
    ui.alert('⚠️ شيت "قاعدة بيانات المشاريع" غير موجود.');
    return;
  }

  // ١) نبني النموذج الإنجليزي في نفس التاب كل مرة
  const invoiceSheet = createInvoiceTemplateSheet(ss);

  // ٢) نطلب كود المشروع
  const response = ui.prompt(
    '🧾 Create invoice',
    'Enter the project code as in "قاعدة بيانات المشاريع":',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const projectCode = response.getResponseText().trim();
  if (!projectCode) {
    ui.alert('⚠️ No project code entered.');
    return;
  }

  // ٣) البحث عن المشروع
  const data = projectsSheet.getDataRange().getValues();
  const headers = data[0];        // صف العناوين
  let projectRow = null;
  let projectRowIndex = -1;       // رقم الصف (للحفظ لاحقًا)

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === projectCode) { // A = كود المشروع
      projectRow = data[i];
      projectRowIndex = i;
      break;
    }
  }

  if (!projectRow) {
    ui.alert('⚠️ Project not found: ' + projectCode);
    return;
  }

  const projectName   = projectRow[1];              // اسم المشروع
  const projectType   = projectRow[2];              // نوع المشروع
  const channelName   = projectRow[3];              // القناة / الجهة
  const contractValue = Number(projectRow[8]) || 0; // قيمة العقد مع القناة

  if (!contractValue) {
    ui.alert('⚠️ Contract value is zero or missing (قيمة العقد مع القناة).');
    return;
  }

  // ٤) إيميل القناة (اختياري)
  const emailResp = ui.prompt(
    'Client email (optional)',
    'Enter client email (TV channel) or leave blank:',
    ui.ButtonSet.OK_CANCEL
  );
  const clientEmail = (emailResp.getSelectedButton() === ui.Button.OK)
    ? emailResp.getResponseText().trim()
    : '';

  // ٥) رقم الفاتورة والتاريخ
  const today = new Date();
  const invoiceNumber = 'INV-' + projectCode + '-' +
    Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyyMMdd');

  invoiceSheet.getRange('B7').setValue(invoiceNumber);
  invoiceSheet.getRange('B8').setValue(today).setNumberFormat('yyyy-mm-dd');

  // ٦) بيانات العميل والمشروع
  invoiceSheet.getRange('B10').setValue(channelName || '');
  invoiceSheet.getRange('B11').setValue(clientEmail || '');
  invoiceSheet.getRange('B13').setValue(projectName || '');

  // ٧) البند الرئيسي في الجدول — الوصف = نوع المشروع + اسم المشروع
  let descriptionText = '';
  if (projectType) descriptionText += projectType;
  if (projectType && projectName) descriptionText += ' - ';
  if (projectName) descriptionText += projectName;

  invoiceSheet.getRange('A16').setValue(descriptionText || projectName || projectType || '');
  invoiceSheet.getRange('B16').setValue(1);
  invoiceSheet.getRange('C16')
    .setValue(contractValue)
    .setNumberFormat('$#,##0.00');
  // D16 من القالب = B16*C16

  // ٨) حفظ رقم الفاتورة داخل "قاعدة بيانات المشاريع" في عمود جديد (رقم آخر فاتورة)
  let invoiceColIndex = headers.indexOf('رقم آخر فاتورة');
  if (invoiceColIndex === -1) {
    // لو العنوان مش موجود، نحطه في أول عمود فاضي بعد آخر عنوان
    invoiceColIndex = headers.length;
    projectsSheet.getRange(1, invoiceColIndex + 1).setValue('رقم آخر فاتورة');
  }
  // projectRowIndex هو إندكس الصف داخل data، فصف الشيت = projectRowIndex + 1
  projectsSheet.getRange(projectRowIndex + 1, invoiceColIndex + 1).setValue(invoiceNumber);

  // ٩) رسالة نجاح
  ui.alert(
    '✅ Invoice data has been filled in the sheet "فاتورة قناة / جهة".\n\n' +
    'Description = نوع المشروع + اسم المشروع\n' +
    'Contract value has been added, and invoice number saved in "قاعدة بيانات المشاريع".'
  );
}

// ==================== كشف حساب مورد - في شيت (محدث للهيكل الجديد) ====================
function generateVendorStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const transSheet   = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const vendorsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_VENDORS);

  if (!transSheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }

  // اسم المورد
  const response = ui.prompt(
    '📄 كشف حساب مورد في شيت',
    'اكتب اسم المورد كما هو مسجل:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const vendorName = response.getResponseText().trim();
  if (!vendorName) {
    ui.alert('⚠️ لم يتم إدخال الاسم.');
    return;
  }

  // تجهيز الشيت
  let sheet = ss.getSheetByName(CONFIG.SHEETS.VENDOR_STATEMENT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.VENDOR_STATEMENT);
  sheet.setTabColor(CONFIG.COLORS.TAB.VENDOR_STATEMENT);    // لون مختلف لكشف حساب المورد
  sheet.clear();
  sheet.setRightToLeft(true);

  // عرض الأعمدة
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 220);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 130);

  // ===== بيانات المورد =====
  let phone = '', email = '', bank = '', vNotes = '';

  if (vendorsSheet) {
    const vData = vendorsSheet.getDataRange().getValues();
    for (let i = 1; i < vData.length; i++) {
      if (vData[i][0] === vendorName) {
        phone  = vData[i][2] || ''; // رقم الهاتف
        email  = vData[i][3] || ''; // البريد الإلكتروني
        bank   = vData[i][5] || ''; // بيانات الحساب البنكي
        vNotes = vData[i][6] || ''; // ملاحظات
        break;
      }
    }
  }

  // ===== العنوان الرئيسي — بدون "نظام المحاسبة 2.1" =====
  sheet.getRange('A1:H1').merge();
  sheet.getRange('A1')
    .setValue('📊 كشف حساب مورد')
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(15)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // ===== كارت بيانات المورد =====
  sheet.getRange('A3:H3').merge()
    .setValue('بيانات المورد')
    .setBackground(CONFIG.COLORS.HEADER.SUMMARY)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A4:H7').setBackground(CONFIG.COLORS.BG.LIGHT_BLUE);

  sheet.getRange('A4').setValue('اسم المورد:').setFontWeight('bold');
  sheet.getRange('B4:D4').merge().setValue(vendorName);

  sheet.getRange('A5').setValue('الهاتف:').setFontWeight('bold');
  sheet.getRange('B5:D5').merge().setValue(phone);

  sheet.getRange('F5').setValue('البريد الإلكتروني:').setFontWeight('bold');
  sheet.getRange('G5:H5').merge().setValue(email);

  sheet.getRange('A6').setValue('بيانات بنكية:').setFontWeight('bold');
  sheet.getRange('B6:H6').merge().setValue(bank);

  sheet.getRange('A7').setValue('ملاحظات داخلية:').setFontWeight('bold');
  sheet.getRange('B7:H7').merge().setValue(vNotes).setWrap(true);

  sheet.getRange('A4:H7').setBorder(
    true, true, true, true, true, true,
    '#1565c0',
    SpreadsheetApp.BorderStyle.SOLID
  );

  // ===== استخراج حركات المورد من الدفتر الجديد =====
  const data = transSheet.getDataRange().getValues();
  const rows = [];

  let totalAccrual = 0, totalPaid = 0, balance = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    if (row[8] !== vendorName) continue;   // I: اسم المورد/الجهة

    const typeMov     = row[2];              // C: طبيعة الحركة (إيموجي)
    const movementKind = row[13];            // N: نوع الحركة (مدين استحقاق / دائن دفعة)
    const amountUsd   = Number(row[12]) || 0;// M: القيمة بالدولار

    // نقصر كشف حساب المورد على حركات المصروفات فقط (استحقاق + دفعات)
    if (typeMov !== '💰 استحقاق مصروف' && typeMov !== '💸 دفعة مصروف') continue;
    if (!amountUsd) continue;

    const date    = row[1];   // B: التاريخ
    const project = row[5];   // F: اسم المشروع
    const item    = row[6];   // G: البند
    const details = row[7];   // H: التفاصيل

    let accrual = 0, payment = 0;

    if (movementKind === CONFIG.MOVEMENT.DEBIT) {
      accrual = amountUsd;
      balance += accrual;
      totalAccrual += accrual;
    } else if (movementKind === CONFIG.MOVEMENT.CREDIT) {
      payment = amountUsd;
      balance -= payment;
      totalPaid += payment;
    }

    rows.push([
      date,
      typeMov,
      project,
      item,
      details,
      accrual,
      payment,
      balance
    ]);
  }

  // ترتيب زمني
  rows.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  // ===== ملخص أعلى الصفحة =====
  sheet.getRange('A9:H9').merge()
    .setValue('الملخص المالي')
    .setBackground(CONFIG.COLORS.HEADER.SUMMARY)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A10:H11').setBackground(CONFIG.COLORS.BG.LIGHT_BLUE);

  sheet.getRange('A10').setValue('إجمالي الاستحقاق:').setFontWeight('bold');
  sheet.getRange('B10:C10').merge()
    .setValue(totalAccrual)
    .setNumberFormat('$#,##0.00');

  sheet.getRange('E10').setValue('إجمالي الدفعات:').setFontWeight('bold');
  sheet.getRange('F10:G10').merge()
    .setValue(totalPaid)
    .setNumberFormat('$#,##0.00');

  sheet.getRange('A11').setValue('الرصيد الحالي:').setFontWeight('bold');
  sheet.getRange('B11:C11').merge()
    .setValue(balance)
    .setNumberFormat('$#,##0.00');

  sheet.getRange('A10:H11').setBorder(
    true, true, true, true, true, true,
    '#1565c0',
    SpreadsheetApp.BorderStyle.SOLID
  );

  // ===== رأس جدول الحركات =====
  const headers = [
    '📅 التاريخ',
    '🔄 طبيعة الحركة',
    '🎬 المشروع',
    '📄 البند',
    '📝 التفاصيل',
    '💰 استحقاق (USD)',
    '💸 دفعة (USD)',
    '📊 الرصيد (USD)'
  ];

  sheet.getRange(13, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // ===== بيانات الحركات =====
  if (rows.length > 0) {
    sheet.getRange(14, 1, rows.length, headers.length).setValues(rows);
    sheet.getRange(14, 1, rows.length, 1).setNumberFormat('yyyy-mm-dd');
    sheet.getRange(14, 6, rows.length, 2).setNumberFormat('$#,##0.00');

    for (let i = 0; i < rows.length; i++) {
      const r  = 14 + i;
      const bg = i % 2 === 0 ? '#ffffff' : '#e3f2fd';
      sheet.getRange(r, 1, 1, headers.length).setBackground(bg);
    }

    sheet.getRange(13, 1, rows.length + 1, headers.length)
      .setBorder(
        true, true, true, true, true, true,
        '#bdbdbd',
        SpreadsheetApp.BorderStyle.SOLID
      );
  }

  sheet.setFrozenRows(13);

  // ===== footer في آخر الصفحة =====
  const footerStart = 14 + rows.length + 5;

  // خط فاصل أعلى التذييل
  sheet.getRange(footerStart, 1, 1, 8).merge()
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD);

  // بيانات الشركة
  sheet.getRange(footerStart + 1, 1, 4, 8).merge()
    .setValue(
      "Seen Film\n" +
      "212 My Office No. 177\n" +
      "info@seenfilm.net\n" +
      "www.seenfilm.net"
    )
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontSize(10)
    .setFontColor(CONFIG.COLORS.TEXT.DARK);

  ui.alert(
    '✅ تم إنشاء كشف الحساب المحدث للمورد بنجاح!\n' +
    '• استخدام هيكل الدفتر الجديد (القيمة بالدولار + نوع الحركة)\n' +
    '• إزالة نص نظام المحاسبة\n' +
    '• إضافة تذييل الشركة\n' +
    '• استخدام حقل التفاصيل الجديد\n' +
    '• ألوان جديدة بالكامل'
  );
}

// ==================== كشف حساب عميل - في شيت (محدث) ====================
function generateClientStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const transSheet   = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const clientsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_CLIENTS);

  if (!transSheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود!');
    return;
  }

  const response = ui.prompt(
    '📄 كشف حساب عميل',
    'اكتب اسم العميل كما هو مسجل:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const clientName = response.getResponseText().trim();
  if (!clientName) { 
    ui.alert('⚠️ لم يتم إدخال الاسم.'); 
    return; 
  }

  // إنشاء أو تفريغ الشيت
  let sheet = ss.getSheetByName(CONFIG.SHEETS.CLIENT_STATEMENT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.CLIENT_STATEMENT);
  sheet.clear();
  sheet.setRightToLeft(true);

  // إعداد الأعمدة
  sheet.setColumnWidths(1, 9, 140);

  // ========== جلب بيانات العميل ==========
  let phone = '', email = '', address = '', notes = '';
  if (clientsSheet) {
    const rows = clientsSheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === clientName) {
        // 0 اسم العميل, 1 نوع العميل, 2 رقم الهاتف, 3 البريد الإلكتروني,
        // 4 المدينة/الدولة, 5 قناة التواصل, 6 الشخص المسئول, 7 ملاحظات
        phone   = rows[i][2] || '';
        email   = rows[i][3] || '';
        address = rows[i][4] || '';
        notes   = rows[i][7] || '';
        break;
      }
    }
  }

  // ========== رأس الصفحة ==========
  sheet.getRange('A1:I2').merge()
    .setValue('📊 كشف حساب عميل\n' + clientName)
    .setBackground(CONFIG.COLORS.HEADER.PROJECTS)      // أخضر داكن
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontSize(16)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // ========== بيانات العميل الأساسية ==========
  sheet.getRange('A4:I8').setBackground(CONFIG.COLORS.BG.LIGHT_GREEN);  // أخضر فاتح

  sheet.getRange('A4').setValue('👤 اسم العميل').setFontWeight('bold').setFontColor(CONFIG.COLORS.TEXT.TEAL);
  sheet.getRange('B4:D4').merge().setValue(clientName);

  sheet.getRange('F4').setValue('📱 الهاتف').setFontWeight('bold').setFontColor(CONFIG.COLORS.TEXT.TEAL);
  sheet.getRange('G4:I4').merge().setValue(phone);

  sheet.getRange('A5').setValue('📧 البريد الإلكتروني').setFontWeight('bold').setFontColor(CONFIG.COLORS.TEXT.TEAL);
  sheet.getRange('B5:D5').merge().setValue(email);

  sheet.getRange('F5').setValue('📍 العنوان').setFontWeight('bold').setFontColor(CONFIG.COLORS.TEXT.TEAL);
  sheet.getRange('G5:I5').merge().setValue(address);

  sheet.getRange('A6').setValue('📝 ملاحظات').setFontWeight('bold').setFontColor(CONFIG.COLORS.TEXT.TEAL);
  sheet.getRange('B6:I6').merge().setValue(notes).setWrap(true);

  sheet.getRange('A4:I6').setBorder(true, true, true, true, true, true, '#004d40', SpreadsheetApp.BorderStyle.SOLID);

  // ========== استرجاع الحركات من الدفتر الجديد ==========
  const data = transSheet.getDataRange().getValues();
  const rows = [];
  let totalDebt = 0;
  let totalPaid = 0;
  let balance = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // اسم العميل/القناة موجود في "اسم المورد/الجهة" = العمود I = index 8
    if (row[8] !== clientName) continue;

    const type          = row[2];              // C: طبيعة الحركة
    const movementKind  = row[13];            // N: نوع الحركة (مدين استحقاق / دائن دفعة)
    const amountUsd     = Number(row[12]) || 0;// M: القيمة بالدولار
    if (!amountUsd) continue;

    const date    = row[1];   // B: التاريخ
    const project = row[5];   // F: اسم المشروع
    const details = row[7];   // H: التفاصيل
    const refNum  = row[15];  // P: رقم مرجعي
    const rowNote = row[23];  // X: ملاحظات

    let debit  = 0;
    let credit = 0;

    if (movementKind === CONFIG.MOVEMENT.DEBIT) {
      debit = amountUsd;
      totalDebt += debit;
      balance += debit;
    } else if (movementKind === CONFIG.MOVEMENT.CREDIT) {
      credit = amountUsd;
      totalPaid += credit;
      balance -= credit;
    }

    rows.push([
      date,
      type,
      project,
      details,
      debit,
      credit,
      balance,
      refNum,
      rowNote
    ]);
  }

  // ========== ملخص مالي ==========
  sheet.getRange('A10:I11').setBackground(CONFIG.COLORS.HEADER.TOTALS).setFontColor(CONFIG.COLORS.TEXT.WHITE);

  sheet.getRange('A10:I10').merge()
    .setValue('💵 الملخص المالي (USD)')
    .setHorizontalAlignment('center')
    .setFontWeight('bold');

  sheet.getRange('A11').setValue('إجمالي الاستحقاق 💰').setFontWeight('bold');
  sheet.getRange('B11:C11').merge().setValue(totalDebt).setNumberFormat('$#,##0.00');

  sheet.getRange('D11').setValue('إجمالي المدفوع 💳').setFontWeight('bold');
  sheet.getRange('E11:F11').merge().setValue(totalPaid).setNumberFormat('$#,##0.00');

  sheet.getRange('G11').setValue('الرصيد الحالي').setFontWeight('bold');
  sheet.getRange('H11:I11').merge().setValue(balance).setNumberFormat('$#,##0.00');

  sheet.getRange('A10:I11').setBorder(true, true, true, true, true, true, '#ffffff', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // ========== جدول الحركات ==========
  const headers = [
    '📅 التاريخ','🔄 نوع الحركة','🎬 المشروع','📝 التفاصيل',
    'مدين (USD) 💰','دائن (USD) 💳','💰 الرصيد (USD)','🔗 مرجع','ملاحظات'
  ];

  sheet.getRange(13,1,1,headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.PROJECTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  if (rows.length > 0) {
    sheet.getRange(14,1,rows.length,headers.length).setValues(rows);
    sheet.getRange(14,1,rows.length,1).setNumberFormat('yyyy-mm-dd');
    sheet.getRange(14,5,rows.length,3).setNumberFormat('$#,##0.00');

    // تلوين صفوف
    for (let i=0;i<rows.length;i++){
      const c = i % 2 === 0 ? '#f1f8e9' : '#ffffff';
      sheet.getRange(14+i,1,1,headers.length).setBackground(c);
    }

    sheet.getRange(13,1,rows.length+1,headers.length)
      .setBorder(true, true, true, true, true, true, '#bdbdbd', SpreadsheetApp.BorderStyle.SOLID);
  }

  sheet.setFrozenRows(13);

  ui.alert('✅ تم إنشاء كشف الحساب الجديد للعميل بناءً على هيكل الدفتر المحدث!');
}

// ==================== كشف حساب ممول - في شيت (محدث) ====================
function generateFunderStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const transSheet   = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const fundersSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_FUNDERS);
  if (!transSheet) { 
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود.'); 
    return; 
  }

  const response = ui.prompt(
    '📄 كشف حساب ممول في شيت',
    'اكتب اسم الممول كما هو مسجل:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const funderName = response.getResponseText().trim();
  if (!funderName) { 
    ui.alert('⚠️ لم يتم إدخال الاسم.'); 
    return; 
  }

  let sheet = ss.getSheetByName(CONFIG.SHEETS.FUNDER_STATEMENT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.FUNDER_STATEMENT);
  sheet.clear();
  sheet.setRightToLeft(true); // عرض من اليمين لليسار

  // تحديد عرض الأعمدة
  sheet.setColumnWidth(1, 100);  // التاريخ
  sheet.setColumnWidth(2, 130);  // طبيعة الحركة
  sheet.setColumnWidth(3, 150);  // المشروع
  sheet.setColumnWidth(4, 200);  // الوصف
  sheet.setColumnWidth(5, 120);  // تمويل
  sheet.setColumnWidth(6, 120);  // سداد
  sheet.setColumnWidth(7, 130);  // الرصيد
  sheet.setColumnWidth(8, 150);  // ملاحظات

  // ===== بيانات الممول من قاعدة البيانات =====
  let type = '', phone = '', email = '', percent = '', duration = '', conditions = '', notes = '';
  if (fundersSheet) {
    const fData = fundersSheet.getDataRange().getValues();
    for (let i = 1; i < fData.length; i++) {
      if (fData[i][0] === funderName) {
        type       = fData[i][1] || '';
        phone      = fData[i][2] || '';
        email      = fData[i][3] || '';
        percent    = fData[i][4] || '';
        duration   = fData[i][5] || '';
        conditions = fData[i][6] || '';
        notes      = fData[i][7] || '';
        break;
      }
    }
  }

  // ===== العنوان الرئيسي المميز =====
  sheet.getRange('A1:H2').merge();
  sheet.getRange('A1')
    .setValue('📊 كشف حساب الممول\n' + funderName)
    .setBackground(CONFIG.COLORS.HEADER.FUNDER)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(16)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, '#ffffff', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // ===== قسم البيانات الأساسية =====
  sheet.getRange('A4:H8').setBackground(CONFIG.COLORS.BG.LIGHT_BLUE);
  
  sheet.getRange('A4').setValue('👤 اسم الممول').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('B4:C4').merge().setValue(funderName).setFontWeight('bold').setFontSize(11);
  
  sheet.getRange('E4').setValue('🏢 نوع الممول').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('F4:H4').merge().setValue(type).setFontWeight('bold').setFontSize(11);

  sheet.getRange('A5').setValue('📱 الهاتف').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('B5:C5').merge().setValue(phone);
  
  sheet.getRange('E5').setValue('📧 البريد الإلكتروني').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('F5:H5').merge().setValue(email);

  sheet.getRange('A6').setValue('💰 نسبة الأرباح').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('B6:C6').merge().setValue(percent);
  
  sheet.getRange('E6').setValue('📅 مدة السداد').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('F6:H6').merge().setValue(duration ? duration + ' شهور' : '');

  sheet.getRange('A7').setValue('📝 شروط وملاحظات').setFontWeight('bold').setFontColor(CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('B7:H7').merge().setValue(conditions || notes).setWrap(true);

  sheet.getRange('A4:H7').setBorder(true, true, true, true, true, true, '#1976d2', SpreadsheetApp.BorderStyle.SOLID);

  // ===== الحركات (تمويل + سداد تمويل) من الدفتر الجديد =====
  const data = transSheet.getDataRange().getValues();
  const rows = [];
  let totalFund = 0, totalRepay = 0, balance = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // اسم الممول الآن في عمود I = index 8
    if (row[8] !== funderName) continue;

    const typeMov      = row[2];              // C: طبيعة الحركة
    const movementKind = row[13];            // N: نوع الحركة
    const amountUsd    = Number(row[12]) || 0;// M: القيمة بالدولار
    if (!amountUsd) continue;

    // نقصر التقرير على نوعي الحركة الخاصين بالتمويل
    if (typeMov !== '🏦 تمويل' && typeMov !== '💳 سداد تمويل') continue;

    const date    = row[1];   // B
    const project = row[5];   // F
    const desc    = row[7];   // H
    const rowNote = row[23];  // X: ملاحظات

    let fund = 0, repay = 0;

    if (typeMov === '🏦 تمويل') {
      // تمويل = فلوس داخلة
      fund = amountUsd;
      balance += fund;
      totalFund += fund;
    } else if (typeMov === '💳 سداد تمويل') {
      // سداد = فلوس خارجة
      repay = amountUsd;
      balance -= repay;
      totalRepay += repay;
    }

    rows.push([
      date, 
      typeMov, 
      project, 
      desc,
      fund, 
      repay, 
      balance, 
      rowNote
    ]);
  }

  if (!rows.length) {
    ui.alert('⚠️ لا توجد حركات لهذا الممول في الدفتر.');
    return;
  }

  rows.sort((a,b) => new Date(a[0]) - new Date(b[0]));

  // ===== قسم الملخص المالي =====
  sheet.getRange('A10:H11').setBackground(CONFIG.COLORS.HEADER.TOTALS);
  
  sheet.getRange('A10:H10').merge()
    .setValue('💎 الملخص المالي (USD)')
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(12)
    .setHorizontalAlignment('center');

  sheet.getRange('A11').setValue('📥 إجمالي التمويل').setFontColor(CONFIG.COLORS.TEXT.WHITE).setFontWeight('bold');
  sheet.getRange('B11:C11').merge().setValue(totalFund).setNumberFormat('$#,##0.00')
    .setFontColor(CONFIG.COLORS.TEXT.WHITE).setFontWeight('bold').setHorizontalAlignment('center');

  sheet.getRange('D11').setValue('📤 إجمالي السداد').setFontColor(CONFIG.COLORS.TEXT.WHITE).setFontWeight('bold');
  sheet.getRange('E11').merge().setValue(totalRepay).setNumberFormat('$#,##0.00')
    .setFontColor(CONFIG.COLORS.TEXT.WHITE).setFontWeight('bold').setHorizontalAlignment('center');

  const balColor = balance >= 0 ? '#ffeb3b' : '#ff5252';
  sheet.getRange('F11').setValue('💵 الرصيد الحالي').setFontColor(CONFIG.COLORS.TEXT.WHITE).setFontWeight('bold');
  sheet.getRange('G11:H11').merge().setValue(balance).setNumberFormat('$#,##0.00')
    .setFontColor(balColor).setFontWeight('bold').setFontSize(12).setHorizontalAlignment('center');

  sheet.getRange('A10:H11').setBorder(true, true, true, true, false, false, '#ffffff', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // ===== رأس جدول الحركات =====
  const headersF = [
    '📅 التاريخ','🔄 طبيعة الحركة','🎬 المشروع','📄 الوصف',
    '➕ تمويل (USD)','➖ سداد (USD)','💰 الرصيد (USD)','📝 ملاحظات'
  ];
  
  sheet.getRange(13,1,1,headersF.length)
    .setValues([headersF])
    .setBackground(CONFIG.COLORS.HEADER.DETAILS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, '#ffffff', SpreadsheetApp.BorderStyle.SOLID);

  // ===== صفوف البيانات =====
  sheet.getRange(14,1,rows.length,headersF.length).setValues(rows);
  sheet.getRange(14,1,rows.length,1).setNumberFormat('yyyy-mm-dd');
  sheet.getRange(14,5,rows.length,3).setNumberFormat('$#,##0.00');

  for (let i = 0; i < rows.length; i++) {
    const rowNum = 14 + i;
    const bgColor = i % 2 === 0 ? '#f5f5f5' : '#ffffff';
    sheet.getRange(rowNum, 1, 1, headersF.length).setBackground(bgColor);
    
    if (rows[i][4] > 0) {
      sheet.getRange(rowNum, 5).setFontColor(CONFIG.COLORS.TEXT.SUCCESS).setFontWeight('bold');
    }
    if (rows[i][5] > 0) {
      sheet.getRange(rowNum, 6).setFontColor(CONFIG.COLORS.TEXT.DANGER).setFontWeight('bold');
    }
    
    const balVal = rows[i][6];
    sheet.getRange(rowNum, 7).setFontColor(balVal >= 0 ? '#1b5e20' : '#b71c1c').setFontWeight('bold');
  }

  sheet.getRange(13, 1, rows.length + 1, headersF.length)
    .setBorder(true, true, true, true, true, true, '#bdbdbd', SpreadsheetApp.BorderStyle.SOLID);

  sheet.setFrozenRows(13);

  sheet.getRange(14, 1, rows.length, 1).setHorizontalAlignment('center');
  sheet.getRange(14, 2, rows.length, 1).setHorizontalAlignment('right');
  sheet.getRange(14, 5, rows.length, 3).setHorizontalAlignment('center');

  ui.alert('✅ تم إنشاء كشف الحساب المنسق للممول بناءً على هيكل الدفتر الجديد (بالدولار)!');
}
// ==================== إعادة بناء تقرير المشروع التفصيلي ====================

function rebuildProjectDetailReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet  = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const reportSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECT_REPORT);
  
  if (!transSheet || !reportSheet) return;
  
  const data = transSheet.getDataRange().getValues();
  const map = {}; // key = projectCode|projectName|item|vendor
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    const projectCode = String(row[4] || '').trim();  // E: كود المشروع
    const projectName = String(row[5] || '').trim();  // F: اسم المشروع
    const item        = String(row[6] || '').trim();  // G: البند
    const vendor      = String(row[8] || '').trim();  // I: المورد / الجهة
    const type        = String(row[2] || '').trim();  // C: طبيعة الحركة
    const amountUsd   = Number(row[12]) || 0;         // M: القيمة بالدولار الموحد
    
    // لازم يكون في مشروع + جهة + نوع حركة + قيمة
    if (!projectCode || !vendor || !type || !amountUsd) continue;
    
    const key = [projectCode, projectName, item, vendor].join('||');
    
    if (!map[key]) {
      map[key] = {
        projectCode,
        projectName,
        item,
        vendor,
        totalDue: 0,     // إجمالي المستحق (مصروف + إيراد) بالدولار
        totalPaid: 0,    // المدفوع / المحصل بالدولار
        payments: 0      // عدد الدفعات / التحصيلات
      };
    }
    
    // 🔹 أي "استحقاق" (مصروف أو إيراد) يروح في إجمالي المستحق
    if (type === '💰 استحقاق مصروف' || type === '📈 استحقاق إيراد') {
      map[key].totalDue += amountUsd;
    }
    
    // 🔹 أي "دفعة" أو "تحصيل" يروح في المدفوع
    if (type === '💸 دفعة مصروف' || type === '✅ تحصيل إيراد') {
      map[key].totalPaid += amountUsd;
      if (amountUsd > 0) map[key].payments++;
    }
  }
  
  const rows = [];
  Object.keys(map).forEach(k => {
    const v = map[k];
    const remaining = v.totalDue - v.totalPaid;
    
    let status = 'لا يوجد استحقاق';
    if (v.totalDue > 0) {
      if (remaining === 0) {
        status = 'مسدد بالكامل';
      } else if (remaining > 0 && v.totalPaid > 0) {
        status = 'مسدد جزئياً';
      } else if (remaining > 0 && v.totalPaid === 0) {
        status = 'معلق';
      }
    }
    
    rows.push([
      v.projectCode,   // كود المشروع
      v.projectName,   // اسم المشروع
      v.item,          // البند
      v.vendor,        // الجهة (مورد / عميل / ممول)
      v.totalDue,      // إجمالي المستحق (USD)
      v.totalPaid,     // المدفوع / المحصل (USD)
      remaining,       // المتبقي (USD)
      v.payments,      // عدد الدفعات / التحصيلات
      status           // حالة السداد (محسوبة)
    ]);
  });
  
  // مسح التقرير القديم
  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2, 1, reportSheet.getMaxRows() - 1, lastCol).clearContent();
  }
  
  // كتابة التقرير الجديد
  if (rows.length) {
    rows.sort((a, b) => a[0].localeCompare(b[0]));
    reportSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    // المستحق + المدفوع + المتبقي
    reportSheet.getRange(2, 5, rows.length, 3).setNumberFormat('$#,##0.00');
  }
}

// ==================== إعادة بناء تقرير الموردين الملخص ====================

function rebuildVendorSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet   = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const reportSheet  = ss.getSheetByName(CONFIG.SHEETS.VENDORS_REPORT);
  const vendorsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_VENDORS);
  
  if (!transSheet || !reportSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية" و "تقرير الموردين".');
    return;
  }
  
  // خريطة تخصص المورد من قاعدة بيانات الموردين
  const specialMap = {};
  if (vendorsSheet) {
    const vData = vendorsSheet.getDataRange().getValues();
    for (let i = 1; i < vData.length; i++) {
      const name = vData[i][0];
      const spec = vData[i][1];
      if (name) specialMap[name] = spec;
    }
  }
  
  const data = transSheet.getDataRange().getValues();
  const map = {};
  
  for (let i = 1; i < data.length; i++) {
    const row    = data[i];
    const vendor = row[8];               // I: اسم المورد/الجهة
    const type   = row[2];               // C: طبيعة الحركة
    const amountUsd = Number(row[12]) || 0; // M: القيمة بالدولار
    const project = row[4];              // E: كود المشروع
    const date    = row[1];              // B: التاريخ
    
    if (!vendor || !amountUsd) continue;
    if (type !== '💰 استحقاق مصروف' && type !== '💸 دفعة مصروف') continue;
    
    if (!map[vendor]) {
      map[vendor] = {
        vendor,
        specialization: specialMap[vendor] || '',
        projects: new Set(),
        totalAccrualUsd: 0,
        totalPaidUsd: 0,
        payments: 0,
        lastDate: null
      };
    }
    
    const v = map[vendor];
    if (project) v.projects.add(project);
    
    if (type === '💰 استحقاق مصروف') {
      v.totalAccrualUsd += amountUsd;
    } else if (type === '💸 دفعة مصروف') {
      v.totalPaidUsd += amountUsd;
      if (amountUsd > 0) v.payments++;
    }
    
    if (date) {
      const d = new Date(date);
      if (!v.lastDate || d > v.lastDate) {
        v.lastDate = d;
      }
    }
  }
  
  const rows = [];
  Object.keys(map).forEach(k => {
    const v = map[k];
    const projectsCount   = v.projects.size;
    const currentBalance  = v.totalAccrualUsd - v.totalPaidUsd;
    
    let status = 'مغلق';
    if (currentBalance > 0) status = 'له رصيد مستحق';
    else if (currentBalance < 0) status = 'صرف زائد';
    
    rows.push([
      v.vendor,
      v.specialization,
      projectsCount,
      v.totalAccrualUsd,
      v.totalPaidUsd,
      currentBalance,
      v.payments,
      v.lastDate ? Utilities.formatDate(v.lastDate, Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
      status
    ]);
  });
  
  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2,1,reportSheet.getMaxRows()-1,lastCol).clearContent();
  }
  
  if (rows.length) {
    rows.sort((a,b) => a[0].localeCompare(b[0]));
    reportSheet.getRange(2,1,rows.length,rows[0].length).setValues(rows);
    reportSheet.getRange(2,4,rows.length,3).setNumberFormat('$#,##0.00');
  }
  
  SpreadsheetApp.getUi().alert('✅ تم تحديث "تقرير الموردين" (بالدولار).');
}

// ==================== إعادة بناء تقرير المصروفات ====================

function rebuildExpenseSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet  = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const reportSheet = ss.getSheetByName(CONFIG.SHEETS.EXPENSES_REPORT);
  if (!transSheet || !reportSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية" و "تقرير المصروفات".');
    return;
  }
  
  const data = transSheet.getDataRange().getValues();
  const map = {};
  
  for (let i = 1; i < data.length; i++) {
    const row  = data[i];
    const type = row[2];           // C: طبيعة الحركة
    const classification = row[3]; // D: تصنيف الحركة
    const item = row[6];           // G: البند
    const amountUsd = Number(row[12]) || 0; // M: القيمة بالدولار
    
    if (!item || !amountUsd) continue;
    if (type !== '💰 استحقاق مصروف' && type !== '💸 دفعة مصروف') continue;
    
    const key = item + '||' + classification;
    if (!map[key]) {
      map[key] = { 
        item, 
        classification, 
        totalAccrual: 0, 
        totalPaid: 0, 
        accrualCount: 0, 
        paymentCount: 0 
      };
    }
    const v = map[key];
    
    if (type === '💰 استحقاق مصروف') {
      v.totalAccrual += amountUsd;
      v.accrualCount++;
    } else if (type === '💸 دفعة مصروف') {
      v.totalPaid += amountUsd;
      v.paymentCount++;
    }
  }
  
  const rows = [];
  Object.keys(map).forEach(k => {
    const v = map[k];
    const remaining = v.totalAccrual - v.totalPaid;
    const percent   = v.totalAccrual ? v.totalPaid / v.totalAccrual : 0;
    rows.push([
      v.item,
      v.classification,
      v.totalAccrual,
      v.totalPaid,
      remaining,
      v.accrualCount,
      v.paymentCount,
      v.totalAccrual ? percent : ''
    ]);
  });
  
  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2,1,reportSheet.getMaxRows()-1,lastCol).clearContent();
  }
  
  if (rows.length) {
    rows.sort((a,b) => a[0].localeCompare(b[0]));
    reportSheet.getRange(2,1,rows.length,rows[0].length).setValues(rows);
    reportSheet.getRange(2,3,rows.length,3).setNumberFormat('$#,##0.00');
    reportSheet.getRange(2,8,rows.length,1).setNumberFormat('0.0%');
  }
  
  SpreadsheetApp.getUi().alert('✅ تم تحديث "تقرير المصروفات" (بالدولار).');
}

// ==================== إعادة بناء تقرير الإيرادات ====================

function rebuildRevenueSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet   = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const reportSheet  = ss.getSheetByName(CONFIG.SHEETS.REVENUE_REPORT);
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  
  if (!transSheet || !reportSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية" و "تقرير الإيرادات".');
    return;
  }
  
  // اسم المشروع والقناة من قاعدة المشاريع
  const projectMap = {};
  if (projectsSheet) {
    const pData = projectsSheet.getDataRange().getValues();
    for (let i = 1; i < pData.length; i++) {
      const code = pData[i][0];
      if (code) {
        projectMap[code] = {
          name:    pData[i][1],
          channel: pData[i][3]
        };
      }
    }
  }
  
  const data = transSheet.getDataRange().getValues();
  const map = {}; // key = projectCode
  
  for (let i = 1; i < data.length; i++) {
    const row  = data[i];
    const type = row[2];       // C: طبيعة الحركة
    if (type !== '📈 استحقاق إيراد' && type !== '✅ تحصيل إيراد') continue;
    
    const projectCode = row[4];              // E: كود المشروع
    const amountUsd   = Number(row[12]) || 0;// M: القيمة بالدولار
    if (!projectCode || !amountUsd) continue;
    
    if (!map[projectCode]) {
      const info = projectMap[projectCode] || {};
      map[projectCode] = {
        projectCode,
        projectName: info.name    || '',
        channel:     info.channel || row[8] || '', // I: اسم العميل/القناة لو مش موجود في المشاريع
        expected: 0,
        received: 0,
        lastDate: null
      };
    }
    
    const v = map[projectCode];
    if (type === '📈 استحقاق إيراد') {
      v.expected += amountUsd;
    }
    if (type === '✅ تحصيل إيراد') {
      v.received += amountUsd;
      const date = row[1];
      if (date) {
        const d = new Date(date);
        if (!v.lastDate || d > v.lastDate) v.lastDate = d;
      }
    }
  }
  
  const rows = [];
  Object.keys(map).forEach(k => {
    const v = map[k];
    const remaining = v.expected - v.received;
    let status = 'لا يوجد بيانات';
    if (v.expected === 0 && v.received > 0) status = 'مقبوض بدون استحقاق';
    else if (v.expected > 0 && remaining === 0) status = 'مقبوض بالكامل';
    else if (v.expected > 0 && remaining > 0 && v.received > 0) status = 'مقبوض جزئياً';
    else if (v.expected > 0 && v.received === 0) status = 'لم يُقبض بعد';
    
    rows.push([
      v.projectName || v.projectCode,
      v.channel,
      'إيرادات عقد',
      v.expected,
      v.received,
      remaining,
      v.lastDate ? Utilities.formatDate(v.lastDate, Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
      status
    ]);
  });
  
  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2,1,reportSheet.getMaxRows()-1,lastCol).clearContent();
  }
  
  if (rows.length) {
    rows.sort((a,b) => a[0].localeCompare(b[0]));
    reportSheet.getRange(2,1,rows.length,rows[0].length).setValues(rows);
    reportSheet.getRange(2,4,rows.length,3).setNumberFormat('$#,##0.00');
  }
  
  SpreadsheetApp.getUi().alert('✅ تم تحديث "تقرير الإيرادات" (بالدولار).');
}

// ==================== إعادة بناء التدفقات النقدية ====================

function rebuildCashFlowReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet  = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const reportSheet = ss.getSheetByName(CONFIG.SHEETS.CASHFLOW);
  if (!transSheet || !reportSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية" و "التدفقات النقدية".');
    return;
  }
  
  const data = transSheet.getDataRange().getValues();
  const map = {}; // key = YYYY-MM
  
  for (let i = 1; i < data.length; i++) {
    const row  = data[i];
    const date = row[1];
    if (!date) continue;
    
    const type      = row[2];               // C: طبيعة الحركة
    const amountUsd = Number(row[12]) || 0; // M: القيمة بالدولار
    if (!amountUsd) continue;
    
    const monthKey = Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM');
    if (!map[monthKey]) {
      map[monthKey] = { monthKey, accruals: 0, payments: 0, revenues: 0 };
    }
    
    if (type === '💰 استحقاق مصروف') {
      map[monthKey].accruals += amountUsd;
    } else if (type === '💸 دفعة مصروف') {
      map[monthKey].payments += amountUsd;
    } else if (type === '✅ تحصيل إيراد') {
      map[monthKey].revenues += amountUsd;
    }
  }
  
  const months = Object.keys(map).sort();
  const rows = [];
  let cumulative = 0;
  months.forEach(m => {
    const v   = map[m];
    const net = v.revenues - v.payments;
    cumulative += net;
    rows.push([
      m,
      v.accruals,
      v.payments,
      v.revenues,
      net,
      cumulative
    ]);
  });
  
  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2,1,reportSheet.getMaxRows()-1,lastCol).clearContent();
  }
  
  if (rows.length) {
    reportSheet.getRange(2,1,rows.length,rows[0].length).setValues(rows);
    reportSheet.getRange(2,2,rows.length,5).setNumberFormat('$#,##0.00');
  }
  
  SpreadsheetApp.getUi().alert('✅ تم تحديث "التدفقات النقدية" (بالدولار).');
}

function rebuildAllSummaryReports() {
  rebuildProjectDetailReport();
  rebuildVendorSummaryReport();
  rebuildExpenseSummaryReport();
  rebuildRevenueSummaryReport();
  rebuildCashFlowReport();
  
  SpreadsheetApp.getUi().alert('✅ تم تحديث كل التقارير الملخصة.');
}

// ==================== إنشاء شيتات التقارير (بدون تغيير كبير) ====================

function createProjectReportSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.PROJECT_REPORT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.PROJECT_REPORT);
  sheet.clear();
  
  const headers = [
    'كود المشروع', 'اسم المشروع', 'البند', 'المورد',
    'إجمالي المستحق', 'المدفوع', 'المتبقي', 'عدد الدفعات', 'حالة السداد (يدوي)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.REPORTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [120, 180, 150, 150, 130, 130, 130, 100, 130];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  sheet.setFrozenRows(1);
  sheet.getRange('A1').setNote(
    'هذا تقرير تفصيلي يمكن ملؤه عبر Pivot Table أو عبر نسخ بيانات من دفتر الحركات.'
  );
}

function createVendorReportSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.VENDORS_REPORT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.VENDORS_REPORT);
  sheet.clear();
  
  const headers = [
    'اسم المورد', 'التخصص', 'عدد المشاريع', 'إجمالي المستحقات',
    'إجمالي المدفوع', 'الرصيد الحالي', 'عدد الدفعات', 'آخر تعامل', 'الحالة (يدوي)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.VENDORS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [180, 120, 100, 140, 140, 130, 100, 120, 120];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  sheet.setFrozenRows(1);
  sheet.getRange('A1').setNote(
    'يمكنك إنشاء Pivot Table من "دفتر الحركات المالية" لتعبئة هذا التقرير تلقائياً.'
  );
}

// ========= تقرير المصروفات (يتغذى مباشرة من دفتر الحركات) =========
/**
 * ⚡ تحسينات الأداء:
 * - Batch Operations: 7 API calls بدلاً من 693 (99×7)
 * - نطاقات محددة بدل أعمدة كاملة (G2:G1000 بدل G:G)
 */
function createExpenseReportSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.EXPENSES_REPORT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.EXPENSES_REPORT);
  sheet.clear();

  const headers = [
    'البند', 'التصنيف', 'إجمالي المستحق', 'المدفوع فعلياً', 'المتبقي',
    'عدد الاستحقاقات', 'عدد الدفعات', 'النسبة % من إجمالي المستحقات'
  ];

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.ITEMS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);

  const widths = [180, 150, 150, 150, 130, 120, 120, 180];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));

  sheet.setFrozenRows(1);

  // قائمة البنود من دفتر الحركات (UNIQUE)
  sheet.getRange('A2').setFormula(
    `=UNIQUE(FILTER('دفتر الحركات المالية'!G2:G1000,'دفتر الحركات المالية'!G2:G1000<>""))`
  );

  // ⚡ Batch Operations - بناء كل المعادلات مرة واحدة
  const numRows = 99;
  const formulas = {
    B: [],  // التصنيف
    C: [],  // إجمالي المستحق
    D: [],  // المدفوع
    E: [],  // المتبقي
    F: [],  // عدد الاستحقاقات
    G: [],  // عدد الدفعات
    H: []   // النسبة
  };

  for (let row = 2; row <= 100; row++) {
    // التصنيف - نطاق محدد بدل عمود كامل
    formulas.B.push([
      `=IF(A${row}="","",IFERROR(INDEX('دفتر الحركات المالية'!D2:D1000,MATCH(A${row},'دفتر الحركات المالية'!G2:G1000,0)),""))`
    ]);

    // إجمالي المستحق (استحقاق مصروف) - نطاقات محددة
    formulas.C.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!J2:J1000,'دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💰 استحقاق مصروف"))`
    ]);

    // المدفوع (دفعة مصروف) - نطاقات محددة
    formulas.D.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💸 دفعة مصروف"))`
    ]);

    // المتبقي
    formulas.E.push([`=IF(A${row}="","",C${row}-D${row})`]);

    // عدد الاستحقاقات - نطاقات محددة
    formulas.F.push([
      `=IF(A${row}="","",COUNTIFS('دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💰 استحقاق مصروف"))`
    ]);

    // عدد الدفعات - نطاقات محددة
    formulas.G.push([
      `=IF(A${row}="","",COUNTIFS('دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💸 دفعة مصروف"))`
    ]);

    // النسبة من إجمالي المستحقات
    formulas.H.push([
      `=IF(A${row}="","",IF(SUM($C$2:$C$100)=0,"",C${row}/SUM($C$2:$C$100)))`
    ]);
  }

  // ⚡ تطبيق كل المعادلات دفعة واحدة (7 API calls بدلاً من 693)
  sheet.getRange(2, 2, numRows, 1).setFormulas(formulas.B);
  sheet.getRange(2, 3, numRows, 1).setFormulas(formulas.C);
  sheet.getRange(2, 4, numRows, 1).setFormulas(formulas.D);
  sheet.getRange(2, 5, numRows, 1).setFormulas(formulas.E);
  sheet.getRange(2, 6, numRows, 1).setFormulas(formulas.F);
  sheet.getRange(2, 7, numRows, 1).setFormulas(formulas.G);
  sheet.getRange(2, 8, numRows, 1).setFormulas(formulas.H);

  sheet.getRange(2, 3, numRows, 3).setNumberFormat('$#,##0.00');
  sheet.getRange(2, 8, numRows, 1).setNumberFormat('0.0%');
}

// ========= تقرير الإيرادات (قالب) =========

function createRevenueReportSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.REVENUE_REPORT);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.REVENUE_REPORT);
  sheet.clear();
  
  const headers = [
    'المشروع', 'القناة/الجهة', 'نوع الإيراد', 'المبلغ المستحق',
    'المستلم فعلياً', 'المتبقي', 'تاريخ الاستلام', 'الحالة (يدوي)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.REVENUE)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);
  
  const widths = [180, 150, 130, 140, 140, 130, 130, 120];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  sheet.setFrozenRows(1);
  sheet.getRange('A1').setNote(
    'يمكنك عمل Pivot Table من دفتر الحركات (طبيعة الحركة = 📈 استحقاق إيراد / ✅ تحصيل إيراد) لملء هذا التقرير.'
  );
}

// ========= التدفقات النقدية (تلقائي مع ترتيب الأعمدة الجديد) =========
/**
 * ⚡ تحسينات الأداء:
 * - Batch Operations: 5 API calls بدلاً من 495 (99×5)
 * - نطاقات محددة بدل أعمدة كاملة (T2:T1000 بدل T:T)
 */
function createCashFlowSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.CASHFLOW);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.CASHFLOW);
  sheet.clear();

  const headers = [
    'الشهر (YYYY-MM)',                // A
    'إجمالي الاستحقاقات (مصروفات)',  // B
    'إجمالي الدفعات (مصروفات)',      // C
    'إجمالي الإيرادات المحصلة',      // D
    'صافي التدفق النقدي',            // E
    'التدفق التراكمي'                 // F
  ];

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.CASHFLOW)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(11);

  const widths = [130, 160, 180, 170, 170, 170];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));

  sheet.setFrozenRows(1);

  // 🔹 قائمة الشهور من عمود "الشهر" الجديد = W (العمود 23)
  sheet.getRange('A2').setFormula(
    `=SORT(UNIQUE(FILTER('دفتر الحركات المالية'!W2:W1000,'دفتر الحركات المالية'!W2:W1000<>"")))`
  );

  // ⚡ Batch Operations - بناء كل المعادلات مرة واحدة
  const numRows = 99;
  const formulas = {
    B: [],  // إجمالي الاستحقاقات
    C: [],  // إجمالي الدفعات
    D: [],  // إجمالي الإيرادات
    E: [],  // صافي التدفق
    F: []   // التدفق التراكمي
  };

  for (let row = 2; row <= 100; row++) {
    // 🔹 إجمالي الاستحقاقات (مصروفات) في الشهر - نطاقات محددة
    formulas.B.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!J2:J1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💰 استحقاق مصروف"))`
    ]);

    // 🔹 إجمالي الدفعات (مصروفات) - نطاقات محددة
    formulas.C.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"💸 دفعة مصروف"))`
    ]);

    // 🔹 إجمالي الإيرادات المحصلة - نطاقات محددة
    formulas.D.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"✅ تحصيل إيراد"))`
    ]);

    // 🔹 صافي التدفق = إيرادات - دفعات
    formulas.E.push([`=IF(A${row}="","",D${row}-C${row})`]);

    // 🔹 التدفق التراكمي
    formulas.F.push([`=IF(A${row}="","",SUM($E$2:E${row}))`]);
  }

  // ⚡ تطبيق كل المعادلات دفعة واحدة (5 API calls بدلاً من 495)
  sheet.getRange(2, 2, numRows, 1).setFormulas(formulas.B);
  sheet.getRange(2, 3, numRows, 1).setFormulas(formulas.C);
  sheet.getRange(2, 4, numRows, 1).setFormulas(formulas.D);
  sheet.getRange(2, 5, numRows, 1).setFormulas(formulas.E);
  sheet.getRange(2, 6, numRows, 1).setFormulas(formulas.F);

  sheet.getRange(2, 2, numRows, 5).setNumberFormat('$#,##0.00');
}

// ========= لوحة التحكم =========

function createDashboardSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.DASHBOARD);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEETS.DASHBOARD);
  sheet.clear();
  
  // إعداد الأعمدة
  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 260);
  
  // العنوان الرئيسي
  sheet.getRange('A1:C1').merge();
  sheet.getRange('A1')
    .setValue('📊 لوحة التحكم')
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(16)
    .setHorizontalAlignment('center');
  
  const metrics = [
    ['', '', ''],                                  // 3
    ['💰 المؤشرات المالية', '', ''],              // 4
    // إجمالي الاستحقاقات (مصروفات) من J2:J1000
    ['إجمالي الاستحقاقات (مصروفات)',
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"💰 استحقاق مصروف")',
      'USD'
    ],                                            // 5
    // إجمالي المدفوع (مصروفات) من K2:K1000
    ['إجمالي المدفوع (مصروفات)',
      '=SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"💸 دفعة مصروف")',
      'USD'
    ],                                            // 6
    ['🆕 المصروفات المباشرة',
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!D2:D1000,"مصروفات مباشرة")',
      'USD'
    ],                                            // 7
    ['🆕 المصروفات العمومية',
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!D2:D1000,"مصروفات عمومية")',
      'USD'
    ],                                            // 8
    // رصيد تقديري للموردين = استحقاقات مصروف - دفعات مصروف
    ['الرصيد الحالي (تقديري للموردين)',
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"💰 استحقاق مصروف")' +
      '-SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"💸 دفعة مصروف")',
      'USD'
    ],                                            // 9
    ['إجمالي الإيرادات المحصلة',
      '=SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"✅ تحصيل إيراد")',
      'USD'
    ],                                            // 10
    ['', '', ''],                                 // 11
    ['📈 إحصائيات', '', ''],                     // 12
    ['عدد المشاريع النشطة',
      '=COUNTIF(\'قاعدة بيانات المشاريع\'!O2:O200,"جاري التنفيذ")',
      'مشروع'
    ],                                            // 13
    ['عدد الموردين',
      '=COUNTA(\'قاعدة بيانات الموردين\'!A2:A500)-1',
      'مورد'
    ],                                            // 14
    ['عدد الاستحقاقات المعلقة',
      '=COUNTIF(\'دفتر الحركات المالية\'!V2:V1000,"معلق")',
      'استحقاق'
    ],                                            // 15
    ['عدد الدفعات هذا الشهر',
      '=COUNTIFS(\'دفتر الحركات المالية\'!C2:C1000,"💸 دفعة مصروف",\'دفتر الحركات المالية\'!W2:W1000,TEXT(TODAY(),"YYYY-MM"))',
      'دفعة'
    ],                                            // 16
    ['', '', ''],                                 // 17
    ['💵 السيولة المتاحة (بنك + خزنة)', '', ''], // 18
    // أرصدة البنك والخزنة (الرصيد في العمود G)
    ['رصيد حساب البنك - دولار',
      '=IFERROR(LOOKUP(2,1/(\'حساب البنك - دولار\'!A2:A500<>""),\'حساب البنك - دولار\'!G2:G500),0)',
      'USD'
    ],                                            // 19
    ['رصيد حساب البنك - ليرة',
      '=IFERROR(LOOKUP(2,1/(\'حساب البنك - ليرة\'!A2:A500<>""),\'حساب البنك - ليرة\'!G2:G500),0)',
      'TRY'
    ],                                            // 20
    ['رصيد خزنة العهدة - دولار',
      '=IFERROR(LOOKUP(2,1/(\'خزنة العهدة - دولار\'!A2:A500<>""),\'خزنة العهدة - دولار\'!G2:G500),0)',
      'USD'
    ],                                            // 21
    ['رصيد خزنة العهدة - ليرة',
      '=IFERROR(LOOKUP(2,1/(\'خزنة العهدة - ليرة\'!A2:A500<>""),\'خزنة العهدة - ليرة\'!G2:G500),0)',
      'TRY'
    ],                                            // 22
    ['', '', ''],                                 // 23
    ['💱 سعر تحويل الليرة إلى دولار (أدخل يدويًا)', '', ''], // 24
    ['سعر الصرف (TRY → USD)', 
      1,
      'ضع هنا سعر السوق الحالي'
    ],                                            // 25 (الخانة B25 = سعر الصرف)
    ['إجمالي السيولة المحسوبة بالدولار', 
      '=B19 + B21 + (B20 / B25) + (B22 / B25)',
      'USD (تقريبي)'
    ],                                            // 26
    ['', '', ''],                                 // 27
    ['📌 الديون (قروض + ذمم)', '', ''],          // 28
    // إجمالي القروض (تمويل الممولين) من نوع الحركة 🏦 تمويل
    ['إجمالي القروض المستلمة من الممولين',
      '=IFERROR(SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"🏦 تمويل"),0)',
      'USD'
    ],                                            // 29
    // إجمالي سداد القروض من نوع الحركة 💳 سداد تمويل
    ['إجمالي سداد القروض',
      '=IFERROR(SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"💳 سداد تمويل"),0)',
      'USD'
    ],                                            // 30
    ['الرصيد القائم للقروض', 
      '=B29-B30',
      'USD'
    ],                                            // 31
    // ذمم مدينة على العملاء = مجموع "المتبقي" في تقرير الإيرادات (عمود F)
    ['إجمالي الذمم المدينة على العملاء (إيرادات لم تُحصَّل)', 
      '=IFERROR(SUM(FILTER(\'تقرير الإيرادات\'!F2:F200,\'تقرير الإيرادات\'!F2:F200>0)),0)',
      'USD'
    ],                                            // 32
    // ذمم دائنة لصالح الموردين = مجموع "الرصيد الحالي" الموجب في تقرير الموردين (عمود F)
    ['إجمالي الذمم الدائنة لصالح الموردين', 
      '=IFERROR(SUM(FILTER(\'تقرير الموردين\'!F2:F500,\'تقرير الموردين\'!F2:F500>0)),0)',
      'USD'
    ]                                             // 33
  ];
  
  // كتابة الجدول ابتداءً من الصف 3
  sheet.getRange(3, 1, metrics.length, 3).setValues(metrics);
  
  // تلوين عناوين الأقسام
  sheet.getRange('A4:C4')   // المؤشرات المالية
    .setBackground(CONFIG.COLORS.HEADER.REPORTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold');
  
  sheet.getRange('A12:C12') // إحصائيات
    .setBackground(CONFIG.COLORS.HEADER.REPORTS)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold');
  
  sheet.getRange('A18:C18') // السيولة
    .setBackground(CONFIG.COLORS.HEADER.REVENUE)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold');
  
  sheet.getRange('A28:C28') // الديون
    .setBackground('#6d4c41')
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold');
  
  // تنسيقات الأرقام
  // مؤشرات مالية (صفوف 5–10 في العمود B)
  sheet.getRange(5, 2, 6, 1).setNumberFormat('$#,##0.00');
  // أرصدة بنك وخزنة (صفوف 19–22)
  sheet.getRange(19, 2, 4, 1).setNumberFormat('#,##0.00');
  // سعر الصرف
  sheet.getRange(25, 2).setNumberFormat('#,##0.0000');
  // إجمالي السيولة بالدولار
  sheet.getRange(26, 2).setNumberFormat('$#,##0.00');
  // القروض + الذمم (صفوف 29–33)
  sheet.getRange(29, 2, 5, 1).setNumberFormat('$#,##0.00');
  
  // إبراز سطر "إجمالي الإيرادات المحصلة" مثل ما كنا عاملين قبل كده
  sheet.getRange('A10:C10')
    .setBackground('#ffd54f')
    .setFontWeight('bold')
    .setFontSize(13);
  
  sheet.setFrozenRows(2);
}

/**
 * onSelectionChange - تظليل الصف المحدد في دفتر الحركات
 *
 * ⚡ تحسينات الأداء:
 * 1. Throttling: تجاهل النقرات المتتالية خلال 300ms
 * 2. CacheService: أسرع 10x من PropertiesService
 * 3. Early returns: تجنب العمليات غير الضرورية
 * 4. تجنب setBorder على نفس الصف
 */
function onSelectionChange(e) {
  // ===== Early returns للحالات التي لا تحتاج معالجة =====
  if (!e || !e.range || !e.source) return;

  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== CONFIG.SHEETS.TRANSACTIONS) return;

  const row = e.range.getRow();

  // تجاهل الهيدر
  if (row <= 1) return;

  // ===== Throttling: تجنب التنفيذ المتكرر =====
  const cache = CacheService.getScriptCache();
  const cacheKey = 'selectionChange_lastRun';
  const rowKey = 'selectionChange_lastRow';

  const lastRun = cache.get(cacheKey);
  const lastRow = cache.get(rowKey);
  const now = Date.now();

  // تجاهل إذا كان آخر تنفيذ خلال 300ms
  if (lastRun && (now - Number(lastRun)) < 300) {
    return;
  }

  // تجاهل إذا كان نفس الصف السابق
  if (lastRow && Number(lastRow) === row) {
    return;
  }

  // ===== تحديث الـ Cache =====
  cache.put(cacheKey, now.toString(), 60);  // صالح لـ 60 ثانية

  // ===== تطبيق التظليل =====
  const lastCol = sheet.getLastColumn();
  const lastHighlighted = lastRow ? Number(lastRow) : null;

  // مسح حدود الصف السابق
  if (lastHighlighted && lastHighlighted !== row && lastHighlighted > 1) {
    try {
      sheet.getRange(lastHighlighted, 1, 1, lastCol)
           .setBorder(false, false, false, false, false, false);
    } catch (err) {
      // تجاهل الأخطاء في حالة الصف غير موجود
    }
  }

  // إضافة حدود للصف الحالي
  sheet.getRange(row, 1, 1, lastCol)
       .setBorder(true, false, true, false, false, false, '#757575', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  // حفظ الصف الحالي
  cache.put(rowKey, row.toString(), 300);  // صالح لـ 5 دقائق
}
function applyTransactionsDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (!sheet) return;

  const lastRow = sheet.getMaxRows();

  // نجيب العناوين علشان نشتغل بالاسم بدل رقم العمود
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const colType   = headers.indexOf('طبيعة الحركة') + 1;
  const colClass  = headers.indexOf('تصنيف الحركة') + 1;
  const colItem   = headers.indexOf('البند') + 1;

  const dvBuilder = SpreadsheetApp.newDataValidation;

  // 🔹 1) قائمة طبيعة الحركة
  if (colType > 0) {
    const typeRule = dvBuilder()
      .requireValueInList([
        '💰 استحقاق مصروف',
        '💸 دفعة مصروف',
        '📈 استحقاق إيراد',
        '✅ تحصيل إيراد',
        '🏦 تمويل',
        '💳 سداد تمويل'
      ], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, colType, lastRow - 1, 1).setDataValidation(typeRule);
  }

  // 🔹 2) قائمة تصنيف الحركة
  if (colClass > 0) {
    const classRule = dvBuilder()
      .requireValueInList([
        'مصروفات مباشرة',
        'مصروفات عمومية',
        'مصروفات أخرى',
        'إيراد عقد',
        'تمويل'
      ], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, colClass, lastRow - 1, 1).setDataValidation(classRule);
  }

  // 🔹 3) قائمة البنود من "قاعدة بيانات البنود"
  const itemsSheet = ss.getSheetByName(CONFIG.SHEETS.ITEMS);
  if (itemsSheet && colItem > 0) {
    const lastItemRow = itemsSheet.getLastRow();
    if (lastItemRow > 1) {
      const itemRange = itemsSheet.getRange(2, 1, lastItemRow - 1, 1); // A2:A

      const itemRule = dvBuilder()
        .requireValueInRange(itemRange, true)
        .setAllowInvalid(false)
        .build();

      sheet.getRange(2, colItem, lastRow - 1, 1).setDataValidation(itemRule);
    }
  }
}
// ==================== شيتات البنك وخزنة العهدة (دولار / ليرة) ====================

// دالة مساعدة صغيرة للبحث عن عمود بالاسم (أو أكثر من اسم محتمل)
function findHeaderIndex_(headers, names) {
  names = Array.isArray(names) ? names : [names];
  for (let i = 0; i < headers.length; i++) {
    const h = String(headers[i] || '').trim();
    for (let j = 0; j < names.length; j++) {
      if (h === String(names[j]).trim()) return i;
    }
  }
  return -1;
}

function createSingleAccountSheet(ss, sheetName, currency) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  sheet.clear();

  // نخلي اتجاه الشيت عادي (شمال → يمين) زي باقي النظام
  sheet.setRightToLeft(false);

  const headers = [
    'Date',
    'Statement',
    'Trans No',
    'Ref',
    'Debit (' + currency + ')',
    'Credit (' + currency + ')',
    'Balance (' + currency + ')',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground('#37474f')
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  const widths = [110, 260, 110, 130, 130, 130, 130, 200];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  sheet.setFrozenRows(1);
  sheet.getRange(2, 5, sheet.getMaxRows() - 1, 3).setNumberFormat('#,##0.00');

  sheet.getRange('B2').setNote(
    'يتم تعبئة هذا الشيت تلقائياً من "دفتر الحركات المالية" عن طريق الدالة rebuildBankAndCashFromTransactions().'
  );

  return sheet;
}

function createBankAndCashSheets(ss) {
  createSingleAccountSheet(ss, 'حساب البنك - دولار', 'USD');
  createSingleAccountSheet(ss, 'حساب البنك - ليرة',  'TRY');
  createSingleAccountSheet(ss, 'خزنة العهدة - دولار', 'USD');
  createSingleAccountSheet(ss, 'خزنة العهدة - ليرة',  'TRY');
  // 🆕 شيت خاص بحركة البطاقة (عادة ليرة)
  createSingleAccountSheet(ss, 'حساب البطاقة - ليرة', 'TRY');
}

// ==================== بناء شيتات البنك والعهدة من دفتر الحركات (من غير أعمدة زيادة) ====================

function rebuildBankAndCashFromTransactions() {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  const ui  = SpreadsheetApp.getUi();

  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (!transSheet) {
    ui.alert('⚠️ شيت "دفتر الحركات المالية" غير موجود.');
    return;
  }

  // نتأكد من وجود شيتات البنك والعهدة والبطاقة
  createBankAndCashSheets(ss);

  const bankUsdSheet = ss.getSheetByName(CONFIG.SHEETS.BANK_USD);
  const bankTrySheet = ss.getSheetByName(CONFIG.SHEETS.BANK_TRY);
  const cashUsdSheet = ss.getSheetByName(CONFIG.SHEETS.CASH_USD);
  const cashTrySheet = ss.getSheetByName(CONFIG.SHEETS.CASH_TRY);
  const cardTrySheet = ss.getSheetByName(CONFIG.SHEETS.CARD_TRY);

  const data = transSheet.getDataRange().getValues();
  if (data.length < 2) {
    ui.alert('⚠️ لا توجد حركات في "دفتر الحركات المالية".');
    return;
  }

  const headers = data[0];

  // خريطة الأعمدة حسب ترتيبك الحالي
  const col = {
    transNo:        findHeaderIndex_(headers, 'رقم الحركة'),
    date:           findHeaderIndex_(headers, 'التاريخ'),
    type:           findHeaderIndex_(headers, 'طبيعة الحركة'),
    classification: findHeaderIndex_(headers, 'تصنيف الحركة'),
    details:        findHeaderIndex_(headers, 'التفاصيل'),
    party:          findHeaderIndex_(headers, 'اسم المورد/الجهة'),
    amount:         findHeaderIndex_(headers, 'المبلغ بالعملة الأصلية'),
    currency:       findHeaderIndex_(headers, ['العملة', 'العملة الأصلية']),
    rate:           findHeaderIndex_(headers, 'سعر الصرف'),
    amountUsd:      findHeaderIndex_(headers, 'القيمة بالدولار'),
    refNo:          findHeaderIndex_(headers, 'رقم مرجعي'),
    payMethod:      findHeaderIndex_(headers, 'طريقة الدفع'),
    status:         findHeaderIndex_(headers, 'حالة السداد'),
    notes:          findHeaderIndex_(headers, 'ملاحظات')
  };

  // لو الأعمدة الأساسية مش موجودة نوقف
  if (col.currency === -1 || col.amount === -1 || col.payMethod === -1 || col.type === -1) {
    ui.alert(
      '⚠️ لا يمكن تحديث شيتات البنك والعهدة.\n' +
      'تأكد من وجود الأعمدة التالية بالضبط في "دفتر الحركات المالية":\n' +
      'رقم الحركة، التاريخ، طبيعة الحركة، المبلغ بالعملة الأصلية، العملة، طريقة الدفع، ملاحظات (اختياري).'
    );
    return;
  }

  // إعداد حاويات الحسابات
  const accounts = {
    bankUsd: { sheet: bankUsdSheet, rows: [], balance: 0 },
    bankTry: { sheet: bankTrySheet, rows: [], balance: 0 },
    cashUsd: { sheet: cashUsdSheet, rows: [], balance: 0 },
    cashTry: { sheet: cashTrySheet, rows: [], balance: 0 },
    cardTry: { sheet: cardTrySheet, rows: [], balance: 0 }
  };

  // 🔍 تحديد نوع الحساب (بنك / خزنة / بطاقة + العملة)
  function detectAccountKey(payMethodVal, currencyVal) {
    const pm  = String(payMethodVal || '').toLowerCase();
    const cur = String(currencyVal  || '').toLowerCase();

    const isCash =
      pm.indexOf('نقد') !== -1 ||
      pm.indexOf('كاش') !== -1 ||
      pm.indexOf('خزنة') !== -1 ||
      pm.indexOf('عهدة') !== -1 ||
      pm.indexOf('cash') !== -1;

    const isBank =
      pm.indexOf('تحويل') !== -1 ||
      pm.indexOf('بنكي') !== -1 ||
      pm.indexOf('bank') !== -1;

    const isCard =
      pm.indexOf('بطاقة') !== -1 ||
      pm.indexOf('كريدت') !== -1 ||
      pm.indexOf('credit') !== -1 ||
      pm.indexOf('visa') !== -1 ||
      pm.indexOf('ماستر') !== -1;

    const isUsd =
      cur.indexOf('usd')   !== -1 ||
      cur.indexOf('دولار') !== -1 ||
      cur.indexOf('$')     !== -1;

    const isTry =
      cur.indexOf('try')   !== -1 ||
      cur.indexOf('tl')    !== -1 ||
      cur.indexOf('ليرة')  !== -1;

    const isEgp =
      cur.indexOf('egp')   !== -1 ||
      cur.indexOf('جنيه')  !== -1 ||
      cur.indexOf('ج.م')   !== -1;

    if (isCard)          return 'cardTry';             // البطاقة دائمًا ليرة
    if (isBank && isUsd) return 'bankUsd';
    if (isBank && isTry) return 'bankTry';
    if (isCash && isUsd) return 'cashUsd';
    if (isCash && isTry) return 'cashTry';
    if (isCash && isEgp) return 'cashUsd';             // الجنيه يتحول لدولار ويذهب لخزنة الدولار
    return null;
  }

  // نعدّي على كل الصفوف
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const typeVal    = String(row[col.type] || '').trim();
    const classVal   = col.classification >= 0 ? String(row[col.classification] || '').trim() : '';
    const detailsVal = col.details        >= 0 ? String(row[col.details]        || '').trim() : '';
    const statusVal  = col.status         >= 0 ? String(row[col.status]         || '').trim() : '';

    const payMethodVal = row[col.payMethod];
    const currencyVal  = row[col.currency];

    // 1) لو مفيش طريقة دفع أو عملة ⇒ مش حركة نقدية أصلاً
    if (!payMethodVal || !currencyVal) continue;

    // 2) تحديد هل هي استحقاق؟
    const isAccrual =
      typeVal.indexOf('استحقاق') !== -1 ||   // طبيعة الحركة فيها "استحقاق"
      statusVal === 'معلق';                  // أو حالة السداد "معلق"

     // 3) تحديد هل هي تمويل (قصير/طويل/سلفة قصيرة الأجل)
     const isFinancing =
     // أي نوع تمويل مذكور بالاسم
      classVal.indexOf('تمويل')  !== -1 ||
      detailsVal.indexOf('تمويل') !== -1 ||

     // سلفة قصيرة الأجل (تُعامل كتمويل قصير الأجل)
      classVal.indexOf('سلفة قصيرة') !== -1 ||
      detailsVal.indexOf('سلفة قصيرة') !== -1;
    // 4) تحديد هل هي حركة مدفوعة فعليًا؟
    const isPaidMovement =
      statusVal === 'عملية دفع/تحصيل' ||
      statusVal === CONFIG.PAYMENT_STATUS.PAID   ||
      statusVal === 'مدفوع جزئياً';

    // 🔴 استبعاد كل الاستحقاقات غير الممولة
    // 🔴 واستبعاد أي حركة غير مدفوعة فعليًا وليست استحقاق تمويل
    if (!isPaidMovement && !(isAccrual && isFinancing)) {
      // يعني: ليست حركة مدفوعة، وليست استحقاق تمويل ⇒ مالهاش أثر نقدي
      continue;
    }

    // 5) تحديد الحساب المناسب
    const key = detectAccountKey(payMethodVal, currencyVal);
    if (!key || !accounts[key]) continue;

    const acc = accounts[key];

    const date    = col.date    >= 0 ? row[col.date]    : '';
    const transNo = col.transNo >= 0 ? row[col.transNo] : '';
    const refNo   = col.refNo   >= 0 ? row[col.refNo]   : '';
    const party   = col.party   >= 0 ? String(row[col.party] || '') : '';
    const notes   = col.notes   >= 0 ? row[col.notes]   || '' : '';

    // 6) تحديد المبلغ:
    //    - USD / TRY → من "المبلغ بالعملة الأصلية"
    //    - EGP → من "القيمة بالدولار" ويروح لخزنة الدولار
    const cur = String(currencyVal).toLowerCase();
    let amount = 0;

    const isEgp =
      cur.indexOf('egp')   !== -1 ||
      cur.indexOf('جنيه')  !== -1 ||
      cur.indexOf('ج.م')   !== -1;

    if (isEgp && col.amountUsd !== -1) {
      amount = Number(row[col.amountUsd]) || 0;
    } else {
      amount = Number(row[col.amount]) || 0;
    }

    if (!amount) continue;

    // 7) تحديد اتجاه الحركة (داخل / خارج الحساب)
    let debitAcc  = 0;
    let creditAcc = 0;

    // فلوس داخلة الحساب (تحصيل / تمويل / استرداد…)
    if (
      typeVal.indexOf('تحصيل') !== -1 ||     // تحصيل إيراد
      typeVal.indexOf('تمويل') !== -1 ||     // تمويل (قرض/دعم داخل الحساب)
      typeVal.indexOf('استرداد') !== -1      // استرداد تأمين من القناة
    ) {
      debitAcc = amount;
    }
    // فلوس خارجة من الحساب (أي دفعة / سداد / تأمين مدفوع…)
    else {
      creditAcc = amount;
    }

    if (!debitAcc && !creditAcc) continue;

    // 8) تحديث رصيد الحساب
    acc.balance += debitAcc - creditAcc;

    // 9) وصف الحركة
    let statement = '';
    if (party && detailsVal) statement = party + ' - ' + detailsVal;
    else if (party)          statement = party;
    else if (detailsVal)     statement = detailsVal;
    else                     statement = typeVal;

    acc.rows.push([
      date,
      statement,
      transNo,
      refNo,
      debitAcc,
      creditAcc,
      acc.balance,
      notes
    ]);
  }

  // 10) تفريغ وكتابة الشيتات
  Object.values(accounts).forEach(acc => {
    const sheet = acc.sheet;
    if (!sheet) return;

    const maxRows = sheet.getMaxRows();
    if (maxRows > 1) {
      sheet.getRange(2, 1, maxRows - 1, 8).clearContent();
    }

    if (!acc.rows.length) return;

    sheet.getRange(2, 1, acc.rows.length, 8).setValues(acc.rows);
    sheet.getRange(2, 1, acc.rows.length, 1).setNumberFormat('yyyy-MM-dd');
    sheet.getRange(2, 5, acc.rows.length, 3).setNumberFormat('#,##0.00');
  });

  ui.alert('✅ تم تحديث شيتات البنك وخزنة العهدة وحساب البطاقة من "دفتر الحركات المالية" بنجاح.');
}
// ==================== شيتات مطابقة البنك (دولار / ليرة) ====================

// إنشاء شيت مطابقة (نفس الشيت نلصق فيه كشف البنك وتظهر فيه النتيجة)
function createBankReconciliationSheet_(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  sheet.clear();
  sheet.setRightToLeft(false);

  const headers = ["Date", "Amount", "System Balance", "Bank Amount", "Match Status"];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#263238")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  sheet.setColumnWidth(1, 120); // Date
  sheet.setColumnWidth(2, 120); // Amount
  sheet.setColumnWidth(3, 140); // System Balance
  sheet.setColumnWidth(4, 140); // Bank Amount
  sheet.setColumnWidth(5, 200); // Status

  sheet.setFrozenRows(1);

  sheet.getRange("A2").setNote(
    "➡ الصق هنا كشف البنك الشهري (Date في العمود A / Amount في العمود B)\n" +
    "ثم من القائمة اختر أمر المطابقة للعملة المناسبة."
  );
}

// إنشاء شيت مطابقة البنك دولار
function createBankReconciliationUsdSheet() {
  createBankReconciliationSheet_("مطابقة البنك - دولار");
}

// إنشاء شيت مطابقة البنك ليرة
function createBankReconciliationTrySheet() {
  createBankReconciliationSheet_("مطابقة البنك - ليرة");
}

// توليد مفتاح موحّد من التاريخ + المبلغ (للاستخدام الداخلي فقط)
function makeReconcileKey_(date, amount) {
  if (!date || amount === "" || amount === null) return "";
  const tz   = Session.getScriptTimeZone();
  const dStr = Utilities.formatDate(new Date(date), tz, "yyyy-MM-dd");
  const amt  = Math.round((Number(amount) || 0) * 100) / 100; // تقريب لرقمين
  return dStr + "|" + amt.toFixed(2);
}

// قراءة بيانات حساب البنك من شيت النظام (حساب البنك - دولار / ليرة)
function getSystemBankMapForCurrency_(currency) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetName = (currency === "USD")
    ? "حساب البنك - دولار"
    : "حساب البنك - ليرة";

  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return {};

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};

  // نتوقع هيكل شيت البنك:
  // A: Date, B: Statement, C: Trans No, D: Ref,
  // E: Debit, F: Credit, G: Balance, H: Notes
  const values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();

  const map = {}; // key -> { balance, count }

  values.forEach(r => {
    const date    = r[0];
    const debit   = Number(r[4]) || 0;
    const credit  = Number(r[5]) || 0;
    const balance = Number(r[6]) || 0;

    // نستخدم القيمة المطلقة للحركة (المبلغ الإيجابي)
    const amount = debit > 0 ? debit : (credit > 0 ? credit : 0);
    if (!date || !amount) return;

    const key = makeReconcileKey_(date, amount);
    if (!key) return;

    if (!map[key]) {
      map[key] = { balance: balance, count: 1 };
    } else {
      map[key].count++;
      map[key].balance = balance; // آخر رصيد لنفس الحركة
    }
  });

  return map;
}
// قراءة بيانات حساب البطاقة من شيت النظام "حساب البطاقة - ليرة"
function getSystemCardMap_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetName = "حساب البطاقة - ليرة";
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return {};

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};

  // نتوقع نفس هيكل شيت البنك:
  // A: Date, B: Statement, C: Trans No, D: Ref,
  // E: Debit, F: Credit, G: Balance, H: Notes
  const values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();

  const map = {}; // key -> { balance, count }

  values.forEach(r => {
    const date    = r[0];
    const debit   = Number(r[4]) || 0;
    const credit  = Number(r[5]) || 0;
    const balance = Number(r[6]) || 0;

    // نستخدم القيمة المطلقة للحركة (المبلغ الإيجابي)
    const amount = debit > 0 ? debit : (credit > 0 ? credit : 0);
    if (!date || !amount) return;

    const key = makeReconcileKey_(date, amount);
    if (!key) return;

    if (!map[key]) {
      map[key] = { balance: balance, count: 1 };
    } else {
      map[key].count++;
      map[key].balance = balance; // آخر رصيد لنفس الحركة
    }
  });

  return map;
}
// دالة عامة للمطابقة لحساب البنك لعملة معينة
function bankReconcileForCurrency_(currency) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const sheetName = (currency === "USD")
    ? "مطابقة البنك - دولار"
    : "مطابقة البنك - ليرة";

  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    ui.alert("❗ شيت '" + sheetName + "' غير موجود.\nأنشئه أولاً (أو شغّل createBankReconciliationUsdSheet/Try من المحرّر).");
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert(
      "⚠️ لا توجد بيانات بنك للمطابقة في '" + sheetName + "'.\n\n" +
      "رجاءً الصق كشف البنك الشهري (التاريخ في العمود A، المبلغ في العمود B) ثم أعد تشغيل المطابقة."
    );
    return;
  }

  // نقرأ بيانات البنك (اللي أنت لاصقها)
  const bankData = sheet.getRange(2, 1, lastRow - 1, 2).getValues(); // A:Date, B:Amount

  // نجيب خريطة النظام
  const sysMap = getSystemBankMapForCurrency_(currency);

  const headers = ["Date", "Amount", "System Balance", "Bank Amount", "Match Status"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const rowsOut = [];
  const statusColors = [];

  bankData.forEach(row => {
    const date = row[0];
    const amt  = Number(row[1]) || 0;

    let systemBalance = "";
    let bankAmount    = "";
    let status        = "";

    if (!date || !amt) {
      // صف فاضي أو ناقص
      rowsOut.push([date || "", amt || "", "", "", "⚠️ بيانات ناقصة"]);
      statusColors.push("#ffcdd2"); // أحمر فاتح
      return;
    }

    const key  = makeReconcileKey_(date, amt);
    const info = sysMap[key];

    bankAmount = amt;

    if (!info) {
      // موجود في كشف البنك بس مش موجود في النظام
      status = "❌ Bank only (غير مسجّل في النظام)";
      rowsOut.push([date, amt, "", bankAmount, status]);
      statusColors.push("#ffcdd2"); // أحمر فاتح
    } else if (info.count > 1) {
      // نفس التاريخ والمبلغ مكرر في النظام
      systemBalance = info.balance;
      status = "⚠️ Duplicate in system (مكرر في النظام)";
      rowsOut.push([date, amt, systemBalance, bankAmount, status]);
      statusColors.push("#fff9c4"); // أصفر فاتح
    } else {
      // مطابق 1:1
      systemBalance = info.balance;
      status = "✔ MATCH";
      rowsOut.push([date, amt, systemBalance, bankAmount, status]);
      statusColors.push("#c8e6c9"); // أخضر فاتح
    }
  });

  // نفضي المحتوى واللون القديم من A2:E
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 5).clearContent().clearFormat();
  }

  const n = rowsOut.length;
  if (n > 0) {
    sheet.getRange(2, 1, n, 5).setValues(rowsOut);
    sheet.getRange(2, 1, n, 1).setNumberFormat("yyyy-MM-dd");
    sheet.getRange(2, 2, n, 3).setNumberFormat("#,##0.00");

    // تلوين حالة المطابقة
    const statusRange = sheet.getRange(2, 5, n, 1);
    const backgrounds = statusColors.map(c => [c || null]);
    statusRange.setBackgrounds(backgrounds);
  }

  ui.alert(
    "✅ انتهت المطابقة لحساب البنك " +
    (currency === "USD" ? "بالدولار" : "بالليرة") + ".\n\n" +
    "الأحمر = فروقات بين النظام وكشف البنك.\n" +
    "الأخضر = حركات متطابقة.\n" +
    "الأصفر = حركة مكررة في النظام."
  );
}

function reconcileCard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const sheetName = "مطابقة الكارت";
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    ui.alert("❗ شيت '" + sheetName + "' غير موجود.\nأنشئه أولاً عن طريق createCardReconciliationSheet من المحرّر.");
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert(
      "⚠️ لا توجد بيانات كارت للمطابقة في '" + sheetName + "'.\n\n" +
      "رجاءً الصق كشف الكارت (التاريخ في العمود A، المبلغ في العمود B) ثم أعد تشغيل المطابقة."
    );
    return;
  }

  // نقرأ بيانات كشف الكارت (اللي أنت لاصقها)
  const cardData = sheet.getRange(2, 1, lastRow - 1, 2).getValues(); // A:Date, B:Amount

  // نجيب خريطة النظام من شيت "حساب البطاقة - ليرة"
  const sysMap = getSystemCardMap_();

  const headers = ["Date", "Amount", "System Balance", "Card Amount", "Match Status"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#263238")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  const rowsOut = [];
  const statusColors = [];

  cardData.forEach(row => {
    const date = row[0];
    const amt  = Number(row[1]) || 0;

    let systemBalance = "";
    let cardAmount    = "";
    let status        = "";

    if (!date || !amt) {
      // صف فاضي أو ناقص
      rowsOut.push([date || "", amt || "", "", "", "⚠️ بيانات ناقصة"]);
      statusColors.push("#ffcdd2"); // أحمر فاتح
      return;
    }

    const key  = makeReconcileKey_(date, amt);
    const info = sysMap[key];

    cardAmount = amt;

    if (!info) {
      // موجود في كشف الكارت بس مش موجود في النظام
      status = "❌ Card only (غير مسجّل في النظام)";
      rowsOut.push([date, amt, "", cardAmount, status]);
      statusColors.push("#ffcdd2"); // أحمر فاتح
    } else if (info.count > 1) {
      // نفس التاريخ والمبلغ مكرر في النظام
      systemBalance = info.balance;
      status = "⚠️ Duplicate in system (مكرر في النظام)";
      rowsOut.push([date, amt, systemBalance, cardAmount, status]);
      statusColors.push("#fff9c4"); // أصفر فاتح
    } else {
      // مطابق 1:1
      systemBalance = info.balance;
      status = "✔ MATCH";
      rowsOut.push([date, amt, systemBalance, cardAmount, status]);
      statusColors.push("#c8e6c9"); // أخضر فاتح
    }
  });

  // نفضي المحتوى واللون القديم من A2:E
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 5).clearContent().clearFormat();
  }

  const n = rowsOut.length;
  if (n > 0) {
    sheet.getRange(2, 1, n, 5).setValues(rowsOut);
    sheet.getRange(2, 1, n, 1).setNumberFormat("yyyy-MM-dd");
    sheet.getRange(2, 2, n, 3).setNumberFormat("#,##0.00");

    // تلوين حالة المطابقة
    const statusRange = sheet.getRange(2, 5, n, 1);
    const backgrounds = statusColors.map(c => [c || null]);
    statusRange.setBackgrounds(backgrounds);
  }

  ui.alert(
    "✅ انتهت المطابقة لحساب الكارت.\n\n" +
    "الأحمر = فروقات بين النظام وكشف الكارت.\n" +
    "الأخضر = حركات متطابقة.\n" +
    "الأصفر = حركة مكررة في النظام."
  );
}

// دوال مختصرة للمنيو (تتوافق مع onOpen الجديد)
function reconcileBankUsd() {
  bankReconcileForCurrency_("USD");
}

function reconcileBankTry() {
  bankReconcileForCurrency_("TRY");
}

// ==================== تحديث لوحة التحكم ====================

function refreshDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // 1) تحديث كل التقارير الملخصة بناءً على دفتر الحركات
  rebuildAllSummaryReports();

  // 2) إعادة بناء لوحة التحكم من جديد
  createDashboardSheet(ss);

  ui.alert('✅ تم تحديث لوحة التحكم وكل التقارير الملخصة بناءً على أحدث بيانات دفتر الحركات.');
}
// ==================== 🎉 نهاية الكود ====================