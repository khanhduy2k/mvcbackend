const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb+srv://duykhanh:gENglSwLA5eNSJNR@posts.llbbe.mongodb.net/courses?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });
        console.log("Connect successfully!!!");
    }catch (error) {
        console.log("Connect failure!!!");
    }
} 
module.exports = { connect };
