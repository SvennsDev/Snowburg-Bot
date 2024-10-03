const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Clear Mesages')
		.addNumberOption(option => option.setName('messages').setDescription(`Geef het getal op van hoeveel berichten je wilt verwijderen`).setRequired(true)),
	async execute(interaction) {
		const number = interaction.options.getNumber('messages');

		const ping = new EmbedBuilder()
			.setTitle(`📦 | Opruimen!`)
			.setDescription(`\n ${number} berichten zijn verwijderd!`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
	
		interaction.channel.bulkDelete(number)
		return interaction.reply({ embeds: [ping] });
	},
};