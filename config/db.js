const mongoose = require("mongoose");


const dbConnection = () => {

    try {

        mongoose.connect(`mongodb://${process.env.MONGO_URI}`);

        console.log("DataBase connected Successfully");

    } catch (err) {
        
    console.log("DataBase connection error");
    process.exit(1);

    };
};


module.exports = dbConnection;