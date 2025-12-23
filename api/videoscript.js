// videoscript.js - EXPRESS ROUTER VERSION
import { Router } from 'express';
import Groq from 'groq-sdk';

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST /api/videoscript/
router.post('/', async (req, res) => {
  try {
    console.log('📥 VideoScript request:', req.body);
    
    const { topic, platform = 'TikTok', duration = '60 saat' } = req.body;
    
    if (!topic) {
      return res.status(400).json({ 
        success: false, 
        error: 'Topic wajib diisi!' 
      });
    }

    // Groq API call
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Anda penulis skrip video pendek versi Malaysia (TikTok/Reels/Shorts) dalam Bahasa Melayu.

Tugas:
- Hasilkan skrip video 30–60 saat untuk platform: ${platform}.
- Gaya: laju, ringkas, sesuai penonton Malaysia.
- Jawab HANYA dalam JSON valid:

{
  "hook": "1–2 baris pembuka yang kuat",
  "intro": "1–2 baris memperkenalkan topik",
  "body": [
    "point 1 dalam bentuk dialog ringkas",
    "point 2 ...",
    "point 3 ..."
  ],
  "cta": "1–2 baris ajak tindakan",
  "hashtags": ["#Topik", "#Malaysia"]
}`
        },
        {
          role: "user",
          content: `Topik video: ${topic}. Durasi anggaran: ${duration || "60 saat"}.`
        }
      ]
    });

    const script = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    res.json({
      success: true,
      data: {
        ...script,
        topic,
        platform,
        duration,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ VideoScript error:', error.message);
    
    // Fallback response
    res.json({
      success: false,
      error: error.message,
      fallback: {
        hook: `🚀 ${topic.split(' ')[0]} ni penting tau!`,
        intro: `Nak settle ${topic.toLowerCase()} dalam ${duration}?`,
        body: [`Step 1: Mulakan sekarang`, `Step 2: Ikut tips ni`, `Step 3: Confirm berjaya!`],
        cta: `Follow untuk tips harian! 👆`
      }
    });
  }
});

export default router;
