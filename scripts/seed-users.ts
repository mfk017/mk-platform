import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding test users...');

  // Create super admin
  const superAdminEmail = 'superadmin@canter.sa';
  let superAdmin = await prisma.user.findUnique({ where: { email: superAdminEmail } });
  
  if (!superAdmin) {
    const pwd = await bcrypt.hash('password123', 10);
    superAdmin = await prisma.user.create({
      data: {
        email: superAdminEmail,
        password_hash: pwd,
        role: 'platform_admin',
        name: 'Platform Super Admin',
      },
    });
    console.log(`Created platform admin: ${superAdminEmail} / password123`);
  }

  const centers = await prisma.center.findMany();
  
  if (centers.length === 0) {
    console.log('No centers found in the database. Please run the initial seed first.');
    return;
  }

  for (const center of centers) {
    const email = `admin@${center.slug}.sa`;
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`User already exists for ${center.name_en} (${email})`);
      continue;
    }

    const password_hash = await bcrypt.hash('password123', 10);

    await prisma.user.create({
      data: {
        center_id: center.id,
        role: 'center_admin',
        email,
        password_hash,
        name: `${center.name_en} Admin`,
      },
    });

    console.log(`Created admin user for ${center.name_en}: ${email} / password123`);
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
