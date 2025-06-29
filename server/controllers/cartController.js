
import User from "../models/user.js"

// update User cartData:/api/user/update



 const updateCart = async(req,res)=>{
    try {
        const {userId,cartItems} = req.body;

        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({
            success:true, message:"cart Updated"
        })

        
    } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message
    });
  
        
    }
}
export default updateCart;