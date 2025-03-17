import mongoose from "mongoose";
export const connectdb = async()=>{
    try {
        const {connection} = await mongoose.connect(`${process.env.MONGOURI}`);
        return connection.host;

    } catch (error) {
        console.log("Error is : ",error);

    }
}
