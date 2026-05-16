// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'starters' }, update: {}, create: { name: 'Starters', slug: 'starters', description: 'Begin your journey', sortOrder: 1 } }),
    prisma.category.upsert({ where: { slug: 'mains' }, update: {}, create: { name: 'Mains', slug: 'mains', description: 'The heart of the menu', sortOrder: 2 } }),
    prisma.category.upsert({ where: { slug: 'drinks' }, update: {}, create: { name: 'Drinks', slug: 'drinks', description: 'Curated beverages', sortOrder: 3 } }),
    prisma.category.upsert({ where: { slug: 'desserts' }, update: {}, create: { name: 'Desserts', slug: 'desserts', description: 'Sweet endings', sortOrder: 4 } }),
  ])

  const [starters, mains, drinks, desserts] = categories

  // Menu Items
  const menuItems = [
    { name: 'Burrata & Heirloom', slug: 'burrata-heirloom', description: 'Creamy burrata with heirloom tomatoes, basil oil & sea salt flakes', price: 18, categoryId: starters.id, isVegetarian: true, isFeatured: true, calories: 320 },
    { name: 'Tuna Tartare', slug: 'tuna-tartare', description: 'Sashimi-grade tuna with avocado, yuzu ponzu & crispy wontons', price: 22, categoryId: starters.id, isSpicy: true, isFeatured: true, calories: 280 },
    { name: 'Foie Gras Torchon', slug: 'foie-gras-torchon', description: 'House-cured foie gras with brioche, pickled cherries & Sauternes gel', price: 28, categoryId: starters.id, calories: 510 },
    { name: 'Truffle Arancini', slug: 'truffle-arancini', description: 'Black truffle risotto balls, parmesan crisp, lemon aioli', price: 16, categoryId: starters.id, isVegetarian: true, calories: 390 },
    { name: 'Wagyu Beef Tenderloin', slug: 'wagyu-beef-tenderloin', description: 'A5 Wagyu with red wine jus, bone marrow butter & seasonal vegetables', price: 68, categoryId: mains.id, isFeatured: true, calories: 720 },
    { name: 'Pan-Seared Halibut', slug: 'pan-seared-halibut', description: 'Line-caught halibut, saffron beurre blanc, charred leek & samphire', price: 48, categoryId: mains.id, isFeatured: true, calories: 480 },
    { name: 'Wild Mushroom Risotto', slug: 'wild-mushroom-risotto', description: 'Aged carnaroli rice, porcini & chanterelles, white truffle oil', price: 36, categoryId: mains.id, isVegetarian: true, calories: 560 },
    { name: 'Duck Confit', slug: 'duck-confit', description: 'Slow-confit Barbary duck, cherry gastrique, pomme sarladaise', price: 44, categoryId: mains.id, calories: 680 },
    { name: 'Château Margaux 2018', slug: 'chateau-margaux-2018', description: 'Premier Grand Cru Classé. Notes of blackcurrant, cedar and violet', price: 95, categoryId: drinks.id },
    { name: 'Champagne Billecart', slug: 'champagne-billecart', description: 'Blanc de Blancs NV. Crisp acidity, fine bubbles, pastry and citrus notes', price: 65, categoryId: drinks.id },
    { name: 'Negroni Sbagliato', slug: 'negroni-sbagliato', description: 'Campari, sweet vermouth, Prosecco — twisted on the classic Negroni', price: 18, categoryId: drinks.id },
    { name: 'Artisan Coffee', slug: 'artisan-coffee', description: 'Single-origin Ethiopian pour-over or traditional espresso', price: 8, categoryId: drinks.id, isVegetarian: true },
    { name: 'Chocolate Soufflé', slug: 'chocolate-souffle', description: '72% Valrhona dark chocolate, Tahitian vanilla crème anglaise', price: 22, categoryId: desserts.id, isVegetarian: true, isFeatured: true, prepTime: 20 },
    { name: 'Crème Brûlée', slug: 'creme-brulee', description: 'Classic vanilla crème brûlée with a perfectly caramelized crust', price: 16, categoryId: desserts.id, isVegetarian: true },
    { name: 'Tarte Tatin', slug: 'tarte-tatin', description: 'Upside-down caramelized apple tart, Calvados flambé, Normandy cream', price: 18, categoryId: desserts.id, isVegetarian: true },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({ where: { slug: item.slug }, update: {}, create: item })
  }

  // Admin user
  const adminHash = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@savoria.com' },
    update: {},
    create: { email: 'admin@savoria.com', name: 'Marco Conti', passwordHash: adminHash, role: 'ADMIN' }
  })

  // Demo user
  const userHash = await bcrypt.hash('user123', 12)
  await prisma.user.upsert({
    where: { email: 'demo@savoria.com' },
    update: {},
    create: { email: 'demo@savoria.com', name: 'James Wilson', passwordHash: userHash, role: 'CUSTOMER' }
  })

  // Promo codes
  await prisma.promoCode.upsert({
    where: { code: 'SAVORIA20' },
    update: {},
    create: { code: 'SAVORIA20', discount: 20, minOrder: 30, isActive: true }
  })
  await prisma.promoCode.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: { code: 'WELCOME10', discount: 10, minOrder: 0, isActive: true }
  })

  console.log('✅ Seed complete!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
