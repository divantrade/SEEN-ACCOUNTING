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
    FUNDERS_REPORT: 'تقرير الممولين',
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
    'استحقاق مصروف',
    'دفعة مصروف',
    'استحقاق إيراد',
    'تحصيل إيراد',
    'تمويل',
    'سداد تمويل',
    'تأمين مدفوع للقناة',
    'استرداد تأمين من القناة'
  ]
};


// ==================== دوال مساعدة (Utility Functions) ====================
/**
 * ⚡ تحسينات الأولوية المتوسطة:
 * - توحيد الأنماط المتكررة في دوال مساعدة
 * - تقليل تكرار الكود وتحسين الصيانة
 */

/**
 * تعيين عرض الأعمدة دفعة واحدة
 * @param {Sheet} sheet - الشيت المستهدف
 * @param {number[]} widths - مصفوفة عروض الأعمدة
 */
function setColumnWidths_(sheet, widths) {
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
}

/**
 * إعداد هيدر الشيت مع التنسيق
 * @param {Sheet} sheet - الشيت المستهدف
 * @param {string[]} headers - مصفوفة عناوين الأعمدة
 * @param {string} bgColor - لون الخلفية
 * @param {Object} options - خيارات إضافية (fontSize, textColor)
 */
function setupSheetHeader_(sheet, headers, bgColor, options = {}) {
  const textColor = options.textColor || CONFIG.COLORS.TEXT.WHITE;
  const fontSize = options.fontSize || CONFIG.FONT.NORMAL;

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(bgColor)
    .setFontColor(textColor)
    .setFontWeight('bold')
    .setFontSize(fontSize);
}

/**
 * الحصول على شيت أو إنشاؤه مع مسح المحتوى
 * @param {Spreadsheet} ss - ملف الجدول
 * @param {string} sheetName - اسم الشيت
 * @param {boolean} deleteExisting - حذف الشيت الموجود (default: false)
 * @returns {Sheet} الشيت
 */
function getOrCreateSheet_(ss, sheetName, deleteExisting = false) {
  let sheet = ss.getSheetByName(sheetName);
  if (sheet && deleteExisting) {
    ss.deleteSheet(sheet);
    sheet = null;
  }
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }
  return sheet;
}

/**
 * إعداد شيت كامل (هيدر + عرض أعمدة + تجميد)
 * @param {Sheet} sheet - الشيت المستهدف
 * @param {string[]} headers - مصفوفة عناوين الأعمدة
 * @param {number[]} widths - مصفوفة عروض الأعمدة
 * @param {string} bgColor - لون خلفية الهيدر
 * @param {Object} options - خيارات إضافية
 */
function setupSheet_(sheet, headers, widths, bgColor, options = {}) {
  setupSheetHeader_(sheet, headers, bgColor, options);
  setColumnWidths_(sheet, widths);
  sheet.setFrozenRows(options.frozenRows || 1);
  if (options.frozenCols) sheet.setFrozenColumns(options.frozenCols);
}


// ==================== دالة مساعدة للحصول على بيانات الطرف ====================
/**
 * الحصول على بيانات الطرف من قاعدة البيانات الموحدة (PARTIES) مع fallback للقواعد القديمة
 * @param {Spreadsheet} ss - ملف الجدول
 * @param {string} partyName - اسم الطرف
 * @param {string} partyType - نوع الطرف ('مورد' / 'عميل' / 'ممول') - اختياري للتصفية
 * @returns {Object} بيانات الطرف {name, type, specialization, phone, email, city, paymentMethod, bankInfo, notes}
 */
function getPartyData_(ss, partyName, partyType) {
  // النتيجة الافتراضية
  const defaultResult = {
    name: partyName,
    type: partyType || '',
    specialization: '',
    phone: '',
    email: '',
    city: '',
    paymentMethod: '',
    bankInfo: '',
    notes: ''
  };

  if (!partyName) return defaultResult;

  // ✅ أولاً: البحث في قاعدة البيانات الموحدة (PARTIES)
  const partiesSheet = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  if (partiesSheet) {
    const partiesData = partiesSheet.getDataRange().getValues();
    for (let i = 1; i < partiesData.length; i++) {
      const row = partiesData[i];
      if (row[0] === partyName) {
        // تأكد من مطابقة نوع الطرف إذا تم تحديده
        if (partyType && row[1] !== partyType) continue;

        return {
          name: row[0] || partyName,
          type: row[1] || partyType || '',
          specialization: row[2] || '',
          phone: row[3] || '',
          email: row[4] || '',
          city: row[5] || '',
          paymentMethod: row[6] || '',
          bankInfo: row[7] || '',
          notes: row[8] || ''
        };
      }
    }
  }

  // ✅ ثانياً: Fallback للقواعد القديمة حسب نوع الطرف
  if (!partyType || partyType === 'مورد') {
    const vendorsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_VENDORS);
    if (vendorsSheet) {
      const vData = vendorsSheet.getDataRange().getValues();
      for (let i = 1; i < vData.length; i++) {
        if (vData[i][0] === partyName) {
          return {
            name: partyName,
            type: 'مورد',
            specialization: vData[i][1] || '',
            phone: vData[i][2] || '',
            email: vData[i][3] || '',
            city: vData[i][4] || '',
            paymentMethod: '',
            bankInfo: vData[i][5] || '',
            notes: vData[i][6] || ''
          };
        }
      }
    }
  }

  if (!partyType || partyType === 'عميل') {
    const clientsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_CLIENTS);
    if (clientsSheet) {
      const cData = clientsSheet.getDataRange().getValues();
      for (let i = 1; i < cData.length; i++) {
        if (cData[i][0] === partyName) {
          return {
            name: partyName,
            type: 'عميل',
            specialization: cData[i][1] || '', // نوع العميل
            phone: cData[i][2] || '',
            email: cData[i][3] || '',
            city: cData[i][4] || '',
            paymentMethod: cData[i][5] || '', // قناة التواصل
            bankInfo: cData[i][6] || '', // الشخص المسئول
            notes: cData[i][7] || ''
          };
        }
      }
    }
  }

  if (!partyType || partyType === 'ممول') {
    const fundersSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_FUNDERS);
    if (fundersSheet) {
      const fData = fundersSheet.getDataRange().getValues();
      for (let i = 1; i < fData.length; i++) {
        if (fData[i][0] === partyName) {
          return {
            name: partyName,
            type: 'ممول',
            specialization: fData[i][1] || '',
            phone: fData[i][2] || '',
            email: fData[i][3] || '',
            city: fData[i][4] || '',
            paymentMethod: '',
            bankInfo: fData[i][5] || '',
            notes: fData[i][6] || ''
          };
        }
      }
    }
  }

  return defaultResult;
}

/**
 * الحصول على خريطة تخصصات جميع الأطراف من نوع معين
 * @param {Spreadsheet} ss - ملف الجدول
 * @param {string} partyType - نوع الطرف ('مورد' / 'عميل' / 'ممول')
 * @returns {Object} خريطة {اسم الطرف: التخصص}
 */
function getPartySpecializationMap_(ss, partyType) {
  const specialMap = {};

  // ✅ أولاً: من قاعدة البيانات الموحدة
  const partiesSheet = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  if (partiesSheet) {
    const partiesData = partiesSheet.getDataRange().getValues();
    for (let i = 1; i < partiesData.length; i++) {
      const row = partiesData[i];
      if (row[0] && (!partyType || row[1] === partyType)) {
        specialMap[row[0]] = row[2] || '';
      }
    }
  }

  // ✅ ثانياً: Fallback للقواعد القديمة
  if (!partyType || partyType === 'مورد') {
    const vendorsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_VENDORS);
    if (vendorsSheet) {
      const vData = vendorsSheet.getDataRange().getValues();
      for (let i = 1; i < vData.length; i++) {
        if (vData[i][0] && !specialMap[vData[i][0]]) {
          specialMap[vData[i][0]] = vData[i][1] || '';
        }
      }
    }
  }

  if (!partyType || partyType === 'عميل') {
    const clientsSheet = ss.getSheetByName(CONFIG.SHEETS.LEGACY_CLIENTS);
    if (clientsSheet) {
      const cData = clientsSheet.getDataRange().getValues();
      for (let i = 1; i < cData.length; i++) {
        if (cData[i][0] && !specialMap[cData[i][0]]) {
          specialMap[cData[i][0]] = cData[i][1] || '';
        }
      }
    }
  }

  return specialMap;
}


// ==================== القائمة الرئيسية ====================
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('💼 نظام المحاسبة')

    // التقارير السريعة
    .addItem('📊 تحديث لوحة التحكم', 'refreshDashboard')
    .addItem('🔄 إعادة بناء كل التقارير الملخصة', 'rebuildAllSummaryReports')
    .addSeparator()

    // الاستخدام اليومي العادي
    .addItem('➕ إضافة حركة جديدة', 'addTransactionWithDate')
    .addItem('🔃 ترتيب الحركات حسب التاريخ', 'sortTransactionsByDate')
    .addSeparator()
    .addItem('📝 إضافة ميزانية', 'addBudgetForm')
    .addItem('📊 مقارنة الميزانية', 'compareBudget')
    .addSeparator()
    .addItem('🔽 تحديث القوائم المنسدلة', 'refreshDropdowns')
    .addItem('🧹 تنظيف الايقونات من طبيعة الحركة', 'cleanupNatureTypeEmojis')
    .addItem('⏰ عرض الاستحقاقات (نافذة)', 'showUpcomingPayments')
    .addItem('🔔 تحديث التنبيهات', 'updateAlerts')
    .addItem('📊 تقرير الاستحقاقات الشامل', 'generateDueReport')
    .addSeparator()

    // الموردون / العملاء / الممولون
    .addSubMenu(
      ui.createMenu('👥 الموردون / العملاء / الممولون')
        .addItem('📄 كشف حساب مورد في شيت', 'generateVendorStatementSheet')
        .addItem('📄 كشف حساب عميل في شيت', 'generateClientStatementSheet')
        .addItem('📄 كشف حساب ممول في شيت', 'generateFunderStatementSheet')
    )

    // تقارير الملخص
    .addSubMenu(
      ui.createMenu('📈 تقارير الملخص')
        .addItem('📋 تقرير المشروع التفصيلي', 'rebuildProjectDetailReport')
        .addItem('🏢 تقرير الموردين الملخص', 'rebuildVendorSummaryReport')
        .addItem('💼 تقرير الممولين الملخص', 'rebuildFunderSummaryReport')
        .addItem('💸 تقرير المصروفات الملخص', 'rebuildExpenseSummaryReport')
        .addItem('💰 تقرير الإيرادات الملخص', 'rebuildRevenueSummaryReport')
        .addItem('💵 تقرير التدفقات النقدية', 'rebuildCashFlowReport')
        .addSeparator()
        .addItem('🔄 تحديث كل التقارير الملخصة', 'rebuildAllSummaryReports')
    )

    // البنك وخزنة العهدة
    .addSubMenu(
      ui.createMenu('🏦 البنك وخزنة العهدة')
        .addItem('🔄 تحديث شيتات البنك وخزنة العهدة والبطاقة', 'rebuildBankAndCashFromTransactions')
    )

    // شيتات مطابقة البنك والكارت
    .addSubMenu(
      ui.createMenu('🔍 مطابقة الحساب البنكي / الكارت')
        .addItem('📝 إنشاء شيت مطابقة دولار', 'createBankReconciliationUsdSheet')
        .addItem('📝 إنشاء شيت مطابقة ليرة', 'createBankReconciliationTrySheet')
        .addItem('📝 إنشاء شيت مطابقة الكارت', 'createCardReconciliationSheet')
        .addSeparator()
        .addItem('✅ مطابقة حساب البنك - دولار', 'reconcileBankUsd')
        .addItem('✅ مطابقة حساب البنك - ليرة', 'reconcileBankTry')
        .addItem('✅ مطابقة الكارت', 'reconcileCard')
    )

    // الربحية والفواتير
    .addSubMenu(
      ui.createMenu('💹 الربحية والفواتير')
        .addItem('📊 تقرير ربحية مشروع (نافذة)', 'showProjectProfitability')
        .addItem('🧾 إنشاء فاتورة قناة من مشروع', 'generateChannelInvoice')
    )

    .addSeparator()

    // إعدادات متقدمة
    .addSubMenu(
      ui.createMenu('⚙️ إعدادات متقدمة')
        .addItem('🔧 إنشاء النظام - الجزء 1 (حذف كامل)', 'setupPart1')
        .addItem('🔧 إنشاء النظام - الجزء 2 (حذف كامل)', 'setupPart2')
        .addSeparator()
        .addItem('📅 تطبيع التواريخ', 'normalizeDateColumns')
        .addItem('📋 إصلاح القوائم المنسدلة', 'fixAllDropdowns')
        .addItem('🎨 إعادة تطبيق التلوين الشرطي', 'refreshTransactionsFormatting')
        .addItem('🔄 تحديث معادلة تاريخ الاستحقاق', 'refreshDueDateFormulas')
        .addItem('💵 تحديث شامل (M, O, U, V)', 'refreshValueAndBalanceFormulas')
        .addItem('📄 إضافة عمود كشف الحساب (دفتر الحركات)', 'addStatementLinkColumn')
        .addItem('📄 إضافة عمود كشف الحساب (تقرير الموردين)', 'addStatementColumnToVendorReport')
        .addItem('📄 إضافة عمود كشف الحساب (تقرير الممولين)', 'addStatementColumnToFunderReport')
        .addSeparator()
        .addItem('💾 إنشاء نسخة احتياطية للشيت', 'backupSpreadsheet')
    )

    .addSeparator()
    .addItem('📖 دليل الاستخدام', 'showGuide')
    .addToUi();
}


// ==================== النافذة الذكية لإضافة حركة ====================

/**
 * فتح النافذة الذكية لإضافة حركة جديدة
 */
function showSmartTransactionForm() {
  const html = HtmlService.createHtmlOutputFromFile('TransactionForm')
    .setWidth(480)
    .setHeight(620)
    .setTitle('إضافة حركة جديدة');

  SpreadsheetApp.getUi().showModalDialog(html, '➕ إضافة حركة جديدة');
}

/**
 * الحصول على بيانات القوائم المنسدلة للنافذة الذكية
 */
function getSmartFormData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const itemsSheet = ss.getSheetByName(CONFIG.SHEETS.ITEMS);

  let natureTypes = [];
  let classifications = [];
  let items = [];

  if (itemsSheet) {
    const lastRow = itemsSheet.getLastRow();
    if (lastRow > 1) {
      const data = itemsSheet.getRange(2, 1, lastRow - 1, 3).getValues();

      const seenNature = {};
      const seenClass = {};
      const seenItems = {};

      for (let i = 0; i < data.length; i++) {
        const itemName = data[i][0];
        const nature = data[i][1];
        const classification = data[i][2];

        // البنود (A)
        if (itemName && !seenItems[itemName]) {
          seenItems[itemName] = true;
          items.push(itemName.toString().trim());
        }

        // طبيعة الحركة (B)
        if (nature && !seenNature[nature]) {
          seenNature[nature] = true;
          natureTypes.push(nature.toString().trim());
        }

        // تصنيف الحركة (C)
        if (classification && !seenClass[classification]) {
          seenClass[classification] = true;
          classifications.push(classification.toString().trim());
        }
      }
    }
  }

  // fallback
  if (natureTypes.length === 0) natureTypes = CONFIG.NATURE_TYPES;
  if (classifications.length === 0) classifications = ['مصروفات مباشرة', 'مصروفات عمومية', 'إيراد عقد', 'تمويل'];

  return {
    today: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy'),
    natureTypes: natureTypes,
    classifications: classifications,
    items: items,
    movementTypes: [CONFIG.MOVEMENT.DEBIT, CONFIG.MOVEMENT.CREDIT]
  };
}

/**
 * إضافة حركة جديدة من النافذة الذكية
 */
function submitSmartFormTransaction(formData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    throw new Error('شيت دفتر الحركات المالية غير موجود!');
  }

  // تحديد آخر صف
  const targetRow = findLastDataRowInColumn_(sheet, 2) + 1;

  // إدراج البيانات الأساسية
  const transactionFormula = '=IF(B' + targetRow + '="","",ROW()-1)';

  sheet.getRange(targetRow, 1).setFormula(transactionFormula);  // A: رقم الحركة
  sheet.getRange(targetRow, 2).setValue(formData.date);          // B: التاريخ
  sheet.getRange(targetRow, 3).setValue(formData.natureType);    // C: طبيعة الحركة
  sheet.getRange(targetRow, 4).setValue(formData.classification);// D: تصنيف الحركة
  sheet.getRange(targetRow, 7).setValue(formData.item);          // G: البند
  sheet.getRange(targetRow, 14).setValue(formData.movementType); // N: نوع الحركة

  // إدراج بيانات شروط الدفع (للحركات المدينة فقط)
  if (formData.movementType === CONFIG.MOVEMENT.DEBIT && formData.paymentTerm) {
    sheet.getRange(targetRow, 18).setValue(formData.paymentTerm);  // R: نوع شرط الدفع
    sheet.getRange(targetRow, 19).setValue(formData.weeksCount || 0); // S: عدد الأسابيع

    // تاريخ مخصص (T) - فقط إذا تم اختيار "تاريخ مخصص"
    if (formData.paymentTerm === 'تاريخ مخصص' && formData.customDueDate) {
      sheet.getRange(targetRow, 20).setValue(formData.customDueDate); // T: تاريخ مخصص
    }
  } else {
    // للحركات الدائنة: عدد الأسابيع = 0
    sheet.getRange(targetRow, 19).setValue(0);
  }

  // بناء ملخص النتيجة
  let summary = formData.natureType + ' | ' + formData.movementType;
  if (formData.paymentTerm) {
    summary += ' | شرط: ' + formData.paymentTerm;
  }

  return {
    row: targetRow,
    summary: summary
  };
}


// ==================== إضافة حركة جديدة (الطريقة القديمة) ====================
/**
 * يعرض نافذة لاختيار طبيعة الحركة والتاريخ ونوع الحركة
 * أنواع الحركة تُقرأ ديناميكياً من قاعدة بيانات البنود (عمود B)
 */
function addTransactionWithDate() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // قراءة أنواع الحركة ديناميكياً من قاعدة بيانات البنود (عمود B)
  var natureTypes = getNatureTypesFromItemsDB_();
  if (natureTypes.length === 0) {
    // fallback للقيم الافتراضية إذا لم توجد بيانات
    natureTypes = CONFIG.NATURE_TYPES;
  }

  // ═══════════════════════════════════════════════════════════
  // الخطوة 1: اختيار طبيعة الحركة
  // ═══════════════════════════════════════════════════════════
  var menuText = '📋 الخطوة 1 من 3: اختر طبيعة الحركة\n\n';
  for (var i = 0; i < natureTypes.length; i++) {
    menuText += (i + 1) + '. ' + natureTypes[i] + '\n';
  }
  menuText += '\nأدخل رقم الخيار (1-' + natureTypes.length + '):';

  var natureResponse = ui.prompt('➕ إضافة حركة جديدة', menuText, ui.ButtonSet.OK_CANCEL);
  if (natureResponse.getSelectedButton() !== ui.Button.OK) return;

  var natureChoice = parseInt(natureResponse.getResponseText().trim(), 10);
  if (isNaN(natureChoice) || natureChoice < 1 || natureChoice > natureTypes.length) {
    ui.alert('❌ خطأ', 'رقم غير صحيح!', ui.ButtonSet.OK);
    return;
  }
  var natureType = natureTypes[natureChoice - 1];

  // ═══════════════════════════════════════════════════════════
  // الخطوة 2: اختيار التاريخ
  // ═══════════════════════════════════════════════════════════
  var dateChoice = ui.alert(
    '📅 الخطوة 2 من 3: اختيار التاريخ',
    'طبيعة الحركة: ' + natureType + '\n\n' +
    'نعم = تاريخ اليوم\nلا = إدخال تاريخ مختلف',
    ui.ButtonSet.YES_NO_CANCEL
  );
  if (dateChoice === ui.Button.CANCEL) return;

  var dateObj;
  var formattedDate;
  if (dateChoice === ui.Button.YES) {
    dateObj = new Date();
    formattedDate = Utilities.formatDate(dateObj, Session.getScriptTimeZone(), 'dd/MM/yyyy');
  } else {
    var dateResponse = ui.prompt(
      '📅 إدخال التاريخ',
      'أدخل التاريخ بصيغة: يوم/شهر/سنة\nمثال: 24/12/2025',
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
    dateObj = parseResult.dateObj;
    formattedDate = parseResult.date;
  }

  // ═══════════════════════════════════════════════════════════
  // الخطوة 3: اختيار نوع الحركة (مدين/دائن)
  // ═══════════════════════════════════════════════════════════
  var movementTypeText = '💰 الخطوة 3 من 3: اختر نوع الحركة\n\n' +
    'طبيعة الحركة: ' + natureType + '\n' +
    'التاريخ: ' + formattedDate + '\n\n' +
    '1. ' + CONFIG.MOVEMENT.DEBIT + '\n' +
    '2. ' + CONFIG.MOVEMENT.CREDIT + '\n\n' +
    'أدخل رقم الخيار (1 أو 2):';

  var movementResponse = ui.prompt('➕ إضافة حركة جديدة', movementTypeText, ui.ButtonSet.OK_CANCEL);
  if (movementResponse.getSelectedButton() !== ui.Button.OK) return;

  var movementChoice = parseInt(movementResponse.getResponseText().trim(), 10);
  if (movementChoice !== 1 && movementChoice !== 2) {
    ui.alert('❌ خطأ', 'اختر 1 أو 2 فقط!', ui.ButtonSet.OK);
    return;
  }
  var movementType = (movementChoice === 1) ? CONFIG.MOVEMENT.DEBIT : CONFIG.MOVEMENT.CREDIT;

  // ═══════════════════════════════════════════════════════════
  // إدراج البيانات
  // ═══════════════════════════════════════════════════════════
  var targetRow = findLastDataRowInColumn_(sheet, 2) + 1;
  if (targetRow < 2) targetRow = 2;

  // A = معادلة رقم الحركة، B = التاريخ، C = طبيعة الحركة، N = نوع الحركة
  var transactionFormula = '=IF(B' + targetRow + '="","",ROW()-1)';

  sheet.getRange(targetRow, 1).setFormula(transactionFormula);  // A: رقم الحركة
  sheet.getRange(targetRow, 2).setValue(dateObj).setNumberFormat('dd/mm/yyyy');  // B: التاريخ
  sheet.getRange(targetRow, 3).setValue(natureType);             // C: طبيعة الحركة

  // N: نوع الحركة مع dropdown
  var movementCell = sheet.getRange(targetRow, 14);
  movementCell.setValue(movementType);
  movementCell.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(CONFIG.MOVEMENT.TYPES, true)
      .setAllowInvalid(true)
      .build()
  );

  ss.toast('✅ صف ' + targetRow + ': ' + natureType + ' | ' + movementType, 'تم', 3);
}

/**
 * تحديد نوع الحركة (مدين/دائن) بناءً على طبيعة الحركة
 * @param {string} natureType - طبيعة الحركة مثل 'استحقاق مصروف'
 * @returns {string} نوع الحركة 'مدين استحقاق' أو 'دائن دفعة'
 */
function getMovementTypeFromNature_(natureType) {
  // الأنواع التي تُعتبر مدين استحقاق (فاتورة/استحقاق)
  const debitTypes = [
    'استحقاق مصروف',
    'استحقاق إيراد',
    'سداد تمويل',
    'تأمين مدفوع للقناة'
  ];

  // الأنواع التي تُعتبر دائن دفعة (دفعة/تحصيل)
  const creditTypes = [
    'دفعة مصروف',
    'تحصيل إيراد',
    'تمويل',
    'استرداد تأمين من القناة'
  ];

  if (debitTypes.includes(natureType)) {
    return CONFIG.MOVEMENT.DEBIT; // 'مدين استحقاق'
  } else if (creditTypes.includes(natureType)) {
    return CONFIG.MOVEMENT.CREDIT; // 'دائن دفعة'
  }
  return null;
}

/**
 * قراءة أنواع الحركة (طبيعة الحركة) ديناميكياً من قاعدة بيانات البنود
 * تُقرأ القيم الفريدة من العمود B وتُرتب
 * @returns {string[]} مصفوفة بأنواع الحركة الفريدة
 */
function getNatureTypesFromItemsDB_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var itemsSheet = ss.getSheetByName(CONFIG.SHEETS.ITEMS);

  if (!itemsSheet) {
    return []; // سيستخدم fallback
  }

  var lastRow = itemsSheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }

  // قراءة عمود B (طبيعة الحركة) من الصف 2
  var data = itemsSheet.getRange(2, 2, lastRow - 1, 1).getValues();

  // استخراج القيم الفريدة
  var uniqueTypes = [];
  var seen = {};

  for (var i = 0; i < data.length; i++) {
    var value = data[i][0];
    if (value && value.toString().trim() !== '' && !seen[value]) {
      seen[value] = true;
      uniqueTypes.push(value.toString().trim());
    }
  }

  return uniqueTypes;
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
 * تحويل صيغة التاريخ من dd/MM/yyyy أو dd.MM.yyyy إلى dd/MM/yyyy
 */
function parseDateInput_(dateStr) {
  // يقبل / أو . أو - كفاصل
  const regex = /^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/;
  const match = dateStr.match(regex);

  if (!match) {
    return { success: false, error: 'صيغة غير صحيحة!\nالمطلوب: يوم/شهر/سنة\nمثال: 24/12/2025' };
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
    date: String(day).padStart(2, '0') + '/' + String(month).padStart(2, '0') + '/' + year,
    dateObj: dateObj
  };
}

/**
 * ترتيب الحركات في دفتر الحركات المالية حسب التاريخ
 * الأقدم في الأعلى (صف 2) والأحدث في الأسفل (آخر صف)
 *
 * ⚠️ ملاحظة: هذه الدالة تحافظ على جميع المعادلات في الأعمدة المحسوبة:
 * A (رقم الحركة), M (القيمة بالدولار), O (الرصيد), P (رقم مرجعي),
 * U (تاريخ الاستحقاق), V (حالة السداد), W (الشهر)
 */
