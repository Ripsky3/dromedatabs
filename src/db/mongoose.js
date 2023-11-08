const mongoose = require("mongoose");

try {
    // Connect to the MongoDB cluster
    mongoose.connect("mongodb+srv://MyDatabase:MongoDatabase@cluster0.u5xvxuz.mongodb.net/",
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
      
    );
    console.log("Connected to mongoose!")

  } catch (e) {
    console.log("could not connect");
  }



