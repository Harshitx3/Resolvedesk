const prisma = require('../services/prismaService');
const { hashPassword, comparePasswords } = require('../services/passwordService');
const { generateToken } = require('../services/jwtService');
const config = require('../config/env');

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  companyId: user.companyId,
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, companyId } = req.body;

    if (role === config.roles.SUPER_ADMIN) {
      res.status(403);
      return next(new Error('SUPER_ADMIN registration is not allowed via this endpoint'));
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409);
      return next(new Error('A user with this email already exists'));
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        companyId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
      },
    });

    const accessToken = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    const sanitizedUser = sanitizeUser(user);
    const accessToken = generateToken(sanitizedUser);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      user: sanitizedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
