const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageButton, MessageSelectMenu, ActionRowBuilder, SelectMenuBuilder  } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticketpanel')
		.setDefaultMemberPermissions(8)
		.setDescription('🔧 | Ticket Panel'),
	async execute(interaction, client) {
		const options = new ActionRowBuilder()
		.addComponents(
			new SelectMenuBuilder()
				.setCustomId('ticket-options')
				.setPlaceholder('Selecteer een optie')
				.setMinValues(1)
				.setMaxValues(1)
				.addOptions([
					{
						label: 'Algemene Support',
						description: 'Voor algemene support',
						emoji: '📖',
						value: 'general-support',
					},
					{
						label: 'Report een Bug',
						description: 'Om een bug te reporten',
						emoji: '🐛',
						value: 'report-bug',
					},
					{
						label: 'Report een Speler',
						description: 'Om een speler te reporten',
						emoji: '🤬',
						value: 'report-user',
					},
					{
						label: 'Financiële Vragen',
						description: 'Voor alle financiële vragen',
						emoji: '💰',
						value: 'financial-questions',
					},
					{
						label: 'Overige Vragen',
						description: 'Voor andere vragen',
						emoji: '👀',
						value: 'other',
					},
				]),
		);
		const ticketpanel = new EmbedBuilder()
			.setTitle(`📨 | Tickets`)
			.setDescription(`\n Om een ticket te maken moet je een van de onderstaande opties selecteren!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.channel.send({ embeds: [ticketpanel], components: [options] });
	},
};