function sortTransactionsByDate() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // تأكيد من المستخدم
  const response = ui.alert(
    '🔃 ترتيب الحركات',
    'سيتم ترتيب جميع الحركات حسب التاريخ:\n' +
    '• الأقدم في الأعلى (صف 2)\n' +
    '• الأحدث في الأسفل (آخر صف)\n' +
    '• ستتم إزالة الصفوف الفارغة (بدون تاريخ)\n' +
    '• سيتم إعادة بناء جميع المعادلات\n\n' +
    'هل تريد المتابعة؟',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    return;
  }

  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(sheet.getLastColumn(), 24); // على الأقل 24 عمود (A-X)

  if (lastRow <= 1) {
    ui.alert('ℹ️ تنبيه', 'لا توجد حركات للترتيب!', ui.ButtonSet.OK);
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // 1. قراءة كل البيانات
  // ═══════════════════════════════════════════════════════════
  const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  const allData = dataRange.getValues();

  // ═══════════════════════════════════════════════════════════
  // 2. فلترة الصفوف الفارغة (صفوف بدون تاريخ صحيح في عمود B)
  // ═══════════════════════════════════════════════════════════
  const validRows = allData.filter(function(row) {
    const dateVal = row[1]; // B = index 1
    // تاريخ صحيح = كائن Date أو نص يمكن تحويله لتاريخ
    if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
      return true;
    }
    if (typeof dateVal === 'string' && dateVal.trim() !== '') {
      const parsed = new Date(dateVal);
      return !isNaN(parsed.getTime());
    }
    return false;
  });

  if (validRows.length === 0) {
    ui.alert('⚠️ تنبيه', 'لا توجد حركات بتواريخ صحيحة للترتيب!', ui.ButtonSet.OK);
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // 3. ترتيب الصفوف حسب التاريخ (تصاعدي: الأقدم أولاً)
  // ═══════════════════════════════════════════════════════════

  // دالة مساعدة لتحويل التاريخ لـ timestamp بشكل صحيح
  function getDateTimestamp(dateVal) {
    // إذا كان Date object من Google Sheets
    if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
      return dateVal.getTime();
    }
    // إذا كان نصاً بصيغة dd/mm/yyyy
    if (typeof dateVal === 'string') {
      // إزالة أي شرطات مائلة مزدوجة أولاً
      dateVal = dateVal.replace(/\/+/g, '/').trim();
      const parts = dateVal.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // الشهر يبدأ من 0
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month, day).getTime();
        }
      }
    }
    // محاولة أخيرة
    const parsed = new Date(dateVal);
    return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  }

  validRows.sort(function(a, b) {
    const dateA = getDateTimestamp(a[1]);
    const dateB = getDateTimestamp(b[1]);
    return dateA - dateB; // تصاعدي: الأقدم في الأعلى
  });

  // ═══════════════════════════════════════════════════════════
  // 4. مسح كل البيانات القديمة
  // ═══════════════════════════════════════════════════════════
  dataRange.clearContent();

  // ═══════════════════════════════════════════════════════════
  // 5. كتابة البيانات المرتبة (أعمدة البيانات فقط، بدون أعمدة المعادلات)
  // أعمدة البيانات: B, C, D, E, F, G, H, I, J, K, L, N, Q, R, S, T, X
  // أعمدة المعادلات/المحسوبة: A, M, O, P, U, V, W
  // ═══════════════════════════════════════════════════════════
  const numRows = validRows.length;

  // دالة مساعدة لتحويل التاريخ لـ Date object بشكل صحيح
  function ensureDateObject(dateVal) {
    if (dateVal instanceof Date) {
      return dateVal;
    }
    if (typeof dateVal === 'string') {
      // إزالة أي شرطات مائلة مزدوجة
      dateVal = dateVal.replace(/\/+/g, '/');
      const parts = dateVal.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return new Date(dateVal);
  }

  // استخراج أعمدة البيانات فقط وكتابتها
  // B-L (indexes 1-11, columns 2-12)
  // مع التأكد من أن التاريخ (B) هو Date object صحيح
  const dataBtoL = validRows.map(function(row) {
    const rowData = row.slice(1, 12); // B to L
    // تحويل التاريخ (أول عنصر = B) لـ Date object
    rowData[0] = ensureDateObject(rowData[0]);
    return rowData;
  });
  sheet.getRange(2, 2, numRows, 11).setValues(dataBtoL);

  // N (index 13, column 14)
  const dataN = validRows.map(function(row) { return [row[13]]; });
  sheet.getRange(2, 14, numRows, 1).setValues(dataN);

  // Q-T (indexes 16-19, columns 17-20)
  // T (index 19) هو تاريخ مخصص - يجب التأكد من أنه Date object
  const dataQtoT = validRows.map(function(row) {
    const rowData = row.slice(16, 20); // Q to T
    // T = العنصر الرابع (index 3) - تحويله لـ Date إذا كان تاريخاً
    if (rowData[3]) {
      rowData[3] = ensureDateObject(rowData[3]);
    }
    return rowData;
  });
  sheet.getRange(2, 17, numRows, 4).setValues(dataQtoT);

  // X (index 23, column 24)
  const dataX = validRows.map(function(row) { return [row[23] || '']; });
  sheet.getRange(2, 24, numRows, 1).setValues(dataX);

  // ═══════════════════════════════════════════════════════════
  // 6. إعادة بناء معادلات الأعمدة: A, P, W
  // ═══════════════════════════════════════════════════════════
  const formulasA = [];
  const formulasP = [];
  const formulasW = [];

  for (let row = 2; row <= numRows + 1; row++) {
    // A: رقم الحركة
    formulasA.push([`=IF(B${row}="","",ROW()-1)`]);

    // P: رقم مرجعي (للحركات المدينة فقط)
    formulasP.push([
      `=IF(AND(N${row}="مدين استحقاق",B${row}<>""),` +
      `"REF-"&TEXT(B${row},"YYYYMMDD")&"-"&ROW(),"")`
    ]);

    // W: الشهر
    formulasW.push([`=IF(B${row}="","",TEXT(B${row},"YYYY-MM"))`]);
  }

  sheet.getRange(2, 1, numRows, 1).setFormulas(formulasA);   // A
  sheet.getRange(2, 16, numRows, 1).setFormulas(formulasP);  // P
  sheet.getRange(2, 23, numRows, 1).setFormulas(formulasW);  // W

  // ═══════════════════════════════════════════════════════════
  // 7. حساب القيم للأعمدة: M, O, U, V
  // (نفس منطق refreshValueAndBalanceFormulas ولكن للصفوف المرتبة)
  // ═══════════════════════════════════════════════════════════

  // جلب بيانات المشاريع (للحصول على تواريخ التسليم)
  const projectDeliveryDates = {};
  if (projectsSheet) {
    const projectData = projectsSheet.getRange('A2:K200').getValues();
    for (let i = 0; i < projectData.length; i++) {
      const code = projectData[i][0];
      const deliveryDate = projectData[i][10]; // K: تاريخ التسليم المتوقع
      if (code && deliveryDate instanceof Date) {
        projectDeliveryDates[code] = deliveryDate;
      }
    }
  }

  const valuesM = [];  // القيمة بالدولار
  const valuesO = [];  // الرصيد
  const valuesU = [];  // تاريخ الاستحقاق
  const valuesV = [];  // حالة السداد

  // لتتبع الأرصدة التراكمية لكل طرف
  const partyBalances = {};

  for (let i = 0; i < validRows.length; i++) {
    const row = validRows[i];
    const dateVal = row[1];                                   // B
    const projectCode = row[4];                               // E
    const party = String(row[8] || '').trim();                // I
    const amount = Number(row[9]) || 0;                       // J
    const currency = String(row[10] || '').trim().toUpperCase(); // K
    const exchangeRate = Number(row[11]) || 0;                // L
    const movementKind = String(row[13] || '').trim();        // N
    const paymentTermType = String(row[17] || '').trim();     // R
    const weeks = Number(row[18]) || 0;                       // S
    const customDate = row[19];                               // T

    // ─────────────────────────────────────────────────────────
    // M: حساب القيمة بالدولار
    // ─────────────────────────────────────────────────────────
    let amountUsd = 0;
    let hasValidConversion = true;
    if (amount > 0) {
      if (currency === 'USD' || currency === 'دولار' || currency === '') {
        amountUsd = amount;
      } else if (exchangeRate > 0) {
        amountUsd = amount / exchangeRate;
      } else {
        hasValidConversion = false;
      }
    }
    valuesM.push([hasValidConversion && amountUsd > 0 ? Math.round(amountUsd * 100) / 100 : '']);

    // ─────────────────────────────────────────────────────────
    // O, V: حساب الرصيد وحالة السداد
    // ─────────────────────────────────────────────────────────
    let balance = '';
    let status = '';

    if (party && amountUsd > 0) {
      if (!partyBalances[party]) {
        partyBalances[party] = 0;
      }

      if (movementKind === 'مدين استحقاق') {
        partyBalances[party] += amountUsd;
      } else if (movementKind === 'دائن دفعة') {
        partyBalances[party] -= amountUsd;
      }

      balance = Math.round(partyBalances[party] * 100) / 100;

      if (movementKind === 'دائن دفعة') {
        status = CONFIG.PAYMENT_STATUS.OPERATION;
      } else if (balance > 0.01) {
        status = CONFIG.PAYMENT_STATUS.PENDING;
      } else {
        status = CONFIG.PAYMENT_STATUS.PAID;
      }
    }
    valuesO.push([balance]);
    valuesV.push([status]);

    // ─────────────────────────────────────────────────────────
    // U: حساب تاريخ الاستحقاق
    // ─────────────────────────────────────────────────────────
    let dueDate = '';

    if (movementKind === 'مدين استحقاق' && paymentTermType) {
      if (paymentTermType === 'فوري') {
        dueDate = dateVal;
      } else if (paymentTermType === 'بعد التسليم' && projectCode) {
        const deliveryDate = projectDeliveryDates[projectCode];
        if (deliveryDate) {
          const newDate = new Date(deliveryDate);
          newDate.setDate(newDate.getDate() + (weeks * 7));
          dueDate = newDate;
        }
      } else if (paymentTermType === 'تاريخ مخصص' && customDate) {
        dueDate = customDate;
      }
    }
    valuesU.push([dueDate]);
  }

  // كتابة القيم المحسوبة
  sheet.getRange(2, 13, numRows, 1).setValues(valuesM);  // M
  sheet.getRange(2, 15, numRows, 1).setValues(valuesO);  // O
  sheet.getRange(2, 21, numRows, 1).setValues(valuesU);  // U
  sheet.getRange(2, 22, numRows, 1).setValues(valuesV);  // V

  // ═══════════════════════════════════════════════════════════
  // 8. تنسيقات
  // ═══════════════════════════════════════════════════════════
  sheet.getRange(2, 2, numRows, 1).setNumberFormat('dd/mm/yyyy');   // B: التاريخ
  sheet.getRange(2, 10, numRows, 1).setNumberFormat('#,##0.00');    // J: المبلغ
  sheet.getRange(2, 12, numRows, 1).setNumberFormat('#,##0.0000');  // L: سعر الصرف
  sheet.getRange(2, 13, numRows, 1).setNumberFormat('#,##0.00');    // M: القيمة بالدولار
  sheet.getRange(2, 15, numRows, 1).setNumberFormat('#,##0.00');    // O: الرصيد
  sheet.getRange(2, 21, numRows, 1).setNumberFormat('dd/mm/yyyy');  // U: تاريخ الاستحقاق

  // ═══════════════════════════════════════════════════════════
  // 9. رسالة نجاح
  // ═══════════════════════════════════════════════════════════
  const removedRows = allData.length - validRows.length;
  let message = 'تم ترتيب ' + validRows.length + ' حركة حسب التاريخ.\n\n' +
    '• الأقدم في الأعلى (صف 2)\n' +
    '• الأحدث في الأسفل (آخر صف)\n' +
    '• تم إعادة بناء جميع المعادلات';

  if (removedRows > 0) {
    message += '\n• تم إزالة ' + removedRows + ' صف فارغ';
  }

  ui.alert('✅ تم الترتيب', message, ui.ButtonSet.OK);

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
    'ملاحظات',             // 24 - X
    '📄 كشف'               // 25 - Y (عمود روابط كشف الحساب)
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
    250,  // X
    60    // Y (كشف)
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

    // 🆕 اسم المشروع (F) - dropdown مرتبط بأسماء المشاريع
    const projectNameRange = projectsSheet.getRange('B2:B200');
    const projectNameValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectNameRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر اسم المشروع - سيتم ملء كود المشروع تلقائياً')
      .build();
    sheet.getRange(2, 6, lastRow, 1) // F
      .setDataValidation(projectNameValidation);
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

  // عدد الأسابيع (S = 19) - validation للأرقام فقط 0-52
  const weeksValidation = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(0, 52)
    .setAllowInvalid(false)
    .setHelpText('أدخل عدد الأسابيع (0-52) - يُستخدم مع شرط "بعد التسليم"')
    .build();
  sheet.getRange(2, 19, lastRow, 1) // S
    .setDataValidation(weeksValidation)
    .setValue(0);  // قيمة افتراضية = 0

  // المعادلات لكل صف - باستخدام Batch Operations للأداء الأمثل
  // بدلاً من 4000 طلب API (7 معادلات × 500 صف) = 7 طلبات فقط
  // ملاحظة: عمود F (اسم المشروع) يُملأ عبر onEdit للمزامنة الثنائية مع E
  const numRows = lastRow - 1;

  const formulasA = [];  // رقم الحركة (A)
  const formulasM = [];  // القيمة بالدولار (M)
  const formulasO = [];  // الرصيد (O)
  const formulasP = [];  // رقم مرجعي (P)
  const formulasU = [];  // تاريخ الاستحقاق (U)
  const formulasV = [];  // حالة السداد (V)
  const formulasW = [];  // الشهر (W)

  for (let row = 2; row <= lastRow; row++) {
    // رقم الحركة (A)
    formulasA.push([`=IF(B${row}="","",ROW()-1)`]);

    // القيمة بالدولار (M)
    // إذا العملة دولار (USD أو دولار) → نفس قيمة J
    // إذا العملة أخرى (TRY/EGP/ليرة/جنيه) → J ÷ سعر الصرف (L)
    // ⚠️ إذا العملة أخرى ولا يوجد سعر صرف → ترك فارغ (يحتاج إدخال سعر الصرف)
    formulasM.push([
      `=IF(J${row}="","",` +
      `IF(OR(K${row}="USD",K${row}="دولار",K${row}=""),J${row},` +
      `IF(OR(L${row}="",L${row}=0),"",J${row}/L${row})))`
    ]);

    // الرصيد O = مجموع (مدين استحقاق - دائن دفعة) لنفس الطرف حتى هذا الصف
    formulasO.push([
      `=IF(OR(I${row}="",M${row}=""),"",` +
      `SUMIFS($M$2:M${row},$I$2:I${row},I${row},$N$2:N${row},"مدين استحقاق")-` +
      `SUMIFS($M$2:M${row},$I$2:I${row},I${row},$N$2:N${row},"دائن دفعة"))`
    ]);

    // رقم مرجعي P (16) للحركات المدينة
    formulasP.push([
      `=IF(AND(N${row}="مدين استحقاق",B${row}<>""),` +
      `"REF-"&TEXT(B${row},"YYYYMMDD")&"-"&ROW(),"")`
    ]);

    // تاريخ الاستحقاق U (21) - محسّن للتعامل مع القيم الفارغة
    // فوري = تاريخ الحركة
    // بعد التسليم = تاريخ التسليم المتوقع + (عدد الأسابيع × 7)
    // تاريخ مخصص = التاريخ المُدخل يدوياً
    // ملاحظة: التحقق من وجود تاريخ التسليم قبل الحساب لتجنب 30/12/1899
    formulasU.push([
      `=IF(OR(N${row}<>"مدين استحقاق",R${row}=""),"",` +
      `IF(R${row}="فوري",B${row},` +
      `IF(R${row}="بعد التسليم",` +
      `IF(OR(E${row}="",NOT(ISNUMBER(VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A2:K200,11,FALSE)))),"",` +
      `VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A2:K200,11,FALSE)+IF(OR(S${row}="",S${row}=0),0,S${row})*7),` +
      `IF(AND(R${row}="تاريخ مخصص",T${row}<>""),T${row},""))))`
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

  // تطبيق كل المعادلات دفعة واحدة (7 طلبات بدلاً من 3500)
  sheet.getRange(2, 1, numRows, 1).setFormulas(formulasA);   // A: رقم الحركة
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

  sheet.getRange(2, 2,  lastRow, 1).setNumberFormat('dd/mm/yyyy'); // B - التاريخ
  sheet.getRange(2, 20, lastRow, 1).setNumberFormat('dd/mm/yyyy'); // T - تاريخ مخصص
  sheet.getRange(2, 21, lastRow, 1).setNumberFormat('dd/mm/yyyy'); // U - تاريخ الاستحقاق
  
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
  // مسح القواعد القديمة أولاً
  sheet.clearConditionalFormatRules();

  const rules = [];
  // استخدام نطاق أكبر لضمان شمول الصفوف الجديدة
  const maxRows = Math.max(lastRow, 1000);
  const dataRange = sheet.getRange(2, 1, maxRows, 24); // من A إلى X

  // استحقاق = برتقالي فاتح
  // استخدام INDIRECT للتأكد من أن الصيغة تعمل مع كل صف
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=AND($N2<>"",$N2="مدين استحقاق")')
      .setBackground(CONFIG.COLORS.BG.LIGHT_ORANGE)
      .setRanges([dataRange])
      .build()
  );

  // دفعة = أزرق فاتح
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=AND($N2<>"",$N2="دائن دفعة")')
      .setBackground(CONFIG.COLORS.BG.LIGHT_BLUE)
      .setRanges([dataRange])
      .build()
  );

  sheet.setConditionalFormatRules(rules);
}

/**
 * إعادة تطبيق التلوين الشرطي على دفتر الحركات المالية
 * يُستدعى من القائمة لإصلاح التلوين على الصفوف الموجودة والجديدة
 */
function refreshTransactionsFormatting() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ لم يتم العثور على شيت "دفتر الحركات المالية"');
    return;
  }

  const lastRow = Math.max(sheet.getLastRow(), 500);
  applyConditionalFormatting(sheet, lastRow);

  SpreadsheetApp.getUi().alert(
    '✅ تم تحديث التلوين الشرطي',
    'تم إعادة تطبيق التلوين الشرطي على دفتر الحركات المالية.\n\n' +
    '• مدين استحقاق = برتقالي فاتح 🟧\n' +
    '• دائن دفعة = أزرق فاتح 🟦\n\n' +
    'النطاق: ' + lastRow + ' صف',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * تحديث معادلة تاريخ الاستحقاق (U) على جميع الصفوف
 * المنطق:
 * - إذا N = "مدين استحقاق" و R = "فوري" → U = تاريخ الحركة (B)
 * - إذا N = "مدين استحقاق" و R = "بعد التسليم" → U = تاريخ التسليم من المشاريع + S أسابيع
 * - إذا N = "مدين استحقاق" و R = "تاريخ مخصص" → U = T (التاريخ المُدخل يدوياً)
 */
function refreshDueDateFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const ui = SpreadsheetApp.getUi();

  if (!sheet) {
    ui.alert('❌ لم يتم العثور على شيت "دفتر الحركات المالية"');
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('⚠️ لا توجد بيانات في الشيت');
    return;
  }

  // بناء المعادلات لكل صف
  // التحقق من وجود تاريخ التسليم قبل الحساب لتجنب 30/12/1899
  const formulas = [];
  for (let row = 2; row <= lastRow; row++) {
    formulas.push([
      `=IF(OR(N${row}<>"مدين استحقاق",R${row}=""),"",` +
      `IF(R${row}="فوري",B${row},` +
      `IF(R${row}="بعد التسليم",` +
      `IF(OR(E${row}="",NOT(ISNUMBER(VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A2:K200,11,FALSE)))),"",` +
      `VLOOKUP(E${row},'قاعدة بيانات المشاريع'!A2:K200,11,FALSE)+IF(OR(S${row}="",S${row}=0),0,S${row})*7),` +
      `IF(AND(R${row}="تاريخ مخصص",T${row}<>""),T${row},""))))`
    ]);
  }

  // تطبيق المعادلات على العمود U
  sheet.getRange(2, 21, lastRow - 1, 1).setFormulas(formulas);

  // تنسيق العمود كتاريخ
  sheet.getRange(2, 21, lastRow - 1, 1).setNumberFormat('dd/mm/yyyy');

  ui.alert(
    '✅ تم تحديث معادلة تاريخ الاستحقاق',
    'تم تطبيق المعادلة على العمود U لجميع الصفوف.\n\n' +
    '📋 المنطق:\n' +
    '• فوري → تاريخ الحركة\n' +
    '• بعد التسليم → تاريخ التسليم + أسابيع\n' +
    '• تاريخ مخصص → العمود T\n\n' +
    '📊 عدد الصفوف: ' + (lastRow - 1),
    ui.ButtonSet.OK
  );
}

/**
 * تحديث شامل للأعمدة المحسوبة: M (القيمة بالدولار), O (الرصيد), U (تاريخ الاستحقاق), V (حالة السداد)
 * هذه الدالة تحسب القيم وتكتبها مباشرة (بدون معادلات) لحماية البيانات من أخطاء المستخدمين
 */
