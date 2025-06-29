import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized - Token Missing',
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized - Email mismatch",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Token Verification Failed',
    });
  }
};

export default authSeller;
