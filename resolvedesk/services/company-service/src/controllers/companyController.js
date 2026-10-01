const prisma = require('../services/prismaService');
const { generateUniqueSlug } = require('../services/slugService');
const config = require('../config/env');

const buildComplaintUrl = (slug) => {
  const base = config.frontendUrl.replace(/\/+$/, '');
  return `${base}/c/${encodeURIComponent(slug)}`;
};

const createCompany = async (req, res, next) => {
  try {
    const { name, email, phone, website, description } = req.body;

    const slug = await generateUniqueSlug(name);

    const company = await prisma.company.create({
      data: {
        name,
        slug,
        email,
        phone: phone || null,
        website: website || null,
        description: description || null,
      },
    });

    const responseCompany = {
      id: company.id,
      name: company.name,
      slug: company.slug,
      email: company.email,
      phone: company.phone,
      website: company.website,
      logo: company.logo,
      description: company.description,
      isActive: company.isActive,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      company: responseCompany,
      complaintUrl: buildComplaintUrl(company.slug),
    });
  } catch (error) {
    if (error.code === 'P2002' && Array.isArray(error.meta?.target)) {
      if (error.meta.target.includes('email')) {
        res.status(409);
        return next(new Error('A company with this email already exists'));
      }
      if (error.meta.target.includes('slug')) {
        res.status(409);
        return next(new Error('A company with this slug already exists'));
      }
    }
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      res.status(404);
      return next(new Error('Company not found'));
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const company = await prisma.company.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        description: true,
        isActive: true,
      },
    });

    if (!company) {
      res.status(404);
      return next(new Error('Company not found'));
    }

    if (!company.isActive) {
      res.status(404);
      return next(new Error('Company not found'));
    }

    const { isActive, ...publicCompany } = company;

    res.status(200).json({
      success: true,
      company: publicCompany,
    });
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, website, description, logo, isActive } = req.body;

    const existing = await prisma.company.findUnique({ where: { id } });
    if (!existing) {
      res.status(404);
      return next(new Error('Company not found'));
    }

    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (phone !== undefined) data.phone = phone;
    if (website !== undefined) data.website = website;
    if (description !== undefined) data.description = description;
    if (logo !== undefined) data.logo = logo;
    if (isActive !== undefined) data.isActive = isActive;

    const updated = await prisma.company.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      company: updated,
    });
  } catch (error) {
    if (error.code === 'P2002' && Array.isArray(error.meta?.target)) {
      if (error.meta.target.includes('email')) {
        res.status(409);
        return next(new Error('A company with this email already exists'));
      }
      if (error.meta.target.includes('slug')) {
        res.status(409);
        return next(new Error('A company with this slug already exists'));
      }
    }
    next(error);
  }
};

const updateCompanyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const existing = await prisma.company.findUnique({ where: { id } });
    if (!existing) {
      res.status(404);
      return next(new Error('Company not found'));
    }

    const updated = await prisma.company.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });

    res.status(200).json({
      success: true,
      message: `Company ${isActive ? 'activated' : 'deactivated'} successfully`,
      company: {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        isActive: updated.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  getCompanyById,
  getCompanyBySlug,
  updateCompany,
  updateCompanyStatus,
};
