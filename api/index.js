import express from "express";
import cors from "cors";
import meta from "./meta.js";

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("SEO Tools BM API is running");
});

// Route meta description
app.use("/api/meta", meta);

import title from "./title.js"; 

app.use("/api/title", title);

import keywords from "./keywords.js";

app.use("/api/keywords", keywords);

import faq from "./faq.js";

app.use("/api/faq", faq);

app.listen(3000, () => console.log("✅ SEO Tools BM API running on port 3000"));
