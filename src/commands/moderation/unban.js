const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { create } = require('discord-timestamps');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Unban')
		.addUserOption(option => option.setName('user').setDescription('Geef de speler op die je wilt unbannen').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de unban').setRequired(true)),		
	execute(interaction) {
		const user2 = interaction.options.getUser('user');
		const user = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		const banned = new EmbedBuilder()
			.setTitle(`🔨 | Unbanned`)
			.setDescription(`\n ${user2} is geunbanned!`)
			.addFields(
				{ name: `__User__`, value: `${user2}`},
				{ name: `__Moderator__`, value: `${interaction.user}`},
				{ name: `__Reason__`, value: `${reason}`},
			)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()					
		const banneduser = new EmbedBuilder()
			.setTitle(`🔨 | Unbanned`)
			.setDescription(`\n Je bent geunbanned uit **${interaction.guild.name}**!`)
			.addFields(
				{ name: `__User__`, value: `${user2}`},
				{ name: `__Moderator__`, value: `${interaction.user}`},
				{ name: `__Reason__`, value: `${reason}`},
			)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.guild.members.unban(user2);
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [banned] });
		return interaction.reply({ embeds: [banned]});		
	},
};