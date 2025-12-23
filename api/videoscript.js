// api/videoscript.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateVideoScript = async (topic, platform = "TikTok", duration = "60 saat") => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Anda penulis skrip video pendek (TikTok/Reels/Shorts) dalam Bahasa Melayu.

Tugas:
- Hasilkan skrip video 30–60 saat untuk platform: ${platform}.
- Gaya: laju, ringkas, sesuai penonton Malaysia. Gunakan bahasa seharian, slang ringan.
- Struktur: Hook → Intro → 3-5 points → CTA kuat.
- Jawab HANYA dalam JSON valid tanpa teks tambahan:

{
  "hook": "1–2 baris pembuka yang STOP scroll (soalan/shock fact)",
  "intro": "1–2 baris perkenal topik + janji value",
  "body": [
    "Point 1: Masalah + penyelesaian ringkas",
    "Point 2: Fakta/tip praktikal",
    "Point 3: Contoh/real result",
    "Point 4: (optional) Warning/kebaikan"
  ],
  "cta": "Ajak tindakan: follow/save/share + link bio",
  "hashtags": ["#Topik", "#Malaysia", "#TipHarian"],
  "duration": "${duration}"
}`
        },
        {
          role: "user",
          content: `Topik video: "${topic}". 
Platform: ${platform}. 
Durasi: ${duration}. 
Buat skrip yang viral untuk penonton Malaysia!`
        }
      ]
    });

    const script = JSON.parse(completion.choices[0]?.message?.content || '{}');
    
    // Validasi & format output
    return {
      success: true,
      data: {
        ...script,
        topic,
        platform,
        generated_at: new Date().toISOString(),
        tokens_used: completion.usage?.total_tokens || 0
      }
    };

  } catch (error) {
    console.error('Groq API Error:', error.message);
    return {
      success: false,
      error: error.message,
      data: generateFallbackScript(topic, platform, duration)
    };
  }
};

const generateFallbackScript = (topic, platform, duration) => {
  // Fallback template jika Groq fail
  return {
    hook: `Eh tunggu! ${topic.split(' ')[0]} ni penting tau!`,
    intro: `Hari ni nak kongsi ${duration.toLowerCase()} cara settle ${topic.toLowerCase()}`,
    body: [
      `Step 1: Mulakan dengan ni je`,
      `Step 2: Elak buat salah ni`,
      `Step 3: Dah siap, confirm berjaya!`
    ],
    cta: `Save video ni! Follow untuk tips harian 🔥 Link bio`,
    hashtags: [`#${topic.replace(/\s+/g, '')}`, `#Malaysia`, `#LifeHack`],
    duration
  };
};

// Export untuk multiple usage
export const videoScriptHandlers = {
  generate: generateVideoScript,
  platforms: ['TikTok', 'Reels', 'Shorts', 'YouTube'],
  fallback: generateFallbackScript
};

export default generateVideoScript;  // Default export untuk index.js
