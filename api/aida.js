// File: aida.js
import express from "express";

const router = express.Router();

// Utility: Generate AIDA structure
function generateAIDA(keyword, audience = "pembaca umum Malaysia") {
  return {
    attention: `Rahsia ${keyword}: Cara Mudah Naikkan Trafik Blog Anda!`,
    interest: `Ramai ${audience} masih struggle dengan SEO. ${keyword} boleh jadi jalan pintas untuk capai lebih pembaca.`,
    desire: `Bayangkan blog anda muncul di page pertama Google. Dengan ${keyword}, anda boleh tarik lebih trafik dan peluang income.`,
    action: `Klik sini untuk cuba tool SEO BM percuma dan lihat hasilnya sendiri!`
  };
}

// POST /api/aida
router.post("/", (req, res) => {
  const { prompt, keyword, audience } = req.body;

  // Debug log untuk Render
  console.log("AIDA request body:", req.body);

  // Fallback: kalau keyword kosong, cuba ambil dari prompt
  const finalKeyword = keyword || (prompt ? prompt.split(" ")[0] : null);

  if (!finalKeyword) {
    return res.status(400).json({ error: "Keyword diperlukan" });
  }

  const aidaContent = generateAIDA(finalKeyword, audience);
  res.json({
    keyword: finalKeyword,
    audience: audience || "pembaca umum Malaysia",
    aida: aidaContent
  });
});

export default router;
