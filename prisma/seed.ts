import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.TEST_USER_EMAIL?.trim().toLowerCase();
  const password = process.env.TEST_USER_PASSWORD;
  const name = process.env.TEST_SELLER_NAME;
  const whatsappNumber = process.env.TEST_SELLER_WHATSAPP_NUMBER;

  if (!email || !password || !name || !whatsappNumber) {
    throw new Error(
      "Set TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_SELLER_NAME and TEST_SELLER_WHATSAPP_NUMBER before seeding.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.seller.upsert({
    where: { email },
    update: { passwordHash, name, whatsappNumber },
    create: { email, passwordHash, name, whatsappNumber },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
