const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb+srv://courseonline:OVMNnUfMZuXJy54J@cluster0.x0kzz.mongodb.net/courses?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,

         });
        console.log("Connect successfully!!!");
    }catch (error) {
        console.log("Connect failure!!!");
    }
} 
module.exports = { connect };
