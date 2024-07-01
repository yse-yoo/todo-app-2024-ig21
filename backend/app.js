// ES6 import ES5 require
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes/todoRoutes.js を読み込み
const todoRoutes = require('./routes/todoRoutes');
// todoRoutesを利用 
// /api は共通
app.use('/api', todoRoutes);

// Routing
app.get('/', async (req, res) => {
    // res.json({ message: 'Hello, api server' });
    try {
        await prisma.$connect();
        res.json({ message: "Connected to the database successfully!" });
    } catch (error) {
        console.error("Failed to connect to the database", error);
    } finally {
        await prisma.$disconnect();
    }
})

// サーバ待機（server listen)
app.listen(PORT, HOST, () => {
    console.log(`Server listen http://${HOST}:${PORT}`)
});
