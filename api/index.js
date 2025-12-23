import express from "express";
import cors from "cors";
import meta from "./meta.js";
import title from "./title.js";
import keywords from "./keywords.js";
import faq from "./faq.js";
import outline from "./outline.js";
import og from "./og.js";
import aida from "./aida.js";
import hook from "./hook.js";
import videoscript from "./videoscript.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://sekejung.com", "https://www.sekejung.com"],
  methods: ["GET", "POST", "OPTIONS"]
}));

// Root
app.get("/", (req, res) => {
  res.send("SEO Tools BM API is running");
});

// Routes
app.use("/api/meta", meta);
app.use("/api/title", title);
app.use("/api/keywords", keywords);
app.use("/api/faq", faq);
app.use("/api/outline", outline);
app.use("/api/og", og);
app.use("/api/aida", aida);
app.use("/api/hook", hook);
app.use("/api/videoscript", videoscript);

// Healthcheck
app.get("/health", (req, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ SEO Tools BM API running on port ${PORT}`));
