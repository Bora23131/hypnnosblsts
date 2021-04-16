const router = require('express').Router();
const db = require('quick.db');
const request = require('request')
const client = require('../bot.js');

db.delete("control");
console.log("[Loading] : Submit Bot router loading...");

router.get("/bots/submit", (req, res) => {
    if (!req.user) return res.redirect("/auth/login");
    res.render("submit.ejs", {
        title: "Submit Bot | SunLight",
        user: req.user,
        req: req,
        bot: client
    });
});

router.post("/bots/submit", async (req, res) => {

    if (!req.user) {
        res.redirect("/auth/login")
        return;
    }
    let data = req.body;
    let errors = { isError: false };

    if (!data.id) {
        errors.isError = true;
        errors.id = "Bir ID girmelisin.";
    } else {
        if (data.id.length < 18) {
            errors.isError = true;
            errors.id = "Bot ID'si yanlış gibi gözüküyor...Kontrol et!";
        } else {
            let botControl = Object.values(db.get("bots") || {}).filter(d => d.id === data.id)[0];
            if (botControl) {
                errors.isError = true;
                errors.isAlreadyAddedContol = "Bu bot zaten sistemde bulunuyor.";
            }
        }
    }

    if (!data.prefix.length) {
        errors.isError = true;
        errors.prefix = "Bir prefix girmelisin.";
    }

    if (!data.tags) {
        errors.isError = true;
        errors.tags = "Botuna etiket seçmelisin.";
    } else {
        if (data.tags.split(",").length > 6) {
            errors.isError = true;
            errors.tags = "Max 6 farklı etiket seçebilirsin";
        }
    }

    if (data.owners && data.owners.split(",").includes(req.user.id)) {
        errors.isError = true;
        errors.selfowner = "Diğer sahiplere kendini ekleyemezsin.";
    }

    if (data.owners && data.owners.split(",").length > 4) {
        errors.isError = true;
        errors.owners = "En fazla 4 Diğer Sahip ekleyebilirsin.";
    }

    if (!data.shortDescription) {
        errors.isError = true;
        errors.short = "Kısa açıklama girmelisin.";
    } else {
        if (data.shortDescription.length >= 200) {
            errors.isError = true;
            errors.short = "Kısa açıklama en fazla 200 karakter olabilir..";
        }
        if (data.shortDescription.length <= 50) {
            errors.isError = true;
            errors.short = "Kısa açıklama en fazla 50 karakter olabilir.";
        }
    }

    if (!data.detailedDescription) {
        errors.isError = true;
        errors.long = "Uzun açıklama girmelisin.";
    } else {
        if (data.detailedDescription.length < 70) {
            errors.isError = true;
            errors.long = "Uzun açıklama en az 70 karakter olmalıdır";
        }
    }

    function random(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    if (errors.isError === false) {
        if (db.get(`users.${req.user.id}.ban-submitting-bots`) == true) {
            errors.isError = true;
            errors.ban = "Botunuz moderatorler tarafından banlanmış!";
            return;
        }
        try {
            let body = await client.users.fetch(data.id)
            if (body.username.includes("@")) {
                errors.isError = true;
                errors.username = "Botunuzun nicki <b>@</b> içeremez.";
                return;
            }
            if (!body.bot) {
                errors.isError = true;
                errors.isBot = "Belirttiğiniz ID Bir bota ait değil..";
            } else {
                let addBotData = {
                    id: body.id,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    shortDescription: data.shortDescription,
                    detailedDesc: data.detailedDescription,
                    tags: data.tags,
                    prefix: data.prefix,
                    website: data.website,
                    supportServer: data.supportServer,
                    inviteLink: data.inviteLink,
                    owner: req.user.id,
                    owners: data.owners,
                    votes: 0,
                    token: random(18),
                    invites: 0,
                    date: Date.now(),
                    rating: "0.0",
                    visitors: 0,
                    earning: 0,
                    status: 0
                };
                db.set(`bots.${body.id}`, addBotData);

                await client.channels.cache.get("795594355980107796").send(`:flag_us: ・ <@${req.user.id}> applied with the bot named **${addBotData.username + "#" + addBotData.discriminator}**\n\n:flag_tr: ・ <@${req.user.id}>  **${addBotData.username + "#" + addBotData.discriminator}** adlı botuyla başvuru yaptı! `)
                if (await client.users.cache.get(addBotData.owner)) {
                    await client.users.cache.get(addBotData.owner).send(`Hey <@${req.user.id}>, we received the application for **${addBotData.username + "#" + addBotData.discriminator}**. Please be patient...\nSelam <@${req.user.id}>! **${addBotData.username + "#" + addBotData.discriminator}** adlı botun sisteme başarıyla eklendi , lütfen sabırla bekleyiniz.\nBot Onay Sürecini **hızlandırmak** isterseniz , oy verebilirsiniz.\n https://top.gg/bot/727984646507462706/vote`)
                }
            }

        } catch (error) {
            errors.isError = true;
            errors.isBot = "Your ID is incorrect.";
            console.log(error)
        }
    }

    res.send(errors);
    /*if (errors.isError === false) {
        request({
            method: "GET",
            url: "https://discord.com/api/v7/users/"+ data.id,
            headers: {
                Authorization: "Bot Nzk1Njk4ODA0ODMzNTE3NTk4.X_NKQg.uUDWepzkB6m3lYL3uR7T-iPiz8Y"
            }
        }, function (err, request, body) {
            body = JSON.parse(body);

            let dbData = {
                message: body.message || null,
                bot: body.bot || false
            }
            db.set("control", dbData);
            if (!dbData.message && dbData.bot) {
                let addBotData = {
                    id: body.id,
                    username: body.username,
                    discriminator: body.discriminator,
                    avatar: body.avatar,
                    shortDescription: data.shortDescription,
                    detailedDesc: data.detailedDescription,
                    tags: data.tags,
                    prefix: data.prefix,
                    website: data.website,
                    supportServer: data.supportServer,
                    inviteLink: data.inviteLink,
                    owner: req.user.id,
                    owners: data.owners,
                    votes: 0,
                    token: random(18),
                    invites: 0,
                    date: Date.now(),
                    rating: "0.0",
                    visitors: 0,
                    earning: 0,
                    status: 0
                };
                db.set(`bots.${body.id}`, addBotData);

                client.channels.cache.get().send(`<@${req.user.id}> applied with the bot named **${addBotData.username + "#" + addBotData.discriminator}**`)
            }
        })
        setTimeout(() => {
            let control = db.get("control") || {};
            if (control.message === 'Unknown User') {
                    errors.isError = true;
                    errors.isBot = "Your ID is incorrect.";
                    db.delete("control");

            } else {
                if (control.bot === false) {
                    errors.isError = true;
                    errors.isBot = "Your ID does not belong to a bot.";
                }
                db.delete("control")
            }
        res.send(errors);
    }, 1000);
        
    } else {
        res.send(errors);
    }*/
})

module.exports = router;
