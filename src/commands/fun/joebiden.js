const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joebidentweet')
		.setDescription('👤 | Laat Joe Biden iets tweeten')
		.addStringOption(option => option.setName('message').setDescription('Het bericht dat hij gaat tweeten').setRequired(true)),
	async execute(interaction, client) {
		const error = new EmbedBuilder()
			.setTitle(`⛔ | Oeps`)
			.setDescription(`\n Er ging iets fout bij het krijgen van de tweet! \nDe API is waarschijnlijk offline!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
		const message = interaction.options.getString('message');    
		var replaced = message.split(' ').join('+');   
		const url = `https://api.popcat.xyz/biden?text=${replaced}`;
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		const embed = new EmbedBuilder()
			.setTitle(`:flag_us: | Joe Biden Tweet`)
            .setImage(url)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.reply({ embeds: [embed], ephemeral: false});
	},
};