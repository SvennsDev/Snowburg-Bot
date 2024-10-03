const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
//const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('👤 | Geef de ping van de bot'),
	execute(interaction, client) {
		const ping = new EmbedBuilder()
			.setTitle(`🏓 | Pong!`)
			.setDescription(`De ping van de bot is: \`\`${interaction.createdTimestamp - Date.now()}ms\`\``)
			//.setColor(`${settings.defaultColor}`)
			//.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: true});
	},
};