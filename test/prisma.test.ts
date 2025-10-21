import { prisma } from "../src/common/db/prisma";

//npx ts-node -r tsconfig-paths/register test/prisma.test.ts

async function testPrismaConnection() {
  console.log("====================================");
  console.log("Testing Prisma Connection...");
  console.log("NODE_ENV =", process.env.NODE_ENV);
  console.log("====================================\n");

  try {
    // Test 1: Kiểm tra kết nối cơ bản
    console.log("✓ Test 1: Checking basic connection...");
    await prisma.$connect();
    console.log("✓ Connected to database successfully!\n");

    // Test 2: Test query đơn giản với categories
    console.log("✓ Test 2: Fetching categories...");
    const categories = await prisma.categories.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        is_active: true,
      },
    });
    console.log(`✓ Found ${categories.length} categories:`);
    console.log(categories);
    console.log();

    // Test 3: Test query với users
    console.log("✓ Test 3: Fetching users...");
    const users = await prisma.users.findMany({
      take: 5,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
    console.log(`✓ Found ${users.length} users:`);
    console.log(users);
    console.log();



    console.log("====================================");
    console.log("✓ All tests passed successfully! 🎉");
    console.log("====================================");
  } catch (err) {
    console.error("====================================");
    console.error("✗ Connection or query failed:");
    console.error(err);
    console.error("====================================");
  } finally {
    // Đóng kết nối để chương trình không treo
    await prisma.$disconnect();
    console.log("\n✓ Prisma disconnected.");
  }
}

// Chạy test
testPrismaConnection();
