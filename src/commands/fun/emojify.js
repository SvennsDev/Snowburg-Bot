const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const settings = require('../../config.json');
const numberMap = {
	'0': ':zero:',
	'1': ':one:',
	'2': ':two:',
	'3': ':three:',
	'4': ':four:',
	'5': ':five:',
	'6': ':six:',
	'7': ':seven:',
	'8': ':eight:',
	'9': ':nine:',
  };
module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojify')
		.setDescription('👤 | Emojify een bericht')
		.addStringOption(option => option.setName('message').setDescription('Het bericht dat daar emojis word veranderd').setRequired(true)
		),
	async execute(interaction, client) {
		const message = interaction.options.getString('message');	
			
		if (!message) return interaction.reply({ embeds: [error], ephemeral: true });
		const emojified = message.split('').map(c => {
			if (c === ' ') return '     ';
			const emoji = numberMap[c.toLowerCase()];
			if (emoji) return emoji;
			return ` :regional_indicator_${c.toLowerCase()}:`;
		}).join('');

		const embed = new EmbedBuilder()
			.setTitle(`😀 | Emojify`)
			.setDescription(emojified)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		return interaction.reply({ embeds: [embed], ephemeral: false});
	},
};