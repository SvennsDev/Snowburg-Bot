const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        if(message.author.bot) return;

        if (message.channel.id === settings.suggestionChannelID) {
            message.delete()
                                    
            const threadAuthor = message.member.displayName;
            const suggestie = new EmbedBuilder()
                .setTitle(`💡 | Suggestie`)
                .setDescription(`\n\n ${message}`)
                .setColor(`${settings.warningColor}`)
                .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}`})
            
            message.channel.send({ embeds: [suggestie]})
                .then(function (message) {
                    message.react("👍")
                    message.react("👎")
                    message.startThread({
                        name: `Suggestie van ${threadAuthor}`,
                        autoArchiveDuration: 60,
                        type: 'GUILD_PUBLIC_THREAD'
                    });                    
                })
        }
    }
};