const router = require('express').Router();
const db = require('quick.db');
const client = require('../bot');
const Discord = require('discord.js');
const request = require('request');

router.get("/team-members", (req,res) => {
    res.render("team.ejs", {
        title: "Founders | SunLight",
        req: req,
        bot: client,
        user: req.user
    });
});
module.exports = router;
