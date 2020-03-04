const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3005 

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res) => {
res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes",  (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) =>{
        if(err) {
            throw err
        } 
        return res.json(data);
    })
})




app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})

