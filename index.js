const express = require('express');
const app = express();
const config = require('./config.json');
const tietokantakerros = require('./tietokanta/tietokantakerros.js');

app.use(express.static(__dirname + "/public/"));

const { host, port } = config;

// Expressin käyttöönotto
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/festarit', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeFestivaalit();
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/artistit', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeArtistit();
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

function getInputValue() {
    // Get the input element by its id
    var textField = document.getElementById("myTextField");
  
    // Get the value entered by the user
    var inputValue = textField.value;
  
    // Do something with the input value, for example, display it
    alert("You entered: " + inputValue);
}

app.get('/haeFestivaalinArtistit/:festivaali', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeFestivaalinArtistit(req.params.festivaali);
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/haeArtistinKaupungit/:data', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeArtistinKaupungit(req.params.data);
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/haeFestivaalinKaupunki/:data', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeFestivaalinKaupunki(req.params.data);
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/haeArtistinFestivaalit/:data', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeArtistinFestivaalit(req.params.data);
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/haeEnitenArtisteja', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeEnitenArtisteja();
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});

app.get('/haeFestivaalitAikajarjestyksessa', async (req, res) => {
    try {
        const festivals = await tietokantakerros.haeFestivaalitAikajarjestyksessa();
        res.json(festivals);
      } catch (error) {
        console.error('Error:', error);
      }
});


// Kuunnellaan porttia
app.listen(port, host, () => {
    console.log(`Palvelin käynnistetty osoitteessa ${host}:${port}`);
});
