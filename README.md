# 🚀 SEO Tools BM API by Sekejung.com

**SEO Tools BM** ialah projek open-source dari [Sekejung.com](https://sekejung.com), dibina khas untuk blogger Malaysia.  
Matlamatnya: memudahkan pencipta kandungan menghasilkan artikel yang **mesra SEO**, **persuasive**, dan **premium** dengan gaya copywriting moden.

---

## ✨ Features

- `/api/meta` → Generate meta description  
- `/api/title` → Generate SEO-friendly titles  
- `/api/keywords` → Suggest relevant keywords  
- `/api/faq` → Generate FAQ section  
- `/api/outline` → Generate article outline  
- `/api/og` → Generate Open Graph tags  
- `/api/aida` → Generate AIDA copywriting (Attention, Interest, Desire, Action)  

---

## 📦 Installation

```bash
git clone https://github.com/kejung-tech/seo-tools-bm.git
cd seo-tools-bm
npm install

▶️ Usage

Start server:
npm start

Server akan berjalan di http://localhost:3000.

🔗 API Example

Generate AIDA Copywriting

Request:

POST http://localhost:3000/api/aida
Content-Type: application/json

{
  "keyword": "SEO Blogger Malaysia",
  "audience": "blogger baru"
}

Response:

{
  "keyword": "SEO Blogger Malaysia",
  "audience": "blogger baru",
  "aida": {
    "attention": "Rahsia SEO Blogger Malaysia: Cara Mudah Naikkan Trafik Blog Anda!",
    "interest": "Ramai blogger baru masih struggle dengan SEO. SEO Blogger Malaysia boleh jadi jalan pintas untuk capai lebih pembaca.",
    "desire": "Bayangkan blog anda muncul di page pertama Google. Dengan SEO Blogger Malaysia, anda boleh tarik lebih trafik dan peluang income.",
    "action": "Klik sini untuk cuba tool SEO BM percuma dan lihat hasilnya sendiri!"
  }
}

🎨 UI/UX Vision

Dark mode support

Tron-inspired glowing card design

Copy button untuk setiap output

Loading spinner untuk pengalaman premium

Branding penuh: Sekejung.com

🛣 Roadmap

[x] Meta, Title, Keywords, FAQ, Outline, OG endpoints

[x] AIDA copywriting endpoint

[x] Donation (Buy Me a Coffee, DuitNow QR)

[ ] Analytics & auto-save history

[ ] Community sharing features

📜 License

MIT License © Sekejung.com

