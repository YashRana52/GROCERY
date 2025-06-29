import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'





//register user:/api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: 'Missing details',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: 'User already registered',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Success message added here
    return res.json({
      success: true,
      message: 'Registration successful ✅',
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};



//login user:/api/user/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid Email'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid password'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Success message added
    return res.json({
      success: true,
      message: 'Login successful ✅',
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};


//check Auth :/api/user/is-auth

export const isAuth = async(req,res)=>{
  try {
  
    const user = await User.findById(req.user.id).select("-password")
    return res.json({success:true,user})

    
  } catch (error) {
     console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  
    
  }
}

//Logout User: /api/user/logout


export const Logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

   
    return res.json({
      success: true,
      message: " logged out successfully "
    });

  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: error.message
    });
  }
};

