import { client } from "./utils/db.js";
import express from "express";

async function init() {
  // เรียกใช้ Function `connect` จาก `client`
  // อย่าลืม `await` เนื่องจาก `connect`เป็น async
  await client.connect();
  const app = express();

  // สร้าง API Route สำหรับ GET: /movies
  app.get("/movies", async (req, res) => {
    // เลือก Database ที่ชื่อ `practice-mongo`
    const db = await client.db("practice-mongo");

    // เลือก Collection ที่ชื่อ `movies`
    const collection = db.collection("movies");

    // เริ่ม Query โดยใช้ `collection.find(query)`
    const movies = await collection
      .find({ year: 2008 })
      .limit(10) // limit the result documents by 10
      .toArray(); // convert documents into an array

    // ส่ง Response กลับไปหา Client
    return res.json({ data: movies });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
  });
}

init();
