const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('watwiljeliever')
		.setDescription('👤 | Wat wil je liever?'),
	async execute(interaction, client) {
		const error = new EmbedBuilder()
			.setTitle(`⛔ | Oeps!`)
			.setDescription(`\n Er was een probleempje met het krijgen van een opties! \nDe API is waarschijnlijk offline`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})  
		const errortranslate = new EmbedBuilder()
			.setTitle(`⛔ | Oeps!`)
			.setDescription(`\n Er was een probleempje met het translaten van de opties! \nDe API is waarschijnlijk offline`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})  			          
		const url = "https://api.popcat.xyz/wyr";
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;

		} catch (e) {
			return interaction.reply({ embeds: [error], ephemeral: true });
		}
		var opt1s = image.ops1.split(' ').join('+'); 
		const opt1 = `https://api.popcat.xyz/translate?to=nl&text=${opt1s}`;  
		try {
			response1 = await axios.get(opt1);
			options1 = response1.data;
		} catch (e) {
			return interaction.reply({ embeds: [errortranslate], ephemeral: true });
		}
		var opt2s = image.ops2.split(' ').join('+'); 
		const opt2 = `https://api.popcat.xyz/translate?to=nl&text=${opt2s}`;  
		try {
			response2 = await axios.get(opt2);
			options2 = response2.data;
		} catch (e) {
			return interaction.reply({ embeds: [errortranslate], ephemeral: true });
		}		
		console.log(options1);
		console.log(options2);
		const embed = new EmbedBuilder()
			.setTitle(`❓ | Wat wil je liever`)
			.addFields({ name: '__Optie 1:__', value: `${options1.translated}`, inline: false })
			.addFields({ name: '__Optie 2:__', value: `${options2.translated}`, inline: false })
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.reply({ embeds: [embed], ephemeral: false})
		const message = await interaction.fetchReply();
			// Unicode emoji
		message.react('1️⃣');
		message.react('2️⃣');
	},
};