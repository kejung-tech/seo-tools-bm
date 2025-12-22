import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, image, url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Sila masukkan title dan description" });
  }

  const prompt = `
Hasilkan OG Tags (Open Graph) dalam format HTML.
Bahasa: Melayu
Input:
- Title: ${title}
- Description: ${description}
- Image: ${image || "gunakan placeholder jika tiada"}
- URL: ${url || "gunakan placeholder jika tiada"}

Format:
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
<meta property="og:type" content="article">
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    return res.json({
      result: data.choices?.[0]?.message?.content || "Tiada output"
    });

  } catch (err) {
    return res.status(500).json({ error: "Ralat server", details: err.message });
  }
});

export default router;
