// File: aida.js
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/aida
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt diperlukan" });
    }

    console.log("AIDA request body:", req.body);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // atau model Groq lain yang anda guna [web:128][web:134]
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
`You are a marketing copywriter that writes AIDA copy in Malay for Malaysian audience.

Jawab HANYA dalam JSON valid dengan struktur:
{
  "keyword": "string ringkas tentang produk/topik",
  "audience": "ringkasan sasaran pembaca dalam Bahasa Melayu",
  "aida": {
    "attention": "teks 1–2 ayat",
    "interest": "teks 2–4 ayat",
    "desire": "teks 2–4 ayat",
    "action": "1–2 ayat ajak tindakan"
  }
}

Jangan tambah apa-apa teks di luar JSON.`
        },
        {
          role: "user",
          content: `Prompt pengguna: ${prompt}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      console.error("Gagal parse JSON dari Groq:", raw);
      return res.status(500).json({
        error: "Respons model bukan JSON sah",
        raw,
      });
    }

    if (!json.aida || !json.aida.attention) {
      console.warn("Respons AIDA tidak lengkap:", json);
      return res.status(500).json({
        error: "Respons AIDA tidak lengkap",
        raw: json,
      });
    }

    return res.json({
      keyword: json.keyword || "",
      audience: json.audience || "pembaca umum Malaysia",
      aida: json.aida,
    });
  } catch (err) {
    console.error("AIDA (Groq) API error:", err);
    return res.status(500).json({ error: "Ralat server Aida (Groq)" });
  }
});

export default router;
