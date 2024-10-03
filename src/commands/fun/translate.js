const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('👤 | Vertaal een bericht')
		.addStringOption(option =>
			option.setName('taal')
				.setDescription('De taal waarin je het bericht wilt vertalen')
				.setRequired(true)
				.addChoices(
					{ name: '🇬🇧 | Engels', value: 'trans_engels' },
					{ name: '🇩🇪 | Duits', value: 'trans_duits' },
					{ name: '🇫🇷 | Frans', value: 'trans_frans' },
					{ name: '🇹🇷 | Turks', value: 'trans_turks' },
					{ name: '🇲🇦 | Marokkaans', value: 'trans_marokkaans' },
				))		
		.addStringOption(option => option.setName('message').setDescription('Het bericht dat hij gaat vertalen').setRequired(true)),				
	async execute(interaction, client) {
		const error = new EmbedBuilder()
			.setTitle(`⛔ | Oeps`)
			.setDescription(`\n Er ging iets fout bij het vertalen van het bericht! \nDe API is waarschijnlijk offline!`)
			.setColor(`#ff001e`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
		const language = interaction.options.getString('taal');			
		const message = interaction.options.getString('message');    
		var replaced = message.split(' ').join('+');   
		if (language == "trans_engels") {
			const url = `https://api.popcat.xyz/translate?to=en&text=${replaced}`;
			try {
				response = await axios.get(url);
				image = response.data;
	
			} catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}
			const embed = new EmbedBuilder()
				.setTitle(`🇬🇧 | Vertalen`)
				.addFields({ name: '__Bericht:__', value: `${message}`, inline: false })
				.addFields({ name: '__Vertaald:__', value: `${image.translated}`, inline: false })
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (language === 'trans_duits') {
			const url = `https://api.popcat.xyz/translate?to=de&text=${replaced}`;
			try {
				response = await axios.get(url);
				image = response.data;
	
			} catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}
			const embed = new EmbedBuilder()
				.setTitle(`🇩🇪 | Vertalen`)
				.addFields({ name: '__Bericht:__', value: `${message}`, inline: false })
				.addFields({ name: '__Vertaald:__', value: `${image.translated}`, inline: false })
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (language === 'trans_frans') {
			const url = `https://api.popcat.xyz/translate?to=fr&text=${replaced}`;
			try {
				response = await axios.get(url);
				image = response.data;
	
			}
			catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}
			const embed = new EmbedBuilder()
				.setTitle(`🇫🇷 | Vertalen`)
				.addFields({ name: '__Bericht:__', value: `${message}`, inline: false })
				.addFields({ name: '__Vertaald:__', value: `${image.translated}`, inline: false })
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (language === 'trans_turks') {
			const url = `https://api.popcat.xyz/translate?to=tr&text=${replaced}`;
			try {
				response = await axios.get(url);
				image = response.data;
	
			}
			catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}
			const embed = new EmbedBuilder()
				.setTitle(`🇹🇷 | Vertalen`)
				.addFields({ name: '__Bericht:__', value: `${message}`, inline: false })
				.addFields({ name: '__Vertaald:__', value: `${image.translated}`, inline: false })
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			interaction.reply({ embeds: [embed], ephemeral: false});
		}
		if (language === 'trans_marokkaans') {
			const url = `https://api.popcat.xyz/translate?to=ar&text=${replaced}`;
			try {
				response = await axios.get(url);
				image = response.data;
	
			}
			catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}
			const embed = new EmbedBuilder()
				.setTitle(`🇲🇦 | Vertalen`)
				.addFields({ name: '__Bericht:__', value: `${message}`, inline: false })
				.addFields({ name: '__Vertaald:__', value: `${image.translated}`, inline: false })
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			interaction.reply({ embeds: [embed], ephemeral: false});
		}
	},
};