function refreshValueAndBalanceFormulas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  const ui = SpreadsheetApp.getUi();

  if (!sheet) {
    ui.alert('❌ لم يتم العثور على شيت "دفتر الحركات المالية"');
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('⚠️ لا توجد بيانات في الشيت');
    return;
  }

  // جلب بيانات المشاريع (للحصول على تواريخ التسليم)
  const projectDeliveryDates = {};
  if (projectsSheet) {
    const projectData = projectsSheet.getRange('A2:K200').getValues();
    for (let i = 0; i < projectData.length; i++) {
      const code = projectData[i][0];
      const deliveryDate = projectData[i][10]; // K: تاريخ التسليم المتوقع
      if (code && deliveryDate instanceof Date) {
        projectDeliveryDates[code] = deliveryDate;
      }
    }
  }

  // قراءة كل البيانات المطلوبة مرة واحدة
  // A=1, B=2, E=5, I=9, J=10, K=11, L=12, N=14, R=18, S=19, T=20
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 20); // A to T
  const data = dataRange.getValues();

  const valuesM = [];  // القيمة بالدولار (M) - column 13
  const valuesO = [];  // الرصيد (O) - column 15
  const valuesU = [];  // تاريخ الاستحقاق (U) - column 21
  const valuesV = [];  // حالة السداد (V) - column 22

  // لتتبع الأرصدة التراكمية لكل طرف
  const partyBalances = {};

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const dateVal = row[1];                    // B: تاريخ الحركة (index 1)
    const projectCode = row[4];                // E: كود المشروع (index 4)
    const party = String(row[8] || '').trim(); // I: الطرف (index 8)
    const amount = Number(row[9]) || 0;        // J: المبلغ (index 9)
    const currency = String(row[10] || '').trim().toUpperCase(); // K: العملة (index 10)
    const exchangeRate = Number(row[11]) || 0; // L: سعر الصرف (index 11)
    const movementKind = String(row[13] || '').trim(); // N: نوع الحركة (index 13)
    const paymentTermType = String(row[17] || '').trim(); // R: نوع شرط الدفع (index 17)
    const weeks = Number(row[18]) || 0;        // S: عدد الأسابيع (index 18)
    const customDate = row[19];                // T: تاريخ مخصص (index 19)

    // ═══════════════════════════════════════════════════════════
    // 1. حساب القيمة بالدولار (M)
    // ⚠️ إذا كانت العملة غير دولار ولا يوجد سعر صرف = ترك الخلية فارغة
    // ═══════════════════════════════════════════════════════════
    let amountUsd = 0;
    let hasValidConversion = true;
    if (amount > 0) {
      // حالة 1: العملة دولار أو فارغة (افتراضي دولار)
      if (currency === 'USD' || currency === 'دولار' || currency === '') {
        amountUsd = amount;
      }
      // حالة 2: عملة أخرى مع سعر صرف صحيح
      else if (exchangeRate > 0) {
        amountUsd = amount / exchangeRate;
      }
      // حالة 3: عملة أخرى بدون سعر صرف = ترك فارغ (⚠️ يحتاج إدخال سعر الصرف)
      else {
        hasValidConversion = false;
      }
    }
    valuesM.push([hasValidConversion && amountUsd > 0 ? Math.round(amountUsd * 100) / 100 : '']);

    // ═══════════════════════════════════════════════════════════
    // 2. حساب الرصيد (O) وحالة السداد (V)
    // ═══════════════════════════════════════════════════════════
    let balance = '';
    let status = '';

    if (party && amountUsd > 0) {
      if (!partyBalances[party]) {
        partyBalances[party] = 0;
      }

      if (movementKind === 'مدين استحقاق') {
        partyBalances[party] += amountUsd;
      } else if (movementKind === 'دائن دفعة') {
        partyBalances[party] -= amountUsd;
      }

      balance = Math.round(partyBalances[party] * 100) / 100;

      // حساب حالة السداد (باستخدام CONFIG.PAYMENT_STATUS للتوحيد)
      if (movementKind === 'دائن دفعة') {
        status = CONFIG.PAYMENT_STATUS.OPERATION; // 'عملية دفع/تحصيل'
      } else if (balance > 0.01) {
        status = CONFIG.PAYMENT_STATUS.PENDING; // 'معلق'
      } else {
        status = CONFIG.PAYMENT_STATUS.PAID; // 'مدفوع بالكامل'
      }
    }
    valuesO.push([balance]);
    valuesV.push([status]);

    // ═══════════════════════════════════════════════════════════
    // 3. حساب تاريخ الاستحقاق (U)
    // ═══════════════════════════════════════════════════════════
    let dueDate = '';

    if (movementKind === 'مدين استحقاق' && paymentTermType) {
      if (paymentTermType === 'فوري') {
        dueDate = dateVal;
      } else if (paymentTermType === 'بعد التسليم' && projectCode) {
        const deliveryDate = projectDeliveryDates[projectCode];
        if (deliveryDate) {
          const newDate = new Date(deliveryDate);
          newDate.setDate(newDate.getDate() + (weeks * 7));
          dueDate = newDate;
        }
      } else if (paymentTermType === 'تاريخ مخصص' && customDate) {
        dueDate = customDate;
      }
    }
    valuesU.push([dueDate]);
  }

  const numRows = lastRow - 1;

  // كتابة كل القيم دفعة واحدة (بدون معادلات)
  sheet.getRange(2, 13, numRows, 1).setValues(valuesM);  // M: القيمة بالدولار
  sheet.getRange(2, 15, numRows, 1).setValues(valuesO);  // O: الرصيد
  sheet.getRange(2, 21, numRows, 1).setValues(valuesU);  // U: تاريخ الاستحقاق
  sheet.getRange(2, 22, numRows, 1).setValues(valuesV);  // V: حالة السداد

  // تنسيقات
  sheet.getRange(2, 13, numRows, 1).setNumberFormat('#,##0.00');  // M
  sheet.getRange(2, 15, numRows, 1).setNumberFormat('#,##0.00');  // O
  sheet.getRange(2, 21, numRows, 1).setNumberFormat('dd/mm/yyyy'); // U

  ui.alert(
    '✅ تم التحديث الشامل للأعمدة المحسوبة',
    'تم حساب وكتابة القيم (بدون معادلات) في:\n\n' +
    '• M - القيمة بالدولار: المبلغ ÷ سعر الصرف (أو نفسه للدولار)\n' +
    '   ⚠️ إذا كانت العملة غير دولار ولا يوجد سعر صرف = ترك فارغ\n' +
    '• O - الرصيد: مدين استحقاق - دائن دفعة لكل طرف\n' +
    '• U - تاريخ الاستحقاق: حسب نوع شرط الدفع\n' +
    '• V - حالة السداد: معلق / مدفوع بالكامل / عملية دفع/تحصيل\n\n' +
    '⚡ الحسابات تتم تلقائياً عند تعديل البيانات (onEdit)\n\n' +
    '📊 عدد الصفوف المحدثة: ' + numRows,
    ui.ButtonSet.OK
  );
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
  
  /**
   * ⚡ تحسينات الأداء:
   * - Batch Operations: 2 API calls بدلاً من 198 (99×2)
   */
  const numRows = 99;
  const formulasA = [];  // كود المشروع
  const formulasM = [];  // المدة (أسابيع)

  for (let row = 2; row <= 100; row++) {
    // كود المشروع (A)
    formulasA.push([
      `=IF(OR(D${row}="",E${row}="",F${row}=""),"",` +
      `UPPER(LEFT(D${row},2))&"-"&UPPER(LEFT(E${row},2))&"-"&` +
      `RIGHT(F${row},2)&"-"&TEXT(COUNTIFS($D$2:D${row},D${row},$E$2:E${row},E${row},$F$2:F${row},F${row}),"000"))`
    ]);
    // المدة بالأسابيع (M - column 13)
    formulasM.push([
      `=IF(OR(J${row}="",K${row}=""),"",ROUND((K${row}-J${row})/7,1))`
    ]);
  }

  // Batch apply formulas
  sheet.getRange(2, 1, numRows, 1).setFormulas(formulasA);
  sheet.getRange(2, 13, numRows, 1).setFormulas(formulasM);
  
  // تنسيق
  sheet.getRange(2, 8, 200, 2).setNumberFormat('$#,##0.00');
  sheet.getRange(2, 10, 200, 1).setNumberFormat('dd/mm/yyyy'); // J - تاريخ البدء
  sheet.getRange(2, 11, 200, 1).setNumberFormat('dd/mm/yyyy'); // K - تاريخ التسليم المتوقع
  sheet.getRange(2, 12, 200, 1).setNumberFormat('dd/mm/yyyy'); // L - تاريخ التسليم الفعلي
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
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.PARTIES, true);

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
  const widths = [200, 140, 160, 140, 220, 160, 170, 260, 260];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.PARTIES);

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
  
  sheet.getRange('A1').setNote(
    'قاعدة موحدة لكل الأطراف (موردين / عملاء / ممولين)\n' +
    'يتم الربط مع دفتر الحركات من عمود "اسم المورد/الجهة".'
  );
}


// ==================== 4. قاعدة بيانات البنود (مدمجة) ====================
function createItemsSheet(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.ITEMS, true);

  const headers = [
    'البند',           // A
    'طبيعة الحركة',    // B
    'تصنيف الحركة',    // C
    'ملاحظات'          // D
  ];
  const widths = [200, 180, 180, 250];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.ITEMS);

  // البيانات التجريبية
  const sampleData = [
    ['مونتاج',           'استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['تصوير',            'استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['صوت',              'استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['معدات',            'استحقاق مصروف', 'مصروفات مباشرة', ''],
    ['🏢 إيجار مكتب',    'استحقاق مصروف', 'مصروفات عمومية', ''],
    ['👥 مرتبات إدارية', 'استحقاق مصروف', 'مصروفات عمومية', ''],
    ['⚡ مرافق',          'استحقاق مصروف', 'مصروفات عمومية', ''],
    ['🧾 أخرى',          'استحقاق مصروف', 'مصروفات أخرى',   '']
  ];
  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);

  // ملاحظات الأعمدة
  sheet.getRange('B1').setNote(
    'طبيعة الحركة (مثال):\n' +
    'استحقاق مصروف / دفعة مصروف / استحقاق إيراد / تحصيل إيراد / تمويل / سداد تمويل'
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

  /**
   * ⚡ تحسينات الأداء:
   * - Batch Operations: 4 API calls بدلاً من 396 (99×4)
   * - نطاقات محددة بدل أعمدة كاملة (M2:M1000 بدل M:M)
   */
  const numRows = 99;
  const formulasB = [];  // اسم المشروع
  const formulasE = [];  // المبلغ الفعلي
  const formulasF = [];  // الفرق
  const formulasG = [];  // نسبة التنفيذ

  for (let row = 2; row <= 100; row++) {
    // اسم المشروع من كود المشروع (B)
    formulasB.push([
      `=IFERROR(VLOOKUP(A${row},'قاعدة بيانات المشاريع'!A2:B200,2,FALSE),"")`
    ]);
    // المبلغ الفعلي = مجموع القيمة بالدولار من دفتر الحركات (مدين استحقاق فقط) (E)
    formulasE.push([
      `=SUMIFS('دفتر الحركات المالية'!M2:M1000,` +
      `'دفتر الحركات المالية'!E2:E1000,A${row},` +
      `'دفتر الحركات المالية'!G2:G1000,C${row},` +
      `'دفتر الحركات المالية'!N2:N1000,"مدين استحقاق")`
    ]);
    // الفرق (F)
    formulasF.push([`=IF(D${row}="","",D${row}-E${row})`]);
    // نسبة التنفيذ (G)
    formulasG.push([`=IF(D${row}=0,"",E${row}/D${row})`]);
  }

  // Batch apply formulas
  sheet.getRange(2, 2, numRows, 1).setFormulas(formulasB);
  sheet.getRange(2, 5, numRows, 1).setFormulas(formulasE);
  sheet.getRange(2, 6, numRows, 1).setFormulas(formulasF);
  sheet.getRange(2, 7, numRows, 1).setFormulas(formulasG);
  
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
  sheet.getRange(lastRow, 3).setValue('دفعة مصروف');  // C طبيعة الحركة
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
    '• طبيعة الحركة = "تحصيل إيراد" (C)\n' +
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


// ==================== التنبيهات والاستحقاقات (محدث: مدين + دائن + أرصدة) ====================
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

  // تجميع أرصدة الأطراف لتنبيهات التحصيل
  const partyBalances = {};

  for (let i = 1; i < data.length; i++) {
    const movementKind = String(data[i][13] || ''); // N: نوع الحركة (مدين استحقاق / دائن دفعة)
    const project      = data[i][5];  // F: اسم المشروع
    const party        = data[i][8];  // I: الطرف (مورد/عميل/ممول)
    const amountUsd    = Number(data[i][12]) || 0; // M: القيمة بالدولار
    const dueDate      = data[i][20]; // U: تاريخ الاستحقاق
    const status       = String(data[i][21] || ''); // V: حالة السداد
    const natureType   = String(data[i][2] || '');  // C: طبيعة الحركة

    // استخدام includes للتعامل مع الإيموجي
    const isDebit = movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين');
    const isCredit = movementKind.includes(CONFIG.MOVEMENT.CREDIT) || movementKind.includes('دائن');
    const isPaid = status.includes(CONFIG.PAYMENT_STATUS.PAID) || status.includes('مدفوع');

    // تجميع أرصدة الأطراف
    if (party && amountUsd > 0) {
      if (!partyBalances[party]) {
        partyBalances[party] = { debit: 0, credit: 0, nature: natureType, project: project };
      }
      if (isDebit) {
        partyBalances[party].debit += amountUsd;
      } else if (isCredit) {
        partyBalances[party].credit += amountUsd;
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 1. تنبيهات الاستحقاقات المدينة (فواتير يجب سدادها)
    // ═══════════════════════════════════════════════════════════
    if (isDebit && amountUsd > 0 && dueDate && !isPaid) {
      const dueDateObj = new Date(dueDate);
      const daysLeft = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));

      let priority, alertType, action;

      if (daysLeft < 0) {
        priority = '🔴 عاجل';
        alertType = '💸 استحقاق متأخر';
        action = 'سداد فوري';
      } else if (daysLeft <= 3) {
        priority = '🟠 مهم';
        alertType = '💸 استحقاق قريب';
        action = 'تجهيز المبلغ';
      } else if (daysLeft <= 7) {
        priority = '🟡 متوسط';
        alertType = '💸 استحقاق قادم';
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
        Utilities.formatDate(dueDateObj, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
        daysLeft + ' يوم',
        status || 'معلق',
        action
      ]);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 2. تنبيهات الأرصدة المستحقة التحصيل (إيرادات لم تُحصّل)
  // ═══════════════════════════════════════════════════════════
  for (const party in partyBalances) {
    const balance = partyBalances[party].debit - partyBalances[party].credit;

    // إذا كان الرصيد موجب (على الطرف لنا فلوس) وطبيعة الحركة إيرادية
    if (balance > 100 && partyBalances[party].nature &&
        (partyBalances[party].nature.includes('إيراد') || partyBalances[party].nature.includes('تحصيل'))) {
      alerts.push([
        '💰 تحصيل مستحق',
        '🟣 متابعة',
        partyBalances[party].project || '-',
        party,
        balance,
        '-',
        '-',
        'رصيد مستحق',
        'متابعة التحصيل'
      ]);
    }
  }

  if (alerts.length > 0) {
    // ترتيب: الاستحقاقات المتأخرة أولاً
    alerts.sort((a, b) => {
      // الأولوية: عاجل > مهم > متوسط > متابعة
      const priorityOrder = { '🔴 عاجل': 1, '🟠 مهم': 2, '🟡 متوسط': 3, '🟣 متابعة': 4 };
      return (priorityOrder[a[1]] || 5) - (priorityOrder[b[1]] || 5);
    });
    alertSheet.getRange(2, 1, alerts.length, headers.length).setValues(alerts);

    // تلوين الصفوف حسب الأولوية
    for (let i = 0; i < alerts.length; i++) {
      let bgColor = '#ffffff';
      if (alerts[i][1] === '🔴 عاجل') bgColor = '#ffcdd2';
      else if (alerts[i][1] === '🟠 مهم') bgColor = '#ffe0b2';
      else if (alerts[i][1] === '🟡 متوسط') bgColor = '#fff9c4';
      else if (alerts[i][1] === '🟣 متابعة') bgColor = '#e1bee7';

      alertSheet.getRange(i + 2, 1, 1, headers.length).setBackground(bgColor);
    }
  }

  // إحصائيات
  const urgentCount = alerts.filter(a => a[1] === '🔴 عاجل').length;
  const importantCount = alerts.filter(a => a[1] === '🟠 مهم').length;
  const collectCount = alerts.filter(a => a[0] === '💰 تحصيل مستحق').length;

  SpreadsheetApp.getUi().alert(
    '✅ تم تحديث التنبيهات!\n\n' +
    '📊 الإحصائيات:\n' +
    '• 🔴 عاجل: ' + urgentCount + '\n' +
    '• 🟠 مهم: ' + importantCount + '\n' +
    '• 💰 تحصيلات مستحقة: ' + collectCount + '\n\n' +
    '📝 إجمالي التنبيهات: ' + alerts.length
  );
}

// ==================== تقرير الاستحقاقات الشامل ====================
/**
 * إنشاء تقرير استحقاقات شامل يتضمن:
 * - الاستحقاقات المدينة (فواتير يجب سدادها)
 * - الإيرادات المستحقة التحصيل
 * - ملخص حسب الفترة الزمنية
 */
function generateDueReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  const ui = SpreadsheetApp.getUi();

  if (!transSheet) {
    ui.alert('⚠️ شيت دفتر الحركات غير موجود!');
    return;
  }

  const data = transSheet.getDataRange().getValues();
  const today = new Date();

  // تصنيف الاستحقاقات
  const overdue = [];      // متأخرة
  const thisWeek = [];     // هذا الأسبوع
  const thisMonth = [];    // هذا الشهر
  const later = [];        // لاحقاً

  let totalOverdue = 0;
  let totalThisWeek = 0;
  let totalThisMonth = 0;
  let totalLater = 0;

  // تجميع أرصدة الأطراف للتحصيلات
  const partyBalances = {};

  for (let i = 1; i < data.length; i++) {
    const movementKind = String(data[i][13] || ''); // N
    const party = data[i][8];         // I
    const project = data[i][5];       // F
    const amountUsd = Number(data[i][12]) || 0; // M
    const dueDate = data[i][20];      // U
    const status = String(data[i][21] || '');       // V
    const natureType = String(data[i][2] || '');    // C

    // تجميع الأرصدة - استخدام includes للتعامل مع الإيموجي
    if (party && amountUsd > 0) {
      if (!partyBalances[party]) {
        partyBalances[party] = { debit: 0, credit: 0, nature: natureType, project: project };
      }
      if (movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين')) {
        partyBalances[party].debit += amountUsd;
      } else if (movementKind.includes(CONFIG.MOVEMENT.CREDIT) || movementKind.includes('دائن')) {
        partyBalances[party].credit += amountUsd;
      }
    }

    // الاستحقاقات المدينة
    const isDebit = movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين');
    const isPaid = status.includes(CONFIG.PAYMENT_STATUS.PAID) || status.includes('مدفوع');
    if (isDebit && amountUsd > 0 && dueDate && !isPaid) {
      const dueDateObj = new Date(dueDate);
      const daysLeft = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
      const item = { party, project, amount: amountUsd, dueDate: dueDateObj, daysLeft };

      if (daysLeft < 0) {
        overdue.push(item);
        totalOverdue += amountUsd;
      } else if (daysLeft <= 7) {
        thisWeek.push(item);
        totalThisWeek += amountUsd;
      } else if (daysLeft <= 30) {
        thisMonth.push(item);
        totalThisMonth += amountUsd;
      } else {
        later.push(item);
        totalLater += amountUsd;
      }
    }
  }

  // حساب التحصيلات المستحقة
  let totalReceivables = 0;
  const receivables = [];
  for (const party in partyBalances) {
    const balance = partyBalances[party].debit - partyBalances[party].credit;
    if (balance > 100 && partyBalances[party].nature &&
        (partyBalances[party].nature.includes('إيراد') || partyBalances[party].nature.includes('تحصيل'))) {
      receivables.push({ party, amount: balance, project: partyBalances[party].project });
      totalReceivables += balance;
    }
  }

  // بناء التقرير
  let report = '═══════════════════════════════════════════\n';
  report += '📊 تقرير الاستحقاقات الشامل\n';
  report += '📅 ' + Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy') + '\n';
  report += '═══════════════════════════════════════════\n\n';

  // 1. الاستحقاقات المتأخرة
  report += '🔴 الاستحقاقات المتأخرة (' + overdue.length + ')\n';
  report += '────────────────────────────────────────\n';
  if (overdue.length > 0) {
    overdue.sort((a, b) => a.daysLeft - b.daysLeft);
    overdue.slice(0, 5).forEach(item => {
      report += `• ${item.party}: $${item.amount.toLocaleString()} (متأخر ${Math.abs(item.daysLeft)} يوم)\n`;
    });
    if (overdue.length > 5) report += `  ... و ${overdue.length - 5} أخرى\n`;
  } else {
    report += '  لا يوجد استحقاقات متأخرة ✅\n';
  }
  report += `💰 الإجمالي: $${totalOverdue.toLocaleString()}\n\n`;

  // 2. استحقاقات هذا الأسبوع
  report += '🟠 استحقاقات هذا الأسبوع (' + thisWeek.length + ')\n';
  report += '────────────────────────────────────────\n';
  if (thisWeek.length > 0) {
    thisWeek.slice(0, 5).forEach(item => {
      report += `• ${item.party}: $${item.amount.toLocaleString()} (${item.daysLeft} يوم)\n`;
    });
    if (thisWeek.length > 5) report += `  ... و ${thisWeek.length - 5} أخرى\n`;
  } else {
    report += '  لا يوجد استحقاقات هذا الأسبوع ✅\n';
  }
  report += `💰 الإجمالي: $${totalThisWeek.toLocaleString()}\n\n`;

  // 3. استحقاقات هذا الشهر
  report += '🟡 استحقاقات هذا الشهر (' + thisMonth.length + ')\n';
  report += '────────────────────────────────────────\n';
  report += `💰 الإجمالي: $${totalThisMonth.toLocaleString()}\n\n`;

  // 4. التحصيلات المستحقة
  report += '💰 إيرادات مستحقة التحصيل (' + receivables.length + ')\n';
  report += '────────────────────────────────────────\n';
  if (receivables.length > 0) {
    receivables.slice(0, 5).forEach(item => {
      report += `• ${item.party}: $${item.amount.toLocaleString()}\n`;
    });
    if (receivables.length > 5) report += `  ... و ${receivables.length - 5} أخرى\n`;
  } else {
    report += '  لا يوجد إيرادات مستحقة ✅\n';
  }
  report += `💰 الإجمالي: $${totalReceivables.toLocaleString()}\n\n`;

  // الملخص
  report += '═══════════════════════════════════════════\n';
  report += '📈 الملخص المالي\n';
  report += '═══════════════════════════════════════════\n';
  report += `💸 إجمالي الاستحقاقات: $${(totalOverdue + totalThisWeek + totalThisMonth + totalLater).toLocaleString()}\n`;
  report += `💰 إجمالي التحصيلات المستحقة: $${totalReceivables.toLocaleString()}\n`;
  report += `📊 صافي الموقف: $${(totalReceivables - totalOverdue - totalThisWeek - totalThisMonth - totalLater).toLocaleString()}\n`;

  ui.alert(report);
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
    const movementKind = String(transData[i][13] || '');  // N: نوع الحركة
    const status       = String(transData[i][21] || '');  // V: حالة السداد
    const dueDate      = transData[i][20];  // U: تاريخ الاستحقاق
    const balance      = Number(transData[i][14]) || 0; // O: الرصيد (بالدولار على مستوى الطرف)
    const party        = transData[i][8];   // I: الطرف
    const project      = transData[i][5];   // F: اسم المشروع

    // استخدام includes للتعامل مع الإيموجي
    const isDebit = movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين');
    const isPaid = status.includes(CONFIG.PAYMENT_STATUS.PAID) || status.includes('مدفوع');
    if (isDebit && balance > 0 && dueDate && !isPaid) {
      const dueDateObj = new Date(dueDate);
      if (dueDateObj <= next30Days) {
        const daysLeft = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
        upcomingPayments.push({
          party: party,
          project: project,
          amount: balance, // رصيد الطرف بالدولار
          dueDate: Utilities.formatDate(dueDateObj, Session.getScriptTimeZone(), 'dd/MM/yyyy'),
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
    // استخدام includes للتعامل مع الإيموجي
    const kindStr = String(row.movementKind || '');
    if (kindStr.includes(CONFIG.MOVEMENT.DEBIT) || kindStr.includes('مدين')) {
      totalDebitUsd += row.amountUsd;
    } else if (kindStr.includes(CONFIG.MOVEMENT.CREDIT) || kindStr.includes('دائن')) {
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
      ? Utilities.formatDate(new Date(row.date), Session.getScriptTimeZone(), 'dd/MM/yyyy')
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
    
    // استخدام includes للتعامل مع الإيموجي
    const kindStr2 = String(row.movementKind || '');
    if (kindStr2.includes(CONFIG.MOVEMENT.DEBIT) || kindStr2.includes('مدين')) {
      report += `   مدين (استحقاق): ${amountText}\n`;
    } else if (kindStr2.includes(CONFIG.MOVEMENT.CREDIT) || kindStr2.includes('دائن')) {
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
      ? Utilities.formatDate(new Date(row.date), Session.getScriptTimeZone(), 'dd/MM/yyyy')
      : '';
    
    statement += `${dateStr} | ${row.movementType}\n`;

    // استخدام includes للتعامل مع الإيموجي
    const kindStr = String(row.movementKind || '');
    if (kindStr.includes(CONFIG.MOVEMENT.DEBIT) || kindStr.includes('مدين')) {
      statement += `         مدين (استحقاق): $${row.amountUsd.toLocaleString()}\n`;
    } else if (kindStr.includes(CONFIG.MOVEMENT.CREDIT) || kindStr.includes('دائن')) {
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
      const movementType   = String(transData[i][2] || '');  // C: طبيعة الحركة (قد تحتوي على إيموجي)
      const classification = String(transData[i][3] || '');  // D: تصنيف الحركة
      const movementKind   = String(transData[i][13] || ''); // N: نوع الحركة
      const amountUsd      = Number(transData[i][12]) || 0; // M: القيمة بالدولار

      // استخدام includes للتعامل مع الإيموجي
      const isDebit = movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين');
      const isCredit = movementKind.includes(CONFIG.MOVEMENT.CREDIT) || movementKind.includes('دائن');

      // مصروفات مباشرة/عمومية (استحقاق فقط)
      if (isDebit && classification.includes('مصروفات مباشرة')) {
        directExpenses += amountUsd;
      }
      if (isDebit && classification.includes('مصروفات عمومية')) {
        overheadExpenses += amountUsd;
      }

      // إيرادات محصّلة (نقدية) = تحصيل إيراد + نوع الحركة دائن دفعة
      if (movementType.includes('تحصيل إيراد') && isCredit) {
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
    '   • طبيعة الحركة: مثل استحقاق مصروف / دفعة مصروف / استحقاق إيراد / تحصيل إيراد\n' +
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

    // 🆕 اسم المشروع في دفتر الحركات (F)
    // أولاً: تحويل المعادلات القديمة إلى قيم نصية (إزالة VLOOKUP formulas)
    const colF = transSheet.getRange(2, 6, lastRow, 1);
    const colFValues = colF.getValues();
    colF.setValues(colFValues); // تحويل المعادلات إلى قيم

    // ثانياً: إضافة الـ dropdown
    const projectNameRange = projectsSheet.getRange('B2:B200');
    const projectNameValidation = SpreadsheetApp.newDataValidation()
      .requireValueInRange(projectNameRange, true)
      .setAllowInvalid(true)
      .setHelpText('اختر اسم المشروع - سيتم ملء كود المشروع تلقائياً')
      .build();
    colF.setDataValidation(projectNameValidation); // F
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

/**
 * تنظيف الايقونات من عمود طبيعة الحركة (C) في البيانات الموجودة
 */
function cleanupNatureTypeEmojis() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('⚠️ شيت دفتر الحركات المالية غير موجود!');
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    ui.alert('لا توجد بيانات للتحديث');
    return;
  }

  // قراءة عمود C (طبيعة الحركة)
  const range = sheet.getRange(2, 3, lastRow - 1, 1);
  const values = range.getValues();

  // خريطة الاستبدال
  const emojiMap = {
    '💰 استحقاق مصروف': 'استحقاق مصروف',
    '💸 دفعة مصروف': 'دفعة مصروف',
    '📈 استحقاق إيراد': 'استحقاق إيراد',
    '✅ تحصيل إيراد': 'تحصيل إيراد',
    '🏦 تمويل': 'تمويل',
    '💳 سداد تمويل': 'سداد تمويل'
  };

  let updatedCount = 0;

  for (let i = 0; i < values.length; i++) {
    const oldValue = values[i][0];
    if (oldValue && emojiMap[oldValue]) {
      values[i][0] = emojiMap[oldValue];
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    range.setValues(values);
    ui.alert('✅ تم تحديث ' + updatedCount + ' خلية في عمود طبيعة الحركة');
  } else {
    ui.alert('لا توجد خلايا تحتاج تحديث');
  }
}

/**
 * تطبيع التواريخ في جميع الشيتات
 * - دفتر الحركات المالية: أعمدة B و T
 * - قاعدة بيانات المشاريع: أعمدة J و K
 * تحويل النصوص إلى Date objects وضبط التنسيق إلى dd/MM/yyyy
 */
function normalizeDateColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // تأكيد من المستخدم
  const response = ui.alert(
    '📅 تطبيع التواريخ',
    'سيتم تحويل جميع التواريخ إلى صيغة موحدة (dd/MM/yyyy)\n\n' +
    'الشيتات المشمولة:\n' +
    '• دفتر الحركات المالية: أعمدة B و T\n' +
    '• قاعدة بيانات المشاريع: أعمدة J و K\n\n' +
    'هذا سيصلح:\n' +
    '• التواريخ المكتوبة كنصوص\n' +
    '• التواريخ بفواصل مختلفة (/ . -)\n\n' +
    'هل تريد المتابعة؟',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  let results = [];

  // ═══════════════════════════════════════════════════════════
  // 1. دفتر الحركات المالية
  // ═══════════════════════════════════════════════════════════
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);
  if (transSheet && transSheet.getLastRow() > 1) {
    const lastRow = transSheet.getLastRow();

    // عمود B (التاريخ)
    const updatedB = normalizeColumnDates_(transSheet, 2, lastRow);

    // عمود T (تاريخ مخصص)
    const updatedT = normalizeColumnDates_(transSheet, 20, lastRow);

    results.push('دفتر الحركات المالية:');
    results.push('  • عمود B (التاريخ): ' + updatedB + ' خلية');
    results.push('  • عمود T (تاريخ مخصص): ' + updatedT + ' خلية');
  }

  // ═══════════════════════════════════════════════════════════
  // 2. قاعدة بيانات المشاريع
  // ═══════════════════════════════════════════════════════════
  const projSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  if (projSheet && projSheet.getLastRow() > 1) {
    const lastRow = projSheet.getLastRow();

    // عمود J (تاريخ البدء)
    const updatedJ = normalizeColumnDates_(projSheet, 10, lastRow);

    // عمود K (تاريخ التسليم المتوقع)
    const updatedK = normalizeColumnDates_(projSheet, 11, lastRow);

    results.push('');
    results.push('قاعدة بيانات المشاريع:');
    results.push('  • عمود J (تاريخ البدء): ' + updatedJ + ' خلية');
    results.push('  • عمود K (تاريخ التسليم المتوقع): ' + updatedK + ' خلية');
  }

  ui.alert(
    '✅ تم تطبيع التواريخ!',
    results.join('\n') + '\n\nتم ضبط تنسيق جميع الأعمدة إلى dd/MM/yyyy',
    ui.ButtonSet.OK
  );
}

/**
 * تطبيع عمود تاريخ معين
 * @param {Sheet} sheet - الشيت
 * @param {number} col - رقم العمود
 * @param {number} lastRow - آخر صف
 * @returns {number} عدد الخلايا المحدثة
 */
function normalizeColumnDates_(sheet, col, lastRow) {
  const range = sheet.getRange(2, col, lastRow - 1, 1);
  const values = range.getValues();
  let updated = 0;

  for (let i = 0; i < values.length; i++) {
    const val = values[i][0];
    if (!val) continue;
    if (val instanceof Date) continue;

    if (typeof val === 'string') {
      const parseResult = parseDateInput_(val.trim());
      if (parseResult.success) {
        values[i][0] = parseResult.dateObj;
        updated++;
      }
    }
  }

  if (updated > 0) {
    range.setValues(values);
  }
  range.setNumberFormat('dd/mm/yyyy');

  return updated;
}

/**
 * إصلاح جميع الـ dropdowns في دفتر الحركات المالية
 * يُستخدم لإعادة تطبيق القوائم المنسدلة على الأعمدة
 */
function fixAllDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('⚠️ شيت دفتر الحركات المالية غير موجود!');
    return;
  }

  const lastRow = Math.max(sheet.getLastRow(), 500);

  // نوع الحركة (N = 14)
  const movementValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.MOVEMENT.TYPES, true)
    .setAllowInvalid(true)
    .build();
  sheet.getRange(2, 14, lastRow, 1).setDataValidation(movementValidation);

  // العملة (K = 11)
  const currencyValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.CURRENCIES.LIST, true)
    .setAllowInvalid(true)
    .build();
  sheet.getRange(2, 11, lastRow, 1).setDataValidation(currencyValidation);

  // طريقة الدفع (Q = 17)
  const payMethodValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['نقدي', 'تحويل بنكي', 'شيك', 'بطاقة', 'أخرى'])
    .setAllowInvalid(true)
    .build();
  sheet.getRange(2, 17, lastRow, 1).setDataValidation(payMethodValidation);

  // نوع شرط الدفع (R = 18)
  const termValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.PAYMENT_TERMS.LIST)
    .setAllowInvalid(true)
    .build();
  sheet.getRange(2, 18, lastRow, 1).setDataValidation(termValidation);

  // عدد الأسابيع (S = 19) - validation للأرقام فقط 0-52
  const weeksValidation = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(0, 52)
    .setAllowInvalid(false)
    .setHelpText('أدخل عدد الأسابيع (0-52) - يُستخدم مع شرط "بعد التسليم"')
    .build();
  sheet.getRange(2, 19, lastRow, 1).setDataValidation(weeksValidation);

  // تعيين القيمة الافتراضية 0 للخلايا الفارغة في عمود S
  const weeksRange = sheet.getRange(2, 19, lastRow, 1);
  const weeksValues = weeksRange.getValues();
  let fixedCount = 0;
  for (let i = 0; i < weeksValues.length; i++) {
    if (weeksValues[i][0] === '' || weeksValues[i][0] === null) {
      weeksValues[i][0] = 0;
      fixedCount++;
    }
  }
  if (fixedCount > 0) {
    weeksRange.setValues(weeksValues);
  }

  ui.alert(
    '✅ تم إصلاح القوائم المنسدلة!',
    'تم تطبيق الـ dropdowns والـ validations على:\n\n' +
    '• عمود N (نوع الحركة)\n' +
    '• عمود K (العملة)\n' +
    '• عمود Q (طريقة الدفع)\n' +
    '• عمود R (نوع شرط الدفع)\n' +
    '• عمود S (عدد الأسابيع) - أرقام 0-52\n\n' +
    'تم تصحيح ' + fixedCount + ' خلية فارغة في عمود S\n' +
    'عدد الصفوف: ' + lastRow,
    ui.ButtonSet.OK
  );
}


// ==================== إضافة عمود كشف الحساب للشيت الحالي ====================
/**
 * إضافة عمود "📄 كشف" (Y) لدفتر الحركات الحالي
 * يضيف العمود ويملأه بالرمز 📄 لكل صف فيه بيانات
 */
function addStatementLinkColumn() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // التحقق من وجود العمود مسبقاً
  const currentHeader = sheet.getRange(1, 25).getValue();
  if (currentHeader === '📄 كشف') {
    // العمود موجود، نسأل المستخدم إذا يريد إعادة ملء الرموز
    const response = ui.alert(
      '📄 عمود موجود',
      'عمود "📄 كشف" موجود بالفعل.\n\nهل تريد إعادة ملء الرموز 📄 في جميع الصفوف؟',
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) return;
  } else {
    // إضافة العنوان
    sheet.getRange(1, 25)
      .setValue('📄 كشف')
      .setBackground('#4a86e8')
      .setFontColor('white')
      .setFontWeight('bold')
      .setHorizontalAlignment('center');

    // تعيين عرض العمود
    sheet.setColumnWidth(25, 60);
  }

  // ملء العمود بالرمز 📄 لكل صف فيه بيانات
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('✅ تم', 'تم إضافة عمود "📄 كشف".\n\nلا توجد بيانات لملء الرموز.', ui.ButtonSet.OK);
    return;
  }

  // قراءة عمود التاريخ (B) لمعرفة الصفوف التي فيها بيانات
  const dates = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  const icons = [];

  for (let i = 0; i < dates.length; i++) {
    // إذا كان هناك تاريخ، نضع الرمز
    if (dates[i][0]) {
      icons.push(['📄']);
    } else {
      icons.push(['']);
    }
  }

  // كتابة الرموز دفعة واحدة
  sheet.getRange(2, 25, lastRow - 1, 1).setValues(icons);

  // تنسيق العمود
  sheet.getRange(2, 25, lastRow - 1, 1)
    .setHorizontalAlignment('center')
    .setFontSize(12);

  // إحصائية
  const filledCount = icons.filter(row => row[0] === '📄').length;

  ui.alert(
    '✅ تم بنجاح',
    'تم إضافة عمود "📄 كشف" (Y) لدفتر الحركات.\n\n' +
    '• عدد الصفوف التي تم ملؤها: ' + filledCount + '\n\n' +
    '📌 طريقة الاستخدام:\n' +
    'اضغط على خلية 📄 في أي صف → سيتم إنشاء كشف حساب للطرف تلقائياً',
    ui.ButtonSet.OK
  );
}

// ==================== إضافة عمود كشف الحساب لتقرير الموردين الموجود ====================
/**
 * إضافة عمود "📄 كشف" لتقرير الموردين الموجود
 * يسمح بإنشاء كشف حساب للمورد بضغطة واحدة
 */
function addStatementColumnToVendorReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.VENDORS_REPORT);

  if (!sheet) {
    ui.alert('❌ خطأ', 'شيت "تقرير الموردين" غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // التحقق من وجود العمود مسبقاً
  const currentHeader = sheet.getRange(1, 10).getValue();
  if (currentHeader === '📄 كشف') {
    // العمود موجود، نسأل المستخدم إذا يريد إعادة ملء الرموز
    const response = ui.alert(
      '📄 عمود موجود',
      'عمود "📄 كشف" موجود بالفعل.\n\nهل تريد إعادة ملء الرموز 📄 في جميع الصفوف؟',
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) return;
  } else {
    // إضافة العنوان
    sheet.getRange(1, 10)
      .setValue('📄 كشف')
      .setBackground(CONFIG.COLORS.HEADER.VENDORS)
      .setFontColor('white')
      .setFontWeight('bold')
      .setHorizontalAlignment('center');

    // تعيين عرض العمود
    sheet.setColumnWidth(10, 60);

    // إضافة ملاحظة توضيحية
    sheet.getRange(1, 10).setNote(
      '📄 اضغط على أي خلية في هذا العمود لإنشاء كشف حساب للمورد'
    );
  }

  // ملء العمود بالرمز 📄 لكل صف فيه بيانات
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('✅ تم', 'تم إضافة عمود "📄 كشف".\n\nلا توجد بيانات لملء الرموز.', ui.ButtonSet.OK);
    return;
  }

  // قراءة عمود اسم المورد (A) لمعرفة الصفوف التي فيها بيانات
  const vendors = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const icons = [];

  for (let i = 0; i < vendors.length; i++) {
    // إذا كان هناك اسم مورد، نضع الرمز
    if (vendors[i][0]) {
      icons.push(['📄']);
    } else {
      icons.push(['']);
    }
  }

  // كتابة الرموز دفعة واحدة
  sheet.getRange(2, 10, lastRow - 1, 1).setValues(icons);

  // تنسيق العمود
  sheet.getRange(2, 10, lastRow - 1, 1)
    .setHorizontalAlignment('center')
    .setFontSize(12);

  // إحصائية
  const filledCount = icons.filter(row => row[0] === '📄').length;

  ui.alert(
    '✅ تم بنجاح',
    'تم إضافة عمود "📄 كشف" (J) لتقرير الموردين.\n\n' +
    '• عدد الصفوف التي تم ملؤها: ' + filledCount + '\n\n' +
    '📌 طريقة الاستخدام:\n' +
    'اضغط على خلية 📄 في أي صف → سيتم إنشاء كشف حساب للمورد تلقائياً',
    ui.ButtonSet.OK
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
  createFunderReportSheet(ss);
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

// ==================== 📄 إنشاء كشف حساب من صف في دفتر الحركات ====================
/**
 * دالة مساعدة تُستدعى من onEdit عند التعديل على عمود "كشف" (Y)
 * تقرأ اسم الطرف من الصف وتنشئ كشف حساب له تلقائياً
 */
function generateStatementFromRow_(ss, sheet, row) {
  const ui = SpreadsheetApp.getUi();

  // قراءة اسم الطرف من عمود I (9)
  const partyName = sheet.getRange(row, 9).getValue();

  if (!partyName || String(partyName).trim() === '') {
    ui.alert('⚠️ تنبيه', 'لا يوجد اسم طرف في هذا الصف!', ui.ButtonSet.OK);
    // إعادة الرمز للخلية
    sheet.getRange(row, 25).setValue('📄');
    return;
  }

  // البحث عن نوع الطرف في قاعدة البيانات
  const partiesSheet = ss.getSheetByName(CONFIG.SHEETS.PARTIES);
  let partyType = null;

  if (partiesSheet) {
    const partiesData = partiesSheet.getRange('A2:B500').getValues();
    for (let i = 0; i < partiesData.length; i++) {
      if (partiesData[i][0] === partyName) {
        partyType = partiesData[i][1]; // B: نوع الطرف
        break;
      }
    }
  }

  // إعادة الرمز للخلية فوراً
  sheet.getRange(row, 25).setValue('📄');

  if (!partyType) {
    ui.alert('⚠️ تنبيه', 'الطرف "' + partyName + '" غير موجود في قاعدة بيانات الأطراف!', ui.ButtonSet.OK);
    return;
  }

  // استدعاء الدالة الموحدة
  generateUnifiedStatement_(ss, partyName, partyType);
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * الدالة الموحدة لإنشاء كشف حساب (مورد/عميل/ممول)
 * تجمع بين التنسيق الجيد والبيانات الصحيحة
 * ═══════════════════════════════════════════════════════════════════════════
 */
function generateUnifiedStatement_(ss, partyName, partyType) {
  const ui = SpreadsheetApp.getUi();
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!transSheet) {
    ui.alert('❌ خطأ', 'شيت دفتر الحركات المالية غير موجود!', ui.ButtonSet.OK);
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // تحديد عنوان الكشف ولون التبويب حسب نوع الطرف
  // ═══════════════════════════════════════════════════════════
  let titlePrefix = 'كشف حساب';
  let tabColor = '#4a86e8';

  if (partyType === 'مورد') {
    titlePrefix = 'كشف مورد';
    tabColor = CONFIG.COLORS.TAB.VENDOR_STATEMENT || '#e91e63';
  } else if (partyType === 'عميل') {
    titlePrefix = 'كشف عميل';
    tabColor = CONFIG.COLORS.TAB.CLIENT_STATEMENT || '#4caf50';
  } else if (partyType === 'ممول') {
    titlePrefix = 'كشف ممول';
    tabColor = CONFIG.COLORS.TAB.FUNDER_STATEMENT || '#ff9800';
  }

  // ═══════════════════════════════════════════════════════════
  // إنشاء أو الحصول على شيت الكشف
  // ═══════════════════════════════════════════════════════════
  const sheetName = titlePrefix + ' - ' + partyName;
  let sheet = ss.getSheetByName(sheetName);

  if (sheet) {
    const confirm = ui.alert(
      '📋 كشف موجود',
      'يوجد كشف حساب لـ "' + partyName + '" بالفعل.\n\nهل تريد تحديثه؟',
      ui.ButtonSet.YES_NO
    );
    if (confirm !== ui.Button.YES) return;
    sheet.clear();
  } else {
    sheet = ss.insertSheet(sheetName);
  }

  sheet.setTabColor(tabColor);
  sheet.setRightToLeft(true);

  // ═══════════════════════════════════════════════════════════
  // عرض الأعمدة (6 أعمدة بدون طبيعة الحركة والبند)
  // ═══════════════════════════════════════════════════════════
  sheet.setColumnWidth(1, 110);  // التاريخ
  sheet.setColumnWidth(2, 160);  // المشروع
  sheet.setColumnWidth(3, 250);  // التفاصيل
  sheet.setColumnWidth(4, 130);  // مدين
  sheet.setColumnWidth(5, 130);  // دائن
  sheet.setColumnWidth(6, 130);  // الرصيد

  // ═══════════════════════════════════════════════════════════
  // بيانات الطرف من القاعدة
  // ═══════════════════════════════════════════════════════════
  const partyData = getPartyData_(ss, partyName, partyType);

  // ═══════════════════════════════════════════════════════════
  // العنوان الرئيسي
  // ═══════════════════════════════════════════════════════════
  sheet.getRange('A1:F1').merge();
  sheet.getRange('A1')
    .setValue('📊 ' + titlePrefix)
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setFontSize(15)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // ═══════════════════════════════════════════════════════════
  // كارت بيانات الطرف
  // ═══════════════════════════════════════════════════════════
  sheet.getRange('A3:F3').merge()
    .setValue('بيانات ' + partyType)
    .setBackground(CONFIG.COLORS.HEADER.SUMMARY)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A4:F7').setBackground(CONFIG.COLORS.BG.LIGHT_BLUE);

  sheet.getRange('A4').setValue('الاسم:').setFontWeight('bold');
  sheet.getRange('B4:C4').merge().setValue(partyName);

  sheet.getRange('D4').setValue('التخصص:').setFontWeight('bold');
  sheet.getRange('E4:F4').merge().setValue(partyData.specialization || '');

  sheet.getRange('A5').setValue('الهاتف:').setFontWeight('bold');
  sheet.getRange('B5:C5').merge().setValue(partyData.phone || '');

  sheet.getRange('D5').setValue('البريد:').setFontWeight('bold');
  sheet.getRange('E5:F5').merge().setValue(partyData.email || '');

  sheet.getRange('A6').setValue('البنك:').setFontWeight('bold');
  sheet.getRange('B6:F6').merge().setValue(partyData.bankInfo || '');

  sheet.getRange('A7').setValue('ملاحظات:').setFontWeight('bold');
  sheet.getRange('B7:F7').merge().setValue(partyData.notes || '').setWrap(true);

  sheet.getRange('A4:F7').setBorder(
    true, true, true, true, true, true,
    '#1565c0', SpreadsheetApp.BorderStyle.SOLID
  );

  // ═══════════════════════════════════════════════════════════
  // استخراج حركات الطرف (بدون فلتر طبيعة الحركة)
  // ═══════════════════════════════════════════════════════════
  const data = transSheet.getDataRange().getValues();
  const rows = [];

  let totalDebit = 0, totalCredit = 0, balance = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // الفلتر الوحيد: اسم الطرف
    if (row[8] !== partyName) continue;

    const movementKind = String(row[13] || '');  // N: نوع الحركة
    const amountUsd = Number(row[12]) || 0;     // M: القيمة بالدولار

    // تجاهل الحركات بدون مبلغ
    if (!amountUsd) continue;

    const date = row[1];       // B: التاريخ
    const project = row[5];    // F: اسم المشروع
    const details = row[7];    // H: التفاصيل

    let debit = 0, credit = 0;

    // استخدام includes للتعامل مع الإيموجي
    if (movementKind.includes(CONFIG.MOVEMENT.DEBIT) || movementKind.includes('مدين')) {
      debit = amountUsd;
      balance += debit;
      totalDebit += debit;
    } else if (movementKind.includes(CONFIG.MOVEMENT.CREDIT) || movementKind.includes('دائن')) {
      credit = amountUsd;
      balance -= credit;
      totalCredit += credit;
    }

    rows.push([
      date,
      project || '',
      details || '',
      debit || '',
      credit || '',
      Math.round(balance * 100) / 100
    ]);
  }

  // ترتيب زمني
  rows.sort((a, b) => {
    const dateA = a[0] instanceof Date ? a[0].getTime() : new Date(a[0]).getTime();
    const dateB = b[0] instanceof Date ? b[0].getTime() : new Date(b[0]).getTime();
    return dateA - dateB;
  });

  // إعادة حساب الرصيد بعد الترتيب
  balance = 0;
  for (let i = 0; i < rows.length; i++) {
    const debit = rows[i][3] || 0;
    const credit = rows[i][4] || 0;
    balance += debit - credit;
    rows[i][5] = Math.round(balance * 100) / 100;
  }

  // ═══════════════════════════════════════════════════════════
  // الملخص المالي
  // ═══════════════════════════════════════════════════════════
  sheet.getRange('A9:F9').merge()
    .setValue('الملخص المالي')
    .setBackground(CONFIG.COLORS.HEADER.SUMMARY)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A10:F11').setBackground(CONFIG.COLORS.BG.LIGHT_BLUE);

  sheet.getRange('A10').setValue('إجمالي المدين:').setFontWeight('bold');
  sheet.getRange('B10').setValue(totalDebit).setNumberFormat('$#,##0.00');

  sheet.getRange('D10').setValue('إجمالي الدائن:').setFontWeight('bold');
  sheet.getRange('E10').setValue(totalCredit).setNumberFormat('$#,##0.00');

  sheet.getRange('A11').setValue('الرصيد الحالي:').setFontWeight('bold');
  sheet.getRange('B11').setValue(balance).setNumberFormat('$#,##0.00')
    .setFontWeight('bold')
    .setBackground(balance > 0 ? '#ffcdd2' : '#c8e6c9');

  sheet.getRange('D11').setValue('عدد الحركات:').setFontWeight('bold');
  sheet.getRange('E11').setValue(rows.length);

  sheet.getRange('A10:F11').setBorder(
    true, true, true, true, true, true,
    '#1565c0', SpreadsheetApp.BorderStyle.SOLID
  );

  // ═══════════════════════════════════════════════════════════
  // رأس جدول الحركات (بدون طبيعة الحركة والبند)
  // ═══════════════════════════════════════════════════════════
  const headers = [
    '📅 التاريخ',
    '🎬 المشروع',
    '📝 التفاصيل',
    '💰 مدين (USD)',
    '💸 دائن (USD)',
    '📊 الرصيد (USD)'
  ];

  sheet.getRange(13, 1, 1, headers.length)
    .setValues([headers])
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD)
    .setFontColor(CONFIG.COLORS.TEXT.WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // ═══════════════════════════════════════════════════════════
  // بيانات الحركات
  // ═══════════════════════════════════════════════════════════
  if (rows.length > 0) {
    sheet.getRange(14, 1, rows.length, headers.length).setValues(rows);
    sheet.getRange(14, 1, rows.length, 1).setNumberFormat('dd/mm/yyyy');
    sheet.getRange(14, 4, rows.length, 3).setNumberFormat('$#,##0.00');

    // تلوين متناوب للصفوف
    for (let i = 0; i < rows.length; i++) {
      const r = 14 + i;
      const bg = i % 2 === 0 ? '#ffffff' : '#e3f2fd';
      sheet.getRange(r, 1, 1, headers.length).setBackground(bg);
    }

    // إطار الجدول
    sheet.getRange(13, 1, rows.length + 1, headers.length)
      .setBorder(true, true, true, true, true, true, '#bdbdbd', SpreadsheetApp.BorderStyle.SOLID);
  } else {
    sheet.getRange(14, 1).setValue('لا توجد حركات').setFontStyle('italic');
  }

  sheet.setFrozenRows(13);

  // ═══════════════════════════════════════════════════════════
  // التذييل
  // ═══════════════════════════════════════════════════════════
  const footerStart = 14 + rows.length + 3;

  sheet.getRange(footerStart, 1, 1, 6).merge()
    .setBackground(CONFIG.COLORS.HEADER.DASHBOARD);

  sheet.getRange(footerStart + 1, 1, 3, 6).merge()
    .setValue(
      "Seen Film\n" +
      "info@seenfilm.net | www.seenfilm.net\n" +
      "تاريخ الإنشاء: " + new Date().toLocaleDateString('ar-EG')
    )
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setFontSize(10)
    .setFontColor(CONFIG.COLORS.TEXT.DARK);

  // تفعيل الشيت
  ss.setActiveSheet(sheet);

  ui.alert(
    '✅ تم بنجاح',
    'تم إنشاء ' + titlePrefix + ' لـ "' + partyName + '"\n\n' +
    '• عدد الحركات: ' + rows.length + '\n' +
    '• الرصيد الحالي: $' + balance.toLocaleString(),
    ui.ButtonSet.OK
  );
}

// ==================== كشف حساب مورد - في شيت (يستخدم الدالة الموحدة) ====================
function generateVendorStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // اسم المورد
  const response = ui.prompt(
    '📄 كشف حساب مورد',
    'اكتب اسم المورد كما هو مسجل:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const vendorName = response.getResponseText().trim();
  if (!vendorName) {
    ui.alert('⚠️ لم يتم إدخال الاسم.');
    return;
  }

  // استدعاء الدالة الموحدة
  generateUnifiedStatement_(ss, vendorName, 'مورد');
}

// ==================== كشف حساب عميل - في شيت (يستخدم الدالة الموحدة) ====================
function generateClientStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

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

  // استدعاء الدالة الموحدة
  generateUnifiedStatement_(ss, clientName, 'عميل');
}

// ==================== كشف حساب ممول - في شيت (يستخدم الدالة الموحدة) ====================
function generateFunderStatementSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const response = ui.prompt(
    '📄 كشف حساب ممول',
    'اكتب اسم الممول كما هو مسجل:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const funderName = response.getResponseText().trim();
  if (!funderName) {
    ui.alert('⚠️ لم يتم إدخال الاسم.');
    return;
  }

  // استدعاء الدالة الموحدة
  generateUnifiedStatement_(ss, funderName, 'ممول');
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
    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    if (type.includes('استحقاق مصروف') || type.includes('استحقاق إيراد')) {
      map[key].totalDue += amountUsd;
    }

    // 🔹 أي "دفعة" أو "تحصيل" يروح في المدفوع
    if (type.includes('دفعة مصروف') || type.includes('تحصيل إيراد')) {
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

  if (!transSheet || !reportSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية" و "تقرير الموردين".');
    return;
  }

  // خريطة تخصص المورد (من القاعدة الموحدة مع fallback للقديمة)
  const specialMap = getPartySpecializationMap_(ss, 'مورد');
  
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
    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    const typeStr = String(type || '');
    if (!typeStr.includes('استحقاق مصروف') && !typeStr.includes('دفعة مصروف')) continue;

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

    if (typeStr.includes('استحقاق مصروف')) {
      v.totalAccrualUsd += amountUsd;
    } else if (typeStr.includes('دفعة مصروف')) {
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
      v.lastDate ? Utilities.formatDate(v.lastDate, Session.getScriptTimeZone(), 'dd/MM/yyyy') : '',
      status,
      '📄'  // عمود كشف الحساب
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
    // تنسيق عمود الكشف
    reportSheet.getRange(2,10,rows.length,1).setHorizontalAlignment('center');
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
    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    const typeStr = String(type || '');
    if (!typeStr.includes('استحقاق مصروف') && !typeStr.includes('دفعة مصروف')) continue;

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

    if (typeStr.includes('استحقاق مصروف')) {
      v.totalAccrual += amountUsd;
      v.accrualCount++;
    } else if (typeStr.includes('دفعة مصروف')) {
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
    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    const typeStr = String(type || '');
    if (!typeStr.includes('استحقاق إيراد') && !typeStr.includes('تحصيل إيراد')) continue;

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
    if (typeStr.includes('استحقاق إيراد')) {
      v.expected += amountUsd;
    }
    if (typeStr.includes('تحصيل إيراد')) {
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
      v.lastDate ? Utilities.formatDate(v.lastDate, Session.getScriptTimeZone(), 'dd/MM/yyyy') : '',
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

    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    const typeStr = String(type || '');

    const monthKey = Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM');
    if (!map[monthKey]) {
      map[monthKey] = { monthKey, accruals: 0, payments: 0, revenues: 0 };
    }

    if (typeStr.includes('استحقاق مصروف')) {
      map[monthKey].accruals += amountUsd;
    } else if (typeStr.includes('دفعة مصروف')) {
      map[monthKey].payments += amountUsd;
    } else if (typeStr.includes('تحصيل إيراد')) {
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
  rebuildFunderSummaryReport();
  rebuildExpenseSummaryReport();
  rebuildRevenueSummaryReport();
  rebuildCashFlowReport();

  SpreadsheetApp.getUi().alert('✅ تم تحديث كل التقارير الملخصة.');
}

// ==================== إنشاء شيتات التقارير (بدون تغيير كبير) ====================

function createProjectReportSheet(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.PROJECT_REPORT);

  const headers = [
    'كود المشروع', 'اسم المشروع', 'البند', 'المورد',
    'إجمالي المستحق', 'المدفوع', 'المتبقي', 'عدد الدفعات', 'حالة السداد (يدوي)'
  ];
  const widths = [120, 180, 150, 150, 130, 130, 130, 100, 130];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.REPORTS);
  sheet.getRange('A1').setNote(
    'هذا تقرير تفصيلي يمكن ملؤه عبر Pivot Table أو عبر نسخ بيانات من دفتر الحركات.'
  );
}

function createVendorReportSheet(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.VENDORS_REPORT);

  const headers = [
    'اسم المورد', 'التخصص', 'عدد المشاريع', 'إجمالي المستحقات',
    'إجمالي المدفوع', 'الرصيد الحالي', 'عدد الدفعات', 'آخر تعامل', 'الحالة (يدوي)', '📄 كشف'
  ];
  const widths = [180, 120, 100, 140, 140, 130, 100, 120, 120, 60];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.VENDORS);
  sheet.getRange('A1').setNote(
    'يمكنك إنشاء Pivot Table من "دفتر الحركات المالية" لتعبئة هذا التقرير تلقائياً.'
  );
  sheet.getRange('J1').setNote(
    '📄 اضغط على أي خلية في هذا العمود لإنشاء كشف حساب للمورد'
  );
}

// ========= تقرير الممولين =========
function createFunderReportSheet(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.FUNDERS_REPORT);

  const headers = [
    'اسم الممول', 'نوع التمويل', 'عدد المشاريع', 'إجمالي التمويل',
    'إجمالي السداد', 'الرصيد المتبقي', 'عدد الدفعات', 'آخر تعامل', 'الحالة', '📄 كشف'
  ];
  const widths = [180, 120, 100, 140, 140, 130, 100, 120, 120, 60];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.FUNDER);
  sheet.getRange('A1').setNote(
    'تقرير الممولين - يعرض حركات التمويل وسداد التمويل لكل ممول'
  );
  sheet.getRange('J1').setNote(
    '📄 اضغط على أي خلية في هذا العمود لإنشاء كشف حساب للممول'
  );
}

