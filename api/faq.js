import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Sila masukkan topic" });
  }

  const prompt = `
Hasilkan FAQ Schema (JSON-LD) untuk topik berikut:
Topik: ${topic}

Format:
- Output MESTI dalam JSON-LD
- Gunakan Bahasa Melayu
- 4 hingga 6 soalan
- Jangan tambah penjelasan luar
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
