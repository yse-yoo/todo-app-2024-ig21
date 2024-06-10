const express = require('express');
const cors = require('cors');

const port = 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, api server');
})

// サーバ待機（server listen)
app.listen(port, () => {
    console.log(`Server listen http://localhost:${port}`)
});
