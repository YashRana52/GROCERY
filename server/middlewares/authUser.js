import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized - Token Missing',
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

     req.user = tokenDecode;
      next(); 
    
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Token Verification Failed',
    });
  }
};

export default authUser;
