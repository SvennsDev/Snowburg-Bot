const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, MessageButton, StringSelectMenuBuilder } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('applypanel')
		.setDefaultMemberPermissions(8)
		.setDescription('🔧 | Apply Panel'),
	async execute(interaction, client) {
		const options = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('apply-options')
					.setPlaceholder('Selecteer een optie')
					.setMinValues(1)
    				.setMaxValues(1)
					.addOptions(
						{
							label: `Staff Sollicitatie`,
							description: `Voor een staff sollicitatie`,
							emoji: `💼`,
							value: 'staff-apply',
						},				
						{
							label: 'Bouwer Sollicitatie',
							description: 'Voor een bouwer sollicitatie',
							emoji: '🧱',
							value: 'bouwer-apply',
						},						
						{
							label: 'Marketing Sollicitatie',
							description: 'Voor een marketing sollicitatie',
							emoji: '📸',
							value: 'marketing-apply',
						},
						{
							label: 'Artist Sollicitatie',
							description: 'Voor een artist sollicitatie',
							emoji: '🖌',
							value: 'artist-apply',
						},	
						{
							label: 'Developer Sollicitatie',
							description: 'Voor een developer sollicitatie',
							emoji: '💰',
							value: 'developer-apply',
						},															
					),
			);
		const ticketpanel = new EmbedBuilder()
			.setTitle(`💼 | Sollicitaties`)
			.setDescription(`\n Om een sollicitatie te maken moet je een van de onderstaande opties kiezen.`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.channel.send({ embeds: [ticketpanel], components: [options] });
	},
};