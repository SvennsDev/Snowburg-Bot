const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leden')
		.setDescription('👤 | Hoeveel leden hebben we nu?'),
	async execute(interaction, client) {
		const ping = new EmbedBuilder()
			.setTitle(`📊 | Leden!`)
			.setDescription(`We hebben nu **${interaction.guild.memberCount}** leden!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.reply({ embeds: [ping] });
	},
};