import express from "express";
import bodyParser from "body-parser";
import getImages from "./apod/index.mjs";


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static("src/public"));

app.get('/apod',getImages);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
