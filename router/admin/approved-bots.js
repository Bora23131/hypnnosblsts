const express = require('express');
const router = require('express').Router();
const db = require('quick.db');
const path = require("path");
const client = require('../../bot');
const ms = require('ms');

console.log("[Loading] : Admin - Approved Bots router loading...");

router.get("/approved-bots", (req,res) => {
    if (!req.user) return res.redirect("/auth/login");
    let guild = client.guilds.cache.get("766340643617767485");
    let member = guild.members.cache.get(req.user.id);
    let page = req.query.page || 1;
    if (!member) return res.redirect("/");
    if (!member.roles.cache.get("788517834116169779")) return res.redirect("/");
    //if (page < 1 || (page != Math.ceil(Object.values(db.get("bots")).filter(b => b.status > 0).length / 1) && Object.values(db.get("bots")).filter(b => b.status > 0).length > 0)) return res.redirect(`/admin/approved-bots?page=1`);
    res.render("admin/approved-bots.ejs", {
        user: req.user,
        db: db,
        page: page,
        bot: client,
    });
});

module.exports = router;