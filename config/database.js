const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
let connection = async()=>{
    try{
        mongoose.connect(
            process.env.DB_LINK,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        console.log("connected to database");
    }
    catch(error){
        console.log(error.message)
    }
}
connection()