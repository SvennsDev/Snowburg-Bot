const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('👤 | Kop of munt?'),
	execute(interaction, client) {
		const n = Math.floor(Math.random() * 2);
		let result;
		if (n === 1) result = 'Kop';
		else result = 'Munt';		
		const ping = new EmbedBuilder()
			.setTitle(`🪙 | Kop of Munt!`)
			.setDescription(`\n Je hebt de munt gegooit en het is geworden \`\`${result}\`\``)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		return interaction.reply({ embeds: [ping], ephemeral: false});
	},
};