require('dotenv').config();

const express = require('express');
const fs = require('fs')
const https = require('https')
const cors = require('cors');
const app = express();


const JSONbodyParser = require('body-parser');


const port = process.env.API_PORT;
const discordBot = require('./bot.js');
const logService = require('./log.js');

discordBot.start(process.env.STANDARD_PREFIX, process.env.DISCORD_BOT_TOKEN);

app.use(JSONbodyParser.urlencoded({ extended: false }));
app.use(JSONbodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.get('/api/getClient', function (req, res) {
  res.send(discordBot.getClient());
});

app.get('/api/getStatus', function (req, res) {
  res.send(discordBot.getStatus());
});

app.get('/api/getCommands', function (req, res) {
  res.send(discordBot.getCommands());
});

app.get('/api/getLogs', function (req, res) {
  res.send(logService.getLogs());
});

app.get('/api/startBot', function (req, res) {
  res.send(discordBot.start(process.env.PREFIX, process.env.DISCORD_BOT_TOKEN));
});

app.get('/api/stopBot', function (req, res) {
  res.send(discordBot.stop());
});

app.put('/api/exeCommand', function (req, res) {
  discordBot.exeCommand(req.body.msg);
  return res.send("Sent command");
});

app.put('/api/addSilenceUser', function (req, res) {
  discordBot.addSilenceUser(req.body.userid);
  return res.send("Sent userid");
});

https.createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
}, app).listen(port, () => {
  logService.log(`Pfleger Bot API listening on port ${port} (HTTPS)`)
})