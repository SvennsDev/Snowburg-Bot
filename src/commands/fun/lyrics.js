const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('👤 | Krijg de songtekst van een liedje')
		.addStringOption(option => option.setName('song').setDescription('Van welk nummer wilt jij de songtekst').setRequired(true)),
	async execute(interaction, client) {
		const error = new EmbedBuilder()
			.setTitle(`⛔ | Oeps`)
			.setDescription(`\n Er ging iets mis met het krijgen van de songtekst \nJe hebt waarschijnlijk een verkeerd nummer in gevoerd!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
		const song = interaction.options.getString('song');    
		var replaced = song.split(' ').join('_');   
		console.log(replaced);
		const url = `https://some-random-api.ml/lyrics?title=${replaced}`;
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			console.log(e);	
			return interaction.reply({ embeds: [error], ephemeral: true });
		}

		try {
			const embed = new EmbedBuilder()
				.setTitle(`🎵 | Lyrics | ${image.title}`)
				.setDescription(`\n ${image.lyrics} \n \n [Klik Hier](${image.links.genius}) Om Naar De Songtekst Te Gaan`)
				.setAuthor({ name: `${image.author}`, iconURL: `${image.thumbnail.genius}`})
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			return interaction.reply({ embeds: [embed], ephemeral: false});
		} catch (e) {
			console.log(e);
			return interaction.reply({ embeds: [error], ephemeral: true });
		}
	},
};