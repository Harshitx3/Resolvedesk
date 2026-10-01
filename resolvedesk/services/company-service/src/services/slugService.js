const prisma = require('./prismaService');
const config = require('../config/env');

const generateBaseSlug = (name) => {
  return name
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const isSlugTaken = async (slug) => {
  const count = await prisma.company.count({
    where: { slug },
  });
  return count > 0;
};

const generateUniqueSlug = async (name) => {
  const baseSlug = generateBaseSlug(name);

  if (!baseSlug) {
    throw new Error('Unable to generate a valid slug from the company name');
  }

  let candidate = baseSlug;
  let attempt = 2;

  while (await isSlugTaken(candidate)) {
    if (attempt > config.slug.maxAttempts) {
      candidate = `${baseSlug}-${Date.now()}`;
      break;
    }
    candidate = `${baseSlug}-${attempt}`;
    attempt += 1;
  }

  return candidate;
};

module.exports = {
  generateBaseSlug,
  generateUniqueSlug,
};
