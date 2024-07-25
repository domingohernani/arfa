import express from "express";
import furniture from "./routes/furniture.js";
import image from "./routes/image.js";
import model from "./routes/model.js";

const app = express();

app.use(express.json());
app.use("/", furniture);
app.use("/", image);
app.use("/", model);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
