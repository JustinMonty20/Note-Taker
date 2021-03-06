const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express();
const PORT = process.env.PORT || 3005 
let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));


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
        res.json(JSON.parse(data))
    })
})

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let id;
    if (!savedNote.length) id = 0
    else id = savedNote[savedNote.length-1].id +1
    newNote.id = id
    savedNote.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNote));
    res.json(savedNote);
})

app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id
    const index = savedNote.findIndex(note=> note.id === parseInt(id))
    savedNote.splice(index, 1)
   fs.writeFile("./db/db.json", JSON.stringify(savedNote), err=>{
       if(err) throw err
       res.json(savedNote);
   });
} )


app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})

