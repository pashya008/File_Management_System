// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));
// app.use(express.static(path.join(__dirname, 'public'))); //they give the file path

// app.set('view engine', 'ejs');  //use for render the pages

// app.get("/", function (req,res) {
//     res.render("index");
// })

// app.get("/profile/:username", function (req, res) {
//     res.send(req.params.username)
// })

// app.listen(3000, function (req, res) {
//     console.log("its run");
// });


const express = require('express');
const path = require('path');
const fs = require('node:fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public'))); //they give the file path

app.set('view engine', 'ejs');  //use for render the pages

app.get("/", function (req,res) {
    fs.readdir(`./files`,function (err,files) {
        res.render("index", {files: files});      
    })
})

app.get("/files/:filename",function (req,res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8",  function (err, filedata) {
        res.render('show' , {filename: req.params.filename , filedata:filedata});
    })
})

app.get("/edit/:filename", function (req, res) {
    res.render('edit',{filename: req.params.filename});
})

app.post("/edit", function (req, res) {
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, function (err) {
        res.redirect("/");
    })
})

app.post("/create", function (req,res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,
     req.body.details, function (err) {
        res.redirect("/")
    });
})

app.listen(3000, function (req, res) {
    console.log("its run");
});
