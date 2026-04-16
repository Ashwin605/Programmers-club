import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      // Handle mock admin token (demo/offline mode)
      if (token === 'mock_admin_token') {
        req.user = {
          _id: 'admin_123',
          id: 'admin_123',
          name: 'Ashwin Srichandra',
          email: 'ashwinsrichandra2008@gmail.com',
          role: 'admin'
        };
        return next();
      }

      // Handle mock user token (demo/offline mode)
      if (token === 'mock_user_token') {
        req.user = {
          _id: 'mock',
          id: 'mock',
          name: 'Member',
          role: 'member'
        };
        return next();
      }

      // Verify real JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      // Get user from the token in Supabase
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.id)
        .maybeSingle();

      if (error || !user) {
        console.log('User not found with ID:', decoded.id);
        return res.status(401).json({ message: 'Not authorized' });
      }

      req.user = user;
      console.log('Found user:', req.user);

      next();
    } catch (error) {
      console.log('Auth error:', error);
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
