import mongoose from "mongoose";
import colors from "colors";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(colors.bold.bgGreen('Mongo db connected'))
    }
    catch (error) {
        console.log(colors.bold.bgRed('Mongo Db not connected', error))
    }
}

export default connectdb