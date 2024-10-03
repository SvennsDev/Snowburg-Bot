const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, PermissionsBitField, ChannelType, ButtonStyle } = require('discord.js');
const settings = require('../config.json');
const { create } = require('discord-timestamps')    
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        
        if (interaction.customId === `sendembed`) {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const question1 = interaction.fields.getTextInputValue('embedtitle');
            const question2 = interaction.fields.getTextInputValue('embedbericht');
            const question3 = interaction.fields.getTextInputValue('embedcolor');
            const ticketcreated = new EmbedBuilder()
                .setTitle(`${question1}`)
                .setDescription(`${question2}`)
                .setColor(`${question3}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                .setTimestamp()        
            const senbed = new EmbedBuilder()
                .setTitle(`📃 | Send!`)
                .setDescription(`Bericht is verstuurd.`)
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})                     
            interaction.reply({ embeds: [senbed], ephemeral: true });
            interaction.channel.send({ embeds: [ticketcreated] });
        }
        if (interaction.customId === `sendbericht`) {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const question2 = interaction.fields.getTextInputValue('embedbericht');
            const senbed = new EmbedBuilder()
                .setTitle(`📃 | Send!`)
                .setDescription(`Bericht is verstuurd.`)
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})                     
            interaction.reply({ embeds: [senbed], ephemeral: true });
            interaction.channel.send(question2);
        }        
    },
}
                                            