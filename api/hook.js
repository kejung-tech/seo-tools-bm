// File: hook.js
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { topic, platform } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "topic diperlukan" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
`Anda pakar copywriting media sosial.

Tugas:
- Tulis 5 hook pendek dalam Bahasa Melayu.
- Sesuai untuk platform: ${platform || "Instagram Reels / TikTok / Facebook / Threads / Youtube Shorts"}.
- Target: audience Malaysia.
- Panjang setiap hook: maks 1–2 baris.
- Gaya: direct, buat orang berhenti scroll, tidak perlu hashtag, gaya penulisan manusia, warga Malaysia.

Format jawapan (JSON):

{
  "topic": "topik ringkas",
  "platform": "nama platform",
  "hooks": [
    "hook 1",
    "hook 2",
    ...
  ]
}`
        },
        {
          role: "user",
          content: `Topik: ${topic}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      console.error("Hook JSON parse error:", raw);
      return res.status(500).json({ error: "Respons model bukan JSON sah", raw });
    }

    if (!Array.isArray(json.hooks)) {
      return res.status(500).json({ error: "Tiada senarai hooks dalam respons", raw: json });
    }

    res.json({
      topic: json.topic || topic,
      platform: json.platform || platform || "Reels/TikTok/Facebook",
      hooks: json.hooks
    });
  } catch (err) {
    console.error("Hook API error:", err);
    res.status(500).json({ error: "Ralat server Hook" });
  }
});

export default router;
