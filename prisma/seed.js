const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning old database records...');
  await prisma.booking.deleteMany({});
  await prisma.scheduleSlot.deleteMany({});
  await prisma.horse.deleteMany({});
  await prisma.trainer.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.payout.deleteMany({});
  await prisma.center.deleteMany({});

  console.log('Seeding Saudi Equestrian Centers with Horses & Trainers...');

  // Center 1: Al Khalediah Stables (Riyadh)
  const center1 = await prisma.center.create({
    data: {
      name_en: 'Al Khalediah Stables',
      name_ar: 'إسطبلات الخالدية',
      slug: 'al-khalediah',
      logo_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=300&q=80',
      description_en: 'World-renowned Arabian horse breeding & equestrian excellence academy located in Tebrak, Diriyah region.',
      description_ar: 'أكاديمية فروسية فاخرة ومركز رائد لتربية وتدريب الخيل العربية الأصيلة في منطقة الدرعية، الرياض.',
      phone: '+966 50 123 4567',
      whatsapp_number: '966501234567',
      email: 'info@alkhalediah.sa',
      location_url: 'https://maps.google.com/?q=24.6877,46.7219',
      city: 'Riyadh (الرياض)',
      bank_account_details: 'ENC_SA828000041260801010101',
      vat_enabled: true,
      status: 'active',
      users: {
        create: [
          {
            email: 'admin@alkhalediah.sa',
            password_hash: '$2b$10$demo_hash_alkhalediah',
            name: 'Sheikh Khalid Al-Saud',
            role: 'center_admin',
          },
        ],
      },
      services: {
        create: [
          // Training Services
          {
            name_en: 'Beginner Riding Lesson',
            name_ar: 'درس ركوب الخيل للمبتدئين',
            price: 250.0,
            duration_minutes: 45,
            category: 'training',
            description_en: 'Guided fundamental horseback session with certified coaches and calm school horses.',
            description_ar: 'حصة تدريبية أساسية شاملة مهارات السيطرة والتوازن والتوازن الصحيح للركوب.',
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
          },
          {
            name_en: 'Show Jumping Masterclass',
            name_ar: 'دورة قفز الحواجز المتقدمة',
            price: 450.0,
            duration_minutes: 60,
            category: 'training',
            description_en: 'Advanced jumping technique & agility training on international specification arenas.',
            description_ar: 'حصة تخصصية لقفز الحواجز وتطوير مهارات التناغم والقفز الاحترافي.',
            image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
          },
          {
            name_en: 'Private VIP Coaching Session',
            name_ar: 'حصة تدريب خاصة (VIP)',
            price: 550.0,
            duration_minutes: 60,
            category: 'training',
            description_en: 'Exclusive one-on-one personal coaching session tailored to your skill progression.',
            description_ar: 'حصة تدريب فردية مباشرة مع كبير المدربين لتسريع تطوير المهارات.',
            image_url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80',
          },
          // Packages
          {
            name_en: 'Bronze Rider Package (5 Sessions)',
            name_ar: 'باقة الفارس البرونزية (٥ حصص)',
            price: 1100.0,
            original_price: 1250.0,
            discount_percent: 12.0,
            session_count: 5,
            duration_minutes: 45,
            category: 'package',
            description_en: 'Package of 5 training sessions with flexible scheduling and valid for 60 days.',
            description_ar: 'باقة تدريبية تتضمن ٥ حصص ركوب مع مرونة كاملة في جدولة المواعيد وصالحة لمدة ٦٠ يوماً.',
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
          },
          {
            name_en: 'Gold Champion Package (10 Sessions)',
            name_ar: 'الباقة الذهبية الشاملة (١٠ حصص)',
            price: 2000.0,
            original_price: 2500.0,
            discount_percent: 20.0,
            session_count: 10,
            duration_minutes: 60,
            category: 'package',
            description_en: 'Comprehensive 10-session master package with priority slot booking and complimentary gear rental.',
            description_ar: 'باقة النخبة تتضمن ١٠ حصص تدريبية مع أولوية حجز المواعيد واستعارة المعدات مجاناً.',
            image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
          },
          // Livery Services
          {
            name_en: 'Standard Air-Conditioned Stabling',
            name_ar: 'إيواء إسطبلات مكيفة قياسية',
            price: 2800.0,
            duration_minutes: 1440,
            category: 'livery',
            description_en: 'Air-conditioned stall, customized organic feed, daily turnout, and stable grooming.',
            description_ar: 'إيواء في إسطبل مكيف، تغذية يومية مدروسة، تمارين وسقاية والعناية اليومية.',
            image_url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80',
          },
          {
            name_en: 'Full Royal Livery & Vet Care (Monthly)',
            name_ar: 'باقة الإيواء الملكي والرعاية البيطرية (شهري)',
            price: 3800.0,
            duration_minutes: 1440,
            category: 'livery',
            description_en: 'Premium padded box, daily exercising, routine veterinary supervision, and grooming.',
            description_ar: 'إيواء ملكي متكامل يتضمن التمارين اليومية، الإشراف البيطري، وتجهيز الخيل للمسابقات.',
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
          },
        ],
      },
      horses: {
        create: [
          {
            name_en: 'Kahlan',
            name_ar: 'كحيلان',
            breed_en: 'Purebred Arabian',
            breed_ar: 'عربي أصيل',
            age: 7,
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80',
          },
          {
            name_en: 'Shagya',
            name_ar: 'شقران',
            breed_en: 'Arabian Thoroughbred',
            breed_ar: 'عربي أصيل (سقلاوي)',
            age: 9,
            image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
          },
          {
            name_en: 'Al-Buraq',
            name_ar: 'البراق',
            breed_en: 'Show Jumper Warmblood',
            breed_ar: 'سترونج هورس (قفز)',
            age: 6,
            image_url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=400&q=80',
          },
        ],
      },
      trainers: {
        create: [
          {
            name_en: 'Captain Faisal Al-Otaibi',
            name_ar: 'الكابتن فيصل العتيبي',
            bio_en: 'Certified FEI Level 3 Show Jumping Instructor with over 14 years of international coaching experience.',
            bio_ar: 'مدرب قفز حواجز معتمد دولياً (FEI) ببروز خبرة تتجاوز ١٤ عاماً في تدريب الفرسان.',
            specialty_en: 'Show Jumping & Agility',
            specialty_ar: 'قفز الحواجز والفروسية المتقدمة',
            image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
          },
          {
            name_en: 'Coach Reem Al-Ghamdi',
            name_ar: 'المدربة ريم الغامدي',
            bio_en: 'Specialized academy instructor focusing on foundation riding skills and youth equestrian safety.',
            bio_ar: 'مدربة فروسية متخصصة في أساسيات الركوب للأطفال والمبتدئين وتدريب التوازن.',
            specialty_en: 'Beginner & Youth Academy',
            specialty_ar: 'أكاديمية الناشئين والمبتدئين',
            image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          },
        ],
      },
    },
    include: {
      services: true,
    },
  });

  // Create schedule slots for Center 1
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const setTime = (date, hours, mins = 0) => {
    const d = new Date(date);
    d.setHours(hours, mins, 0, 0);
    return d;
  };

  for (const service of center1.services) {
    if (service.category !== 'livery') {
      await prisma.scheduleSlot.createMany({
        data: [
          {
            center_id: center1.id,
            service_id: service.id,
            start_time: setTime(today, 16, 0),
            end_time: setTime(today, 16, service.duration_minutes),
            capacity: 5,
            booked_count: 1,
          },
          {
            center_id: center1.id,
            service_id: service.id,
            start_time: setTime(tomorrow, 17, 30),
            end_time: setTime(tomorrow, 17, 30 + service.duration_minutes),
            capacity: 6,
            booked_count: 2,
          },
        ],
      });
    }
  }

  // Center 2: Al Sawari Equestrian Club (Jeddah)
  const center2 = await prisma.center.create({
    data: {
      name_en: 'Al Sawari Equestrian Club',
      name_ar: 'نادي السواري للفروسية',
      slug: 'al-sawari',
      logo_url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=300&q=80',
      description_en: 'Coastal equestrian hub featuring seaside tracks and pony academy.',
      description_ar: 'وجهة الفروسية الساحلية على شواطئ جدة مجهزة بمضامير عالمية.',
      phone: '+966 55 987 6543',
      whatsapp_number: '966559876543',
      email: 'contact@alsawari.sa',
      location_url: 'https://maps.google.com/?q=21.5433,39.1728',
      city: 'Jeddah (جدة)',
      bank_account_details: 'ENC_SA19100008471209120912',
      vat_enabled: true,
      status: 'active',
      users: {
        create: [
          {
            email: 'admin@alsawari.sa',
            password_hash: '$2b$10$demo_hash_alsawari',
            name: 'Tariq Al-Ghamdi',
            role: 'center_admin',
          },
        ],
      },
      services: {
        create: [
          {
            name_en: 'Kids Pony Riding Session',
            name_ar: 'جلسة فروسية للأطفال (بوني)',
            price: 180.0,
            duration_minutes: 30,
            category: 'training',
            description_en: 'Safe & introductory pony session for kids aged 4 to 12.',
            description_ar: 'جلسة ممتعة وآمنة تماماً للأطفال لتعلم مبادئ الفروسية.',
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80',
          },
          {
            name_en: 'Coastal Sunset Trail Ride',
            name_ar: 'جولة ركوب الخيل الشاطئية عند الغروب',
            price: 380.0,
            duration_minutes: 75,
            category: 'training',
            description_en: 'Scenic horseback journey along the Red Sea waves.',
            description_ar: 'جولة ساحرة محاذاة شاطئ البحر الأحمر خلال ساعات الغروب.',
            image_url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=80',
          },
        ],
      },
      horses: {
        create: [
          {
            name_en: 'Najm',
            name_ar: 'نجم',
            breed_en: 'Arabian Pony',
            breed_ar: 'بوني عربي',
            age: 5,
            image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80',
          },
        ],
      },
      trainers: {
        create: [
          {
            name_en: 'Coach Sultan Al-Zahrani',
            name_ar: 'المدرب سلطان الزهراني',
            bio_en: 'Endurance and trail riding instructor with vast coastal terrain expertise.',
            bio_ar: 'مدرب مسارات صحراوية وشاطئية متخصص في مهارات القدرة والتحمل.',
            specialty_en: 'Trail & Endurance Riding',
            specialty_ar: 'ركوب المسارات والتحمل',
            image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
          },
        ],
      },
    },
  });

  // Create Super Admin (Platform Admin)
  await prisma.user.create({
    data: {
      email: 'superadmin@canter.sa',
      password_hash: '$2b$10$hTBPdVvx.dH/VkD3sNJ4xugm2GRzO5z1sKdV7iixbmvJJsoafxVSW', // Password: supersecret123
      name: 'Canter System Admin',
      role: 'platform_admin',
    }
  });

  console.log('Database successfully re-seeded with Horses, Trainers & Subsections!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
