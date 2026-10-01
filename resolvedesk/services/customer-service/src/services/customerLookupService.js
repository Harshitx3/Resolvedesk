const prisma = require('./prismaService');

// A customer can return to submit more complaints over time. Instead of
// creating a duplicate row, try to find an existing customer within the
// SAME company using the strongest identifier available.
//
// Priority:
//   1. companyId + email  (strongest)
//   2. companyId + phone  (fallback when email is not provided)
//
// Cross-company records are intentionally kept isolated. The same person
// interacting with Company A and Company B is two separate customers.
const findExistingCustomer = async ({ companyId, email, phone }) => {
  if (email) {
    const byEmail = await prisma.customer.findFirst({
      where: {
        companyId,
        email: { equals: email, mode: 'insensitive' },
      },
    });
    if (byEmail) return byEmail;
  }

  if (phone) {
    const byPhone = await prisma.customer.findFirst({
      where: {
        companyId,
        phone,
      },
    });
    if (byPhone) return byPhone;
  }

  return null;
};

const findCustomerByEmailInCompany = async ({ companyId, email }) => {
  if (!companyId || !email) return null;

  return prisma.customer.findFirst({
    where: {
      companyId,
      email: { equals: email, mode: 'insensitive' },
    },
  });
};

module.exports = {
  findExistingCustomer,
  findCustomerByEmailInCompany,
};
