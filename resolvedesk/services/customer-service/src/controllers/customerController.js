const prisma = require('../services/prismaService');
const { findExistingCustomer, findCustomerByEmailInCompany } = require('../services/customerLookupService');
const { requireCompanyScope } = require('../middleware/authMiddleware');

const sanitizeCustomer = (customer) => ({
  id: customer.id,
  companyId: customer.companyId,
  name: customer.name,
  email: customer.email,
  phone: customer.phone,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
});

const createCustomer = async (req, res, next) => {
  try {
    const { companyId, name, email, phone } = req.body;

    const existing = await findExistingCustomer({
      companyId,
      email: email || null,
      phone: phone || null,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Customer already exists, returning existing record',
        existing: true,
        customer: sanitizeCustomer(existing),
      });
    }

    const created = await prisma.customer.create({
      data: {
        companyId,
        name,
        email: email || null,
        phone: phone || null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      existing: false,
      customer: sanitizeCustomer(created),
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      res.status(404);
      return next(new Error('Customer not found'));
    }

    res.status(200).json({
      success: true,
      customer: sanitizeCustomer(customer),
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerByEmail = async (req, res, next) => {
  try {
    const { companyId, email } = req.query;

    const customer = await findCustomerByEmailInCompany({ companyId, email });

    if (!customer) {
      res.status(404);
      return next(new Error('Customer not found'));
    }

    res.status(200).json({
      success: true,
      customer: sanitizeCustomer(customer),
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const existing = await prisma.customer.findUnique({ where: { id } });
    if (!existing) {
      res.status(404);
      return next(new Error('Customer not found'));
    }

    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email || null;
    if (phone !== undefined) data.phone = phone || null;

    const updated = await prisma.customer.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      customer: sanitizeCustomer(updated),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  getCustomerByEmail,
  updateCustomer,
};
