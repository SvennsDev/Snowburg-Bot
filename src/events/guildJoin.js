const { EmbedBuilder } = require('discord.js');
const settings = require('../config.json');
module.exports = {
    name: 'guildMemberAdd',
    execute(member) {

        let channel = member.guild.channels.cache.get(`1035191872504729710`);

        var joinuser = new EmbedBuilder()
            .setTitle(`👋 | Welkom!`)
            .setColor(`#e7ac3b`)
            .setDescription(`Welkom ${member}! Lees even de regels in <#1035191869824581632> voor dat je begint met chatten!`)
            .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

        channel.send({ embeds: [joinuser] });
        member.roles.add("1035191847888371772");
        console.log(`\u001b[1;36m[LOGGER]` + `\u001b[0m User: "${member}" joined`);        
    },
};