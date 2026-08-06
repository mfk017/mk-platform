export type Language = 'en' | 'ar';

export const translations = {
  en: {
    brandName: 'EQUESTRIAN',
    tagline: 'Equestrian Center Booking & Management',
    languageToggle: 'العربية',
    switchLang: 'ar',
    dir: 'ltr',
    fontClass: 'font-cairo',

    // Directory Page
    exploreCenters: 'Saudi Arabia Equestrian Centers',
    exploreSubtitle: 'Bilingual booking and management platform for equestrian centers — lessons, livery, packages, and payments.',
    viewCenter: 'Visit Booking Portal',
    activeCenter: 'Verified Center',
    cityLabel: 'City',
    poweredBy: 'Powered by Platform',

    // Navbar
    navServices: 'Services',
    navPackages: 'Packages',
    navLivery: 'Livery',
    navMyBookings: 'My Bookings',
    visitPlatform: 'Visit Platform',

    // Center Hero / Header
    certifiedCenter: 'Verified Equestrian Facility',
    vatRegistered: 'VAT Registered (15%)',
    vatInclusive: 'Prices include 15% VAT',
    contactInfo: 'Contact Info',

    // Services Section matching canter-app.com
    servicesTitle: 'Services',
    servicesSubtitle: 'Choose the right service for you and book your appointment online.',
    packagesBanner: 'Browse package subscriptions & save on horseback riding lessons.',
    viewPackages: 'View Packages',

    // Service Card Details
    duration: 'Duration',
    minutes: 'mins',
    price: 'Price',
    sar: 'SAR',
    bookNow: 'Book Now',
    participants: 'participants',
    categoryLesson: 'Riding Lesson',
    categoryLivery: 'Full Livery',
    categoryPackage: 'Special Package',
    skillLevel: 'Skill Level',
    allLevels: 'All Levels',

    // Schedule & Slots
    scheduleTitle: 'Available Dates & Time Slots',
    selectDate: 'Select Date',
    availableSlots: 'Available Time Slots',
    capacityRemaining: 'spots left',
    fullyBooked: 'Fully Booked',
    selectSlot: 'Select Time Slot',
    selected: 'Selected',
    noSlots: 'No available slots for this service. Please select another service.',

    // Booking Modal
    modalTitle: 'Complete Your Reservation',
    step1: '1. Selected Service & Time',
    step2: '2. Customer Information',
    fullName: 'Full Name',
    namePlaceholder: 'e.g. Abdullah Al-Mansoor',
    phoneLabel: 'Saudi Mobile Number',
    phonePlaceholder: '+966 5X XXX XXXX',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    platformFeeNotice: 'Includes SAR 6 platform booking fee',
    proceedToConfirm: 'Confirm Booking',
    cancel: 'Cancel',

    // Confirmation Screen
    confirmTitle: 'Booking Confirmed!',
    confirmSubtitle: 'Your reservation has been recorded successfully.',
    bookingReference: 'Booking Reference Number',
    centerName: 'Equestrian Center',
    reservedService: 'Reserved Service',
    dateTime: 'Date & Time',
    customer: 'Customer Name',
    amountPaid: 'Total Amount',
    statusConfirmed: 'Confirmed',
    simulatedPaymentNotice: 'Phase 1 MVP Demo: No live payment processed. Test transaction created.',
    close: 'Back to Center Portal',
    printReceipt: 'Print Receipt',
  },
  ar: {
    brandName: 'كانتر',
    tagline: 'منصة إدارة وحجوزات مراكز الفروسية بالمملكة',
    languageToggle: 'English',
    switchLang: 'en',
    dir: 'rtl',
    fontClass: 'font-cairo',

    // Directory Page
    exploreCenters: 'مراكز الفروسية بالمملكة العربية السعودية',
    exploreSubtitle: 'منصة ثنائية اللغة لإدارة وحجوزات مراكز الفروسية — الحصص، الإيواء، الباقات، والمدفوعات الإلكترونية.',
    viewCenter: 'زيارة بوابـة الحجز',
    activeCenter: 'مركز معتمد',
    cityLabel: 'المدينة',
    poweredBy: 'مشغّل بواسطة كانتر',

    // Navbar
    navServices: 'الخدمات',
    navPackages: 'الباقات',
    navLivery: 'الإيواء',
    navMyBookings: 'حجوزاتي',
    visitPlatform: 'زيارة منصة كانتر',

    // Center Hero / Header
    certifiedCenter: 'مركز فروسية معتمد',
    vatRegistered: 'مسجل بالضريبة (١٥٪)',
    vatInclusive: 'الأسعار شاملة ضريبة القيمة المضافة ١٥٪',
    contactInfo: 'معلومات التواصل',

    // Services Section matching canter-app.com
    servicesTitle: 'الخدمات',
    servicesSubtitle: 'اختر الخدمة المناسبة لك واحجز موعدك الآن عبر الإنترنت',
    packagesBanner: 'تصفح باقات الاشتراكات ووفر على حصص الركوب الجماعية والفردية',
    viewPackages: 'عرض الباقات',

    // Service Card Details
    duration: 'المدة',
    minutes: 'دقيقة',
    price: 'السعر',
    sar: 'ر.س',
    bookNow: 'احجز الآن',
    participants: 'مشترك',
    categoryLesson: 'درس ركوب',
    categoryLivery: 'إيواء كامل',
    categoryPackage: 'باقة خاصة',
    skillLevel: 'المستوى المطلوب',
    allLevels: 'جميع المستويات',

    // Schedule & Slots
    scheduleTitle: 'المواعيد والأوقات المتاحة',
    selectDate: 'اختر التاريخ',
    availableSlots: 'الأوقات المتاحة',
    capacityRemaining: 'أماكن متبقية',
    fullyBooked: 'مكتمل الحجز',
    selectSlot: 'اختر الوقت',
    selected: 'تم الاختيار',
    noSlots: 'لا توجد مواعيد متاحة لهذه الخدمة حالياً، يرجى اختيار خدمة أخرى.',

    // Booking Modal
    modalTitle: 'إتمام طلب الحجز',
    step1: '١. تفاصيل الخدمة والموعد',
    step2: '٢. بيانات العميل',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'مثال: عبدالله المنصور',
    phoneLabel: 'رقم الجوال السعودي',
    phonePlaceholder: '+966 5X XXX XXXX',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    platformFeeNotice: 'تتضمن رسوم الحجز المباشر ٦ ر.س لكل عملية',
    proceedToConfirm: 'تأكيد الحجز',
    cancel: 'إلغاء',

    // Confirmation Screen
    confirmTitle: 'تم تأكيد الحجز بنجاح!',
    confirmSubtitle: 'تم تسجيل طلب حجزك وتوليد المرجع الإلكتروني الخاص بك.',
    bookingReference: 'رقم مرجع الحجز',
    centerName: 'مركز الفروسية',
    reservedService: 'الخدمة المحجوزة',
    dateTime: 'التاريخ والوقت',
    customer: 'اسم العميل',
    amountPaid: 'الإجمالي',
    statusConfirmed: 'مؤكد',
    simulatedPaymentNotice: 'المرحلة الأولى التجريبية: تجربة حجز حية دون خصم مالي.',
    close: 'العودة لصفحة المركز',
    printReceipt: 'طباعة الإيصال',
  },
};
