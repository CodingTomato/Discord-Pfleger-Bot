require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config');


const JSONbodyParser = require('body-parser');


const port = process.env.API_PORT;
const discordBot = require('./bot.js');
const logService = require('./log.js');

discordBot.start(process.env.PREFIX, process.env.DISCORD_BOT_TOKEN);

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

app.post('/api/startBot', function (req, res) {
  if(config.admin === req.body.password){
    return res.send(discordBot.start(process.env.PREFIX, process.env.DISCORD_BOT_TOKEN));
  }

  return res.send("Auth unsuccessfull");
});

app.post('/api/stopBot', function (req, res) {
  console.log(req.body);
  if(config.admin === req.body.password){
    res.send(discordBot.stop());
  } else {
    res.send("Auth unsuccessfull" + req.body.password);
  }
});

app.put('/api/exeCommand', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.exeCommand(req.body.msg);
    return res.send("Sent command");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.put('/api/addSilenceUser', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.addSilenceUser(req.body.userid);
    return res.send("Sent userid");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.put('/api/addStickyUser', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.addStickyUser(req.body.userid,req.body.channelid);
    return res.send("Sent userid and channelid");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.put('/api/removeStickyUser', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.removeStickyUser(req.body.userid);
    return res.send("Removed userid");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.post('/api/resetStickyUser', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.resetStickyUser();
    return res.send("Reset StickyUsers");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.post('/api/startStickyMover', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.startStickyMover();
    return res.send("Started Mover");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.post('/api/stopStickyMover', function (req, res) {
  if(config.admin === req.body.password){
    discordBot.stopStickyMover();
    return res.send("Stop Mover");
  } else {
    res.send("Auth unsuccessfull");
  }
});

app.post('/api/getChannelFromID', function (req, res) {
  let channel = {
    name: discordBot.getChannelFromID(req.body.channelid),
  }
  return res.send(channel);
});

app.listen(port, () => {
  logService.log(`Pfleger Bot API listening on port ${port}`);
})