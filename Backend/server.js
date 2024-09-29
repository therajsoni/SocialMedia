const app = require("./app.js");
const { connectDatabase } = require("./config/database.js");

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}`);
});