// ========= إعادة بناء تقرير الممولين =========
function rebuildFunderSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transSheet = ss.getSheetByName(CONFIG.SHEETS.TRANSACTIONS);

  if (!transSheet) {
    SpreadsheetApp.getUi().alert('⚠️ تأكد من وجود "دفتر الحركات المالية".');
    return;
  }

  // إنشاء شيت تقرير الممولين إذا لم يكن موجوداً
  let reportSheet = ss.getSheetByName(CONFIG.SHEETS.FUNDERS_REPORT);
  if (!reportSheet) {
    createFunderReportSheet(ss);
    reportSheet = ss.getSheetByName(CONFIG.SHEETS.FUNDERS_REPORT);
  }

  const data = transSheet.getDataRange().getValues();
  const map = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const funder = row[8];              // I: اسم الممول/الجهة
    const type = row[2];                // C: طبيعة الحركة
    const amountUsd = Number(row[12]) || 0; // M: القيمة بالدولار
    const project = row[4];             // E: كود المشروع
    const date = row[1];                // B: التاريخ
    const classification = row[3];      // D: تصنيف الحركة (نوع التمويل)

    if (!funder || !amountUsd) continue;

    // استخدام includes للتعامل مع القيم التي تحتوي على إيموجي
    const typeStr = String(type || '');
    if (!typeStr.includes('تمويل') && !typeStr.includes('سداد تمويل')) continue;

    if (!map[funder]) {
      map[funder] = {
        funder,
        fundingType: classification || '',
        projects: new Set(),
        totalFundingUsd: 0,
        totalRepaymentUsd: 0,
        payments: 0,
        lastDate: null
      };
    }

    const f = map[funder];
    if (project) f.projects.add(project);
    if (classification && !f.fundingType) f.fundingType = classification;

    if (typeStr.includes('سداد تمويل')) {
      f.totalRepaymentUsd += amountUsd;
      if (amountUsd > 0) f.payments++;
    } else if (typeStr.includes('تمويل')) {
      f.totalFundingUsd += amountUsd;
    }

    if (date) {
      const d = new Date(date);
      if (!f.lastDate || d > f.lastDate) {
        f.lastDate = d;
      }
    }
  }

  const rows = [];
  Object.keys(map).forEach(k => {
    const f = map[k];
    const projectsCount = f.projects.size;
    const balance = f.totalFundingUsd - f.totalRepaymentUsd;

    let status = 'مسدد بالكامل';
    if (balance > 0) status = 'رصيد متبقي';
    else if (balance < 0) status = 'سداد زائد';

    rows.push([
      f.funder,
      f.fundingType,
      projectsCount,
      f.totalFundingUsd,
      f.totalRepaymentUsd,
      balance,
      f.payments,
      f.lastDate ? Utilities.formatDate(f.lastDate, Session.getScriptTimeZone(), 'dd/MM/yyyy') : '',
      status,
      '📄'  // عمود كشف الحساب
    ]);
  });

  const lastCol = reportSheet.getLastColumn();
  if (reportSheet.getMaxRows() > 1) {
    reportSheet.getRange(2, 1, reportSheet.getMaxRows() - 1, lastCol).clearContent();
  }

  if (rows.length) {
    rows.sort((a, b) => a[0].localeCompare(b[0]));
    reportSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    reportSheet.getRange(2, 4, rows.length, 3).setNumberFormat('$#,##0.00');
    // تنسيق عمود الكشف
    reportSheet.getRange(2, 10, rows.length, 1).setHorizontalAlignment('center');
  }

  SpreadsheetApp.getUi().alert('✅ تم تحديث "تقرير الممولين" (بالدولار).');
}

// ========= إضافة عمود كشف الحساب لتقرير الممولين الموجود =========
function addStatementColumnToFunderReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.FUNDERS_REPORT);

  if (!sheet) {
    ui.alert('⚠️ لم يتم العثور على شيت "تقرير الممولين"');
    return;
  }

  // التحقق من وجود العمود J
  const lastCol = sheet.getLastColumn();
  if (lastCol < 10) {
    // إضافة رأس العمود J
    sheet.getRange('J1')
      .setValue('📄 كشف')
      .setBackground(CONFIG.COLORS.HEADER.FUNDER)
      .setFontColor(CONFIG.COLORS.TEXT.WHITE)
      .setFontWeight('bold')
      .setHorizontalAlignment('center');
    sheet.setColumnWidth(10, 60);
  }

  // إضافة ملاحظة
  sheet.getRange('J1').setNote(
    '📄 اضغط على أي خلية في هذا العمود لإنشاء كشف حساب للممول'
  );

  // ملء الأيقونات للصفوف الموجودة
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const icons = [];
    for (let i = 2; i <= lastRow; i++) {
      icons.push(['📄']);
    }
    sheet.getRange(2, 10, lastRow - 1, 1)
      .setValues(icons)
      .setHorizontalAlignment('center');
  }

  ui.alert('✅ تم إضافة عمود كشف الحساب لتقرير الممولين');
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
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!J2:J1000,'دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"استحقاق مصروف"))`
    ]);

    // المدفوع (دفعة مصروف) - نطاقات محددة
    formulas.D.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"دفعة مصروف"))`
    ]);

    // المتبقي
    formulas.E.push([`=IF(A${row}="","",C${row}-D${row})`]);

    // عدد الاستحقاقات - نطاقات محددة
    formulas.F.push([
      `=IF(A${row}="","",COUNTIFS('دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"استحقاق مصروف"))`
    ]);

    // عدد الدفعات - نطاقات محددة
    formulas.G.push([
      `=IF(A${row}="","",COUNTIFS('دفتر الحركات المالية'!G2:G1000,A${row},'دفتر الحركات المالية'!C2:C1000,"دفعة مصروف"))`
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
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.REVENUE_REPORT);

  const headers = [
    'المشروع', 'القناة/الجهة', 'نوع الإيراد', 'المبلغ المستحق',
    'المستلم فعلياً', 'المتبقي', 'تاريخ الاستلام', 'الحالة (يدوي)'
  ];
  const widths = [180, 150, 130, 140, 140, 130, 130, 120];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.REVENUE);
  sheet.getRange('A1').setNote(
    'يمكنك عمل Pivot Table من دفتر الحركات (طبيعة الحركة = استحقاق إيراد / تحصيل إيراد) لملء هذا التقرير.'
  );
}

// ========= التدفقات النقدية (تلقائي مع ترتيب الأعمدة الجديد) =========
/**
 * ⚡ تحسينات الأداء:
 * - Batch Operations: 5 API calls بدلاً من 495 (99×5)
 * - نطاقات محددة بدل أعمدة كاملة (T2:T1000 بدل T:T)
 */
function createCashFlowSheet(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.SHEETS.CASHFLOW);

  const headers = [
    'الشهر (YYYY-MM)',                // A
    'إجمالي الاستحقاقات (مصروفات)',  // B
    'إجمالي الدفعات (مصروفات)',      // C
    'إجمالي الإيرادات المحصلة',      // D
    'صافي التدفق النقدي',            // E
    'التدفق التراكمي'                 // F
  ];
  const widths = [130, 160, 180, 170, 170, 170];

  setupSheet_(sheet, headers, widths, CONFIG.COLORS.HEADER.CASHFLOW);

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
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!J2:J1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"استحقاق مصروف"))`
    ]);

    // 🔹 إجمالي الدفعات (مصروفات) - نطاقات محددة
    formulas.C.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"دفعة مصروف"))`
    ]);

    // 🔹 إجمالي الإيرادات المحصلة - نطاقات محددة
    formulas.D.push([
      `=IF(A${row}="","",SUMIFS('دفتر الحركات المالية'!K2:K1000,'دفتر الحركات المالية'!W2:W1000,A${row},'دفتر الحركات المالية'!C2:C1000,"تحصيل إيراد"))`
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
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"استحقاق مصروف")',
      'USD'
    ],                                            // 5
    // إجمالي المدفوع (مصروفات) من K2:K1000
    ['إجمالي المدفوع (مصروفات)',
      '=SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"دفعة مصروف")',
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
      '=SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"استحقاق مصروف")' +
      '-SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"دفعة مصروف")',
      'USD'
    ],                                            // 9
    ['إجمالي الإيرادات المحصلة',
      '=SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"تحصيل إيراد")',
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
      '=COUNTIFS(\'دفتر الحركات المالية\'!C2:C1000,"دفعة مصروف",\'دفتر الحركات المالية\'!W2:W1000,TEXT(TODAY(),"YYYY-MM"))',
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
    // إجمالي القروض (تمويل الممولين) من نوع الحركة تمويل
    ['إجمالي القروض المستلمة من الممولين',
      '=IFERROR(SUMIFS(\'دفتر الحركات المالية\'!K2:K1000,\'دفتر الحركات المالية\'!C2:C1000,"تمويل"),0)',
      'USD'
    ],                                            // 29
    // إجمالي سداد القروض من نوع الحركة سداد تمويل
    ['إجمالي سداد القروض',
      '=IFERROR(SUMIFS(\'دفتر الحركات المالية\'!J2:J1000,\'دفتر الحركات المالية\'!C2:C1000,"سداد تمويل"),0)',
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
 * onEdit - معالجة التعديلات في الشيتات
 *
 * 1. تطبيع التواريخ:
 *    - دفتر الحركات المالية: أعمدة B (2) و T (20)
 *    - قاعدة بيانات المشاريع: أعمدة J (10) و K (11)
 *    - تحويل النصوص إلى Date objects
 *    - قبول فواصل متعددة (/ . -)
 *
 * 2. المزامنة الثنائية في دفتر الحركات (أعمدة E و F):
 *    - عند اختيار كود المشروع → يُملأ اسم المشروع تلقائياً
 *    - عند اختيار اسم المشروع → يُملأ كود المشروع تلقائياً
 */
function onEdit(e) {
  if (!e || !e.range || !e.source) return;

  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  // تجاهل الهيدر
  if (row <= 1) return;

  const value = e.value || e.range.getValue();

  // ═══════════════════════════════════════════════════════════
  // معالجة أعمدة التاريخ في قاعدة بيانات المشاريع: J (10) و K (11)
  // ═══════════════════════════════════════════════════════════
  if (sheetName === CONFIG.SHEETS.PROJECTS) {
    if (col === 10 || col === 11) {
      if (value) normalizeDateCell_(e.range, value);
    }
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // 📄 معالجة تقرير الموردين - عمود J (10) لإنشاء كشف حساب
  // ═══════════════════════════════════════════════════════════
  if (sheetName === CONFIG.SHEETS.VENDORS_REPORT) {
    if (col === 10) {
      // الحصول على اسم المورد من العمود A
      const vendorName = sheet.getRange(row, 1).getValue();
      if (vendorName) {
        generateUnifiedStatement_(e.source, vendorName, 'مورد');
      }
    }
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // معالجة تقرير الممولين - عمود كشف الحساب (J = 10)
  // ═══════════════════════════════════════════════════════════
  if (sheetName === CONFIG.SHEETS.FUNDERS_REPORT) {
    if (col === 10) {
      // الحصول على اسم الممول من العمود A
      const funderName = sheet.getRange(row, 1).getValue();
      if (funderName) {
        generateUnifiedStatement_(e.source, funderName, 'ممول');
      }
    }
    return;
  }

  // ═══════════════════════════════════════════════════════════
  // معالجة دفتر الحركات المالية فقط
  // ═══════════════════════════════════════════════════════════
  if (sheetName !== CONFIG.SHEETS.TRANSACTIONS) return;

  const ss = e.source;

  // ═══════════════════════════════════════════════════════════
  // معالجة أعمدة التاريخ: B (2) و T (20)
  // ═══════════════════════════════════════════════════════════
  if (col === 2 || col === 20) {
    if (value) normalizeDateCell_(e.range, value);
  }

  // ═══════════════════════════════════════════════════════════
  // 🆕 إدراج رقم الحركة تلقائياً عند كتابة التاريخ يدوياً
  // إذا تم إدخال تاريخ في B وعمود A فارغ → إضافة معادلة رقم الحركة
  // ═══════════════════════════════════════════════════════════
  if (col === 2 && value) {
    const cellA = sheet.getRange(row, 1);
    const valueA = cellA.getValue();
    // فقط إذا كان عمود A فارغاً (لا يوجد رقم حركة أو معادلة)
    if (!valueA && valueA !== 0) {
      cellA.setFormula(`=IF(B${row}="","",ROW()-1)`);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // حساب القيمة بالدولار (M) عند تغيير J أو K أو L
  // J=10 (المبلغ), K=11 (العملة), L=12 (سعر الصرف)
  // ═══════════════════════════════════════════════════════════
  if (col === 10 || col === 11 || col === 12) {
    calculateUsdValue_(sheet, row);
    // بعد حساب M، نحتاج تحديث الرصيد O لكل حركات نفس الطرف
    recalculatePartyBalance_(sheet, row);
  }

  // ═══════════════════════════════════════════════════════════
  // حساب تاريخ الاستحقاق (U) عند تغيير B أو E أو N أو R أو S أو T
  // B=2 (التاريخ), E=5 (كود المشروع), N=14 (نوع الحركة)
  // R=18 (نوع شرط الدفع), S=19 (عدد الأسابيع), T=20 (تاريخ مخصص)
  // ═══════════════════════════════════════════════════════════
  if (col === 2 || col === 5 || col === 14 || col === 18 || col === 19 || col === 20) {
    calculateDueDate_(ss, sheet, row);
  }

  // ═══════════════════════════════════════════════════════════
  // حساب حالة السداد (V) عند تغيير N أو I
  // N=14 (نوع الحركة), I=9 (الطرف)
  // ═══════════════════════════════════════════════════════════
  if (col === 14 || col === 9) {
    // تحديث الرصيد أولاً ثم حالة السداد
    recalculatePartyBalance_(sheet, row);
  }

  // ═══════════════════════════════════════════════════════════
  // 📄 إنشاء كشف حساب عند التعديل على عمود Y (25)
  // ═══════════════════════════════════════════════════════════
  if (col === 25) {
    generateStatementFromRow_(ss, sheet, row);
    return; // لا نحتاج معالجة إضافية
  }

  // ═══════════════════════════════════════════════════════════
  // معالجة أعمدة المشروع: E (5) و F (6)
  // ═══════════════════════════════════════════════════════════
  if ((col === 5 || col === 6) && value) {
    const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
    if (!projectsSheet) return;

    const projectData = projectsSheet.getRange('A2:B200').getValues();

    if (col === 5) {
      // تم اختيار كود المشروع (E) → ابحث عن الاسم (F)
      for (let i = 0; i < projectData.length; i++) {
        if (projectData[i][0] === value) {
          sheet.getRange(row, 6).setValue(projectData[i][1]);
          break;
        }
      }
    } else if (col === 6) {
      // تم اختيار اسم المشروع (F) → ابحث عن الكود (E)
      for (let i = 0; i < projectData.length; i++) {
        if (projectData[i][1] === value) {
          sheet.getRange(row, 5).setValue(projectData[i][0]);
          break;
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// دوال الحساب التلقائي (تُستدعى من onEdit)
// ═══════════════════════════════════════════════════════════

/**
 * حساب القيمة بالدولار (M) لصف معين
 * المنطق: لو دولار = نفس القيمة، لو عملة أخرى = القيمة ÷ سعر الصرف
 * ⚠️ إذا كانت العملة غير دولار ولا يوجد سعر صرف = ترك الخلية فارغة (تحتاج إدخال سعر الصرف)
 */
function calculateUsdValue_(sheet, row) {
  const rowData = sheet.getRange(row, 10, 1, 3).getValues()[0]; // J, K, L
  const amount = Number(rowData[0]) || 0;      // J: المبلغ
  const currency = String(rowData[1] || '').trim().toUpperCase(); // K: العملة
  const exchangeRate = Number(rowData[2]) || 0; // L: سعر الصرف

  let amountUsd = '';
  if (amount > 0) {
    // حالة 1: العملة دولار أو فارغة (افتراضي دولار)
    if (currency === 'USD' || currency === 'دولار' || currency === '') {
      amountUsd = amount;
    }
    // حالة 2: عملة أخرى مع سعر صرف صحيح
    else if (exchangeRate > 0) {
      amountUsd = Math.round((amount / exchangeRate) * 100) / 100;
    }
    // حالة 3: عملة أخرى بدون سعر صرف = ترك فارغ (⚠️ يحتاج إدخال سعر الصرف)
    else {
      amountUsd = ''; // لا نفترض أن المبلغ بالدولار - هذا خطأ منطقي
    }
  }

  sheet.getRange(row, 13).setValue(amountUsd); // M
}

/**
 * حساب تاريخ الاستحقاق (U) لصف معين
 * المنطق: فوري=تاريخ الحركة، بعد التسليم=تاريخ التسليم+أسابيع، تاريخ مخصص=T
 */
function calculateDueDate_(ss, sheet, row) {
  // قراءة البيانات المطلوبة
  const dateVal = sheet.getRange(row, 2).getValue();      // B: تاريخ الحركة
  const projectCode = sheet.getRange(row, 5).getValue();  // E: كود المشروع
  const movementKind = sheet.getRange(row, 14).getValue(); // N: نوع الحركة
  const paymentTermType = sheet.getRange(row, 18).getValue(); // R: نوع شرط الدفع
  const weeks = Number(sheet.getRange(row, 19).getValue()) || 0; // S: عدد الأسابيع
  const customDate = sheet.getRange(row, 20).getValue();  // T: تاريخ مخصص

  let dueDate = '';

  // فقط للحركات من نوع "مدين استحقاق"
  if (movementKind !== 'مدين استحقاق' || !paymentTermType) {
    sheet.getRange(row, 21).setValue(''); // U
    return;
  }

  if (paymentTermType === 'فوري') {
    // تاريخ الاستحقاق = تاريخ الحركة
    dueDate = dateVal;
  } else if (paymentTermType === 'بعد التسليم') {
    // جلب تاريخ التسليم من قاعدة بيانات المشاريع
    if (projectCode) {
      const projectsSheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
      if (projectsSheet) {
        const projectData = projectsSheet.getRange('A2:K200').getValues();
        for (let i = 0; i < projectData.length; i++) {
          if (projectData[i][0] === projectCode) {
            const deliveryDate = projectData[i][10]; // K: تاريخ التسليم المتوقع
            if (deliveryDate instanceof Date) {
              const newDate = new Date(deliveryDate);
              newDate.setDate(newDate.getDate() + (weeks * 7));
              dueDate = newDate;
            }
            break;
          }
        }
      }
    }
  } else if (paymentTermType === 'تاريخ مخصص') {
    dueDate = customDate;
  }

  // كتابة القيمة
  sheet.getRange(row, 21).setValue(dueDate); // U
  if (dueDate) {
    sheet.getRange(row, 21).setNumberFormat('dd/mm/yyyy');
  }
}

/**
 * إعادة حساب الرصيد (O) وحالة السداد (V) لجميع حركات الطرف
 */
function recalculatePartyBalance_(sheet, editedRow) {
  const party = String(sheet.getRange(editedRow, 9).getValue() || '').trim(); // I: الطرف
  if (!party) return;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  // قراءة كل البيانات مرة واحدة (I, M, N)
  const allData = sheet.getRange(2, 9, lastRow - 1, 6).getValues(); // I to N (columns 9-14)
  // allData[i][0] = I (الطرف), index 9
  // allData[i][4] = M (القيمة بالدولار), index 13
  // allData[i][5] = N (نوع الحركة), index 14

  // حساب الأرصدة التراكمية لكل طرف
  const partyBalances = {};
  const balanceValues = [];
  const statusValues = [];

  for (let i = 0; i < allData.length; i++) {
    const rowParty = String(allData[i][0] || '').trim();
    const amountUsd = Number(allData[i][4]) || 0; // M at index 4 (relative to column 9)
    const movementKind = String(allData[i][5] || '').trim(); // N at index 5

    let balance = '';
    let status = '';

    if (rowParty && amountUsd > 0) {
      if (!partyBalances[rowParty]) {
        partyBalances[rowParty] = 0;
      }

      if (movementKind === 'مدين استحقاق') {
        partyBalances[rowParty] += amountUsd;
      } else if (movementKind === 'دائن دفعة') {
        partyBalances[rowParty] -= amountUsd;
      }

      balance = Math.round(partyBalances[rowParty] * 100) / 100;

      // حساب حالة السداد (باستخدام CONFIG.PAYMENT_STATUS للتوحيد)
      if (movementKind === 'دائن دفعة') {
        status = CONFIG.PAYMENT_STATUS.OPERATION; // 'عملية دفع/تحصيل'
      } else if (balance > 0.01) {
        status = CONFIG.PAYMENT_STATUS.PENDING; // 'معلق'
      } else {
        status = CONFIG.PAYMENT_STATUS.PAID; // 'مدفوع بالكامل'
      }
    }

    balanceValues.push([balance]);
    statusValues.push([status]);
  }

  // كتابة القيم دفعة واحدة
  sheet.getRange(2, 15, lastRow - 1, 1).setValues(balanceValues); // O: الرصيد
  sheet.getRange(2, 22, lastRow - 1, 1).setValues(statusValues);  // V: حالة السداد
}

/**
 * تطبيع خلية تاريخ - تحويل النص إلى Date object وضبط التنسيق
 * @param {Range} range - الخلية
 * @param {*} value - القيمة الحالية
 */
function normalizeDateCell_(range, value) {
  // تجاهل إذا كانت القيمة Date object بالفعل
  if (value instanceof Date) {
    // فقط تأكد من التنسيق الصحيح
    range.setNumberFormat('dd/mm/yyyy');
    return;
  }

  // تجاهل إذا كانت القيمة رقم (serial date من Sheets)
  if (typeof value === 'number') {
    range.setNumberFormat('dd/mm/yyyy');
    return;
  }

  // محاولة تحويل النص إلى تاريخ
  const dateStr = String(value).trim();
  if (!dateStr) return;

  const parseResult = parseDateInput_(dateStr);
  if (parseResult.success) {
    range.setValue(parseResult.dateObj);
    range.setNumberFormat('dd/mm/yyyy');
  }
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
        'استحقاق مصروف',
        'دفعة مصروف',
        'استحقاق إيراد',
        'تحصيل إيراد',
        'تمويل',
        'سداد تمويل',
        'تأمين مدفوع للقناة',
        'استرداد تأمين من القناة'
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
    sheet.getRange(2, 1, acc.rows.length, 1).setNumberFormat('dd/mm/yyyy');
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