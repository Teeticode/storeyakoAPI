import mongoose from "mongoose";

const connectDatabase = async () =>{
    const MONGO_URI = process.env.MONGO_DEVELOPMENT
    try{
        const connection = await mongoose.connect(MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("Mongo connected")
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDatabase