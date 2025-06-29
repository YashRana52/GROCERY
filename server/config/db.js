import mongoose from "mongoose";

const ConnectedDB = async(req,res)=>{
    try {

        mongoose.connection.on('connected',()=>console.log("Database Connected")
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/GREENCART`)
        
    } catch (error) {
        console.error(error.message);
        
        
    }

}
export default ConnectedDB;