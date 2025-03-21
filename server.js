import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js"; 
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(express.json());

connectDB(); 

app.use("/", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
