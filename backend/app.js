const express = require('express');
const dataTask = require('./dataTask.json');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

var generatoriD = 0;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(dataTask);
});

app.post("/", (req, res) => {
    if(req.body.id === 0){
        genNewId();
        req.body.id = generatoriD;
        const js = req.body;
        console.log(js);

        fs.readFile("dataTask.json", "utf-8", (e, dt) => {
            if(e) throw(e);

            let object = JSON.parse(dt);
            object.data.push(js);
            console.log(object);
            let newObject = JSON.stringify(object);
            console.log(newObject);

            fs.writeFile("dataTask.json", newObject, (e) => {
                if(e) throw(e);
            });
        });

        res.json({
            status: "success"
        });
    } else if(req.body.action === "delete"){
        // console.log("eliminemos el " + req.body.idToDelete);
        let val = req.body.idToDelete;
        idToDelete(val);
    }
        
});

app.listen(port, () => {
    console.log(`listening at the port ${port}`);
});

function genNewId(){
    for(let i = 0; i < dataTask.data.length; i++){
        if(dataTask.data.find((n) => n.id === i)){
            generatoriD += 1;
        } else {
            break;
        }
    }
}

function idToDelete(v){
    let pn = {
        data: dataTask.data.filter((n) => n.id !== v)
    };
    let newObject = JSON.stringify(pn);

    fs.writeFile("dataTask.json", newObject, (e) => {
        if(e) throw(e);
    });
}