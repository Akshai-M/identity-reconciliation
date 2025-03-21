import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js"; // ✅ Import only the function
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(express.json());

connectDB(); // ✅ Call it here instead of `db.js`

app.use("/identify", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
