const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content:
`Anda penulis skrip video pendek (TikTok/Reels/Shorts) dalam Bahasa Melayu.

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
  "cta": "1–2 baris ajak tindakan (follow/klik link dsb.)"
}`
    },
    {
      role: "user",
      content: `Topik video: ${topic}. Durasi anggaran: ${duration || "60 saat"}.`
    }
  ]
});
