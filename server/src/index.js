import express from "express";
import shopper from "./routes/shopper.js";
import seller from "./routes/seller.js";
import admin from "./routes/admin.js";

const app = express();

app.use(express.json());
app.use("/shopper", shopper);
app.use("/seller", seller);
app.use("/admin", admin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
