var express = require('express');
var router = express.Router();
const fs = require('fs');

const RecepiesFile = './data/recepies.json';

/* GET users listing. */
router.route('/')
    .get((req, res) => {
        fs.readFile(RecepiesFile, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send(`There was a problem reading the file.`);
                return;
            }
            res.json(JSON.parse(data));
        })
    })
router.get('/:id', (req, res) => {
    fs.readFile(RecepiesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file.');
            return;
        }

        const recepiesArray = JSON.parse(data);
        const recepieID = recepiesArray.find(receipie => receipie.id === parseInt(req.params.id));

        if (!recepieID) {
            res.status(404).send('Vegetable not found');
            return;
        }

        res.json(recepieID);
    })
})
router.get('/random', (req, res) => {
    fs.readFile(RecepiesFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('There was a problem reading the file.');
            return;
        }

        const recepiesArray = JSON.parse(data);
        // const recepieID = recepiesArray.find(receipie => receipie.id === parseInt(req.params.id));
        let randomValue = recepiesArray[Math.floor(Math.random() * recepiesArray.length)];


        if (!randomValue) {
            res.status(404).send('Recepie not found');
            return;
        }

        res.json(randomValue);
    })
})
module.exports = router;