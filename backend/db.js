const mongoose = require('mongoose');
//const mongoURI = 'mongo "mongodb+srv://inotebook.oxcohmx.mongodb.net/myFirstDatabase" --username test'
// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log("Connected to Mongo Successfully");
//     })
// }

const connectToMongo = async()=>{
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/inoteBook");
        console.log("db is connected");
    }
    catch(error){
        console.log("db is not connected");
        console.log(error.message);
    }
};

module.exports = connectToMongo;