import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: "Sila masukkan keyword" });
  }

  const prompt = `
Hasilkan 10 tajuk artikel Bahasa Melayu yang menarik dan clickbait.
Keyword utama: ${keyword}
Nada: mesra, informatif, sesuai untuk blog
Format: senarai bernombor
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
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
