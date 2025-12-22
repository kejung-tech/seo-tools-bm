// File: routes/aida.js
const express = require('express');
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

// POST /aida
router.post('/', (req, res) => {
  const { keyword, audience } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword diperlukan" });
  }

  const aidaContent = generateAIDA(keyword, audience);
  res.json({
    keyword,
    audience: audience || "pembaca umum Malaysia",
    aida: aidaContent
  });
});

module.exports = router;
