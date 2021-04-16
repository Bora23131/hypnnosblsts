const router = require('express').Router();
const db = require('quick.db');
const request = require('request')
const client = require('../bot.js');

db.delete("control");
console.log("[Loading] : Edit Bot router loading...");

router.get("/bot/:id/edit", (req,res) =>{
    try {
        let guild = client.guilds.cache.get("766340643617767485");
        let member = guild.members.cache.get(req.user.id);
        let botdata = db.get(`bots.${req.params.id}`);
        if (!req.user || (!botdata.owners.includes(req.user.id) && !member.roles.cache.get("794265637312397342") && botdata.owner != req.user.id)) {
            res.redirect("/");
            return;
        }
        res.render("bot-edit.ejs",{
            title: "Edit your Bot | SunLight",
            user: req.user,
            req: req,
            data: botdata,
            bot: client
        });
    } catch (error) {
        res.redirect("/");
    }
});

router.post("/bots/edit/:id", async (req,res) => {
    try {
        let guild = client.guilds.cache.get("766340643617767485");
	
    let member = guild.members.cache.get(req.user.id);
    let botdata = db.get(`bots.${req.params.id}`);
    if (!req.user) return res.redirect("/auth/login");
    if (!botdata) return res.redirect("/");
    if (!req.user || (!botdata.owners.includes(req.user.id) && !member.roles.cache.get("794265637312397342") && botdata.owner != req.user.id)) {
        res.redirect("/");
        return;
    }
    let data = req.body;
    data.id = req.params.id;
    let errors = {isError: false};
 
    if (!data.prefix.length) {
        errors.isError = true;
        errors.prefix = "Prefix Girmelisin";
    }

    if (!data.tags) {
        errors.isError = true;
        errors.tags = "Bir etiket seçmelisin.";
    } else {
        if (data.tags.split(",").length > 6) {
            errors.isError = true;
            errors.tags = "En fazla 6 farklı etiket seçebilirsin.";
        }
    }

    if (data.owners && data.owners.split(",").includes(req.user.id) && data.owner == req.user.id) {
        errors.isError = true;
        errors.selfowner = "Kendini diğer sahip bölümüne ekleyemezsin.";
    }
    
    if (data.owners && data.owners.split(",").length > 4) {
        errors.isError = true;
        errors.owners = "En fazla 4 Sahip ekleyebilirsin";
    }

    if (!data.shortDescription) {
        errors.isError = true;
        errors.short = "Kısa açıklama girmelisin.";
    } else {
        if (data.shortDescription.length >= 70) {
            errors.isError = true;
            errors.short = "Kısa açıklama en fazla 70 karakter olmalı.";
        }
        if (data.shortDescription.length <= 50) {
            errors.isError = true;
            errors.short = "Kısa açıklama 50 karakterden fazla olmamalı";
        }
    }

    if (!data.detailedDescription) {
        errors.isError = true;
        errors.long = "Uzun açıklama girmelisin.";
    } else {
        if (data.detailedDescription.length < 70) {
            errors.isError = true;
            errors.long = "Uzun açıklama en az 70 karakter içermeli. ";
        }
    }

    if (errors.isError === false) {
        db.set(`bots.${req.params.id}.prefix`, data.prefix);
        db.set(`bots.${req.params.id}.tags`, data.tags);
        db.set(`bots.${req.params.id}.inviteLink`, data.inviteLink);
        db.set(`bots.${req.params.id}.owners`, data.owners);
        db.set(`bots.${req.params.id}.website`, data.website);
        db.set(`bots.${req.params.id}.shortDescription`, data.shortDescription);
        db.set(`bots.${req.params.id}.detailedDesc`, data.detailedDescription);
        res.send(errors);
    } else {
        res.send(errors);
    }
    } catch (error) {
        
    }
})

module.exports = router;