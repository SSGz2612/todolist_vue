const express = require('express');
const dataTask = require('./dataTask.json');

const app = express();
const port = process.env.PORT || 4000; 

app.use(express.json());

app.get("/", (req, res) => {
    res.send(dataTask);
});

app.listen(port, () => {
    console.log(`listening at the port ${port}`);
});