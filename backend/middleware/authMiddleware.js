// authMiddleware.js

import jwt from "jsonwebtoken";


// Authentication middleware
const authenticate = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach the user info to the request object for use in the route
    req.user = decoded;  // Add user data to req, e.g., userId

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
