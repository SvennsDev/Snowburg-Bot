const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const settings = require('../../config.json');
const answers = [
	'Het is zeker.',
	'Het is beslist zo.',
	'Zonder twijfel.',
	'Ja absoluut.',
	'Je kunt erop vertrouwen.',
	'As I see it, yes.',
	'Waarschijnlijk.',
	'Vooruitzichten goed.',
	'Ja.',
	'Tekenen wijzen op ja.',
	'Antwoord wazig, probeer het opnieuw.',
	'Vraag later opnieuw.',
	'Het is beter om het jou nu niet te vertellen.',
	'Kan nu niet voorspellen.',
	'Concentreer je en vraag het opnieuw.',
	'Reken er niet op.',
	'Mijn antwoord is nee.',
	'Mijn bronnen zeggen nee.',
	'Vooruitzichten niet zo goed.',
	'Erg twijfelachtig.'
  ];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('👤 | Stel een vraag aan de magic 8ball')
		.addStringOption(option => option.setName('question').setDescription('De vraag voor de magic 8ball').setRequired(true)
	),
	async execute(interaction, client) {
		const question = interaction.options.getString('question');	
		const ping = new EmbedBuilder()
			.setTitle(`🎱 | Magic 8-Ball`)
			.addFields(
				{name: `__Vraag__`, value: `${question}`},
				{name: `__Antwoord__`, value: `${answers[Math.floor(Math.random() * answers.length)]}`}
			)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: false});
	},
};