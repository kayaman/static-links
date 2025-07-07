const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const linksFilePath = path.join(__dirname, 'links.json');

app.get('/api/links', (req, res) => {
    fs.readFile(linksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading links file');
        }
        res.send(data);
    });
});

app.post('/api/links', (req, res) => {
    const newLink = req.body;
    fs.readFile(linksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading links file');
        }
        const links = JSON.parse(data);
        links.push(newLink);
        fs.writeFile(linksFilePath, JSON.stringify(links, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to links file');
            }
            res.status(201).send(newLink);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
