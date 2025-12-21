import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SEO Tools BM API is running");
});

app.listen(3000, () => console.log("✅ SEO Tools BM API running on port 3000"));

