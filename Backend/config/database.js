const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL,{
        dbName : process.env.DATABASE_NAME
    })
    .then((connection) => {
      console.log(`${connection.connection.host} : ${process.env.DATABASE_NAME}`);
    })
    .catch((error) => {
      console.log(`${error}`);
    });
};
