const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('👤 | Krijg een slechte grap'),
	async execute(interaction, client) {
		const error = new EmbedBuilder()
			.setTitle(`⛔ | Oeps!`)
			.setDescription(`\n Er was een probleempje met het krijgen van een grap! \nDe API is waarschijnlijk offline`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})            
		const url = "https://some-random-api.ml/joke";
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		const embed = new EmbedBuilder()
			.setTitle(`😂 | Joke`)
			.setDescription(`\n ${image.joke}`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.reply({ embeds: [embed], ephemeral: false});
	},
};