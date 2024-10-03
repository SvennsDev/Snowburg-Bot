const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Slowmode')
		.addNumberOption(option => option.setName('seconds').setDescription('Hoelang moet de slowmode zijn (IN SECONDES)').setRequired(true)),		
	execute(interaction, client) {
		const seconds = interaction.options.getNumber('seconds');
		//console.log(seconds);
		if (seconds === 0) {
			const kicked = new EmbedBuilder()
				.setTitle(`⌛ | Slowmode`)
				.setDescription(`\n Je hebt slowmode **uitgezet**\n`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})


				const log = new EmbedBuilder()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **uitgezet**\n`)
					.addFields(
						{ name: `Slowmode`, value: `${seconds} seconds` },
						{ name: `Moderator`, value: `${interaction.member}` },
						{ name: `Channel`, value: `${interaction.channel}` }
					)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
				
			let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
			channel.send({ embeds: [log] });							
			interaction.channel.setRateLimitPerUser(seconds)
			return interaction.reply({ embeds: [kicked]});
		} else {
				const kicked = new EmbedBuilder()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **aangezet**\n`)
					.addFields({name: `Slowmode`, value: ` **${seconds}** seconds `})
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

				const log = new EmbedBuilder()
					.setTitle(`⌛ | Slowmode`)
					.setDescription(`\n Slowmode is **aangezet**\n`)
					.addFields(
						{ name: `Slowmode`, value: `${seconds} seconds` },
						{ name: `Moderator`, value: `${interaction.member}` },
						{ name: `Channel`, value: `${interaction.channel}` }
					)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})					
					
				let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
				channel.send({ embeds: [log] });						
				interaction.channel.setRateLimitPerUser(seconds)
				return interaction.reply({ embeds: [kicked]});			
			}
	},
};