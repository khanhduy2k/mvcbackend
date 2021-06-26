const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://duykhanh:OxrORNR5wKe0DRun@posts.llbbe.mongodb.net/courses?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
        );
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}
module.exports = { connect };
