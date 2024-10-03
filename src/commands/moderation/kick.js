const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Kick')
		.addUserOption(option => option.setName('member').setDescription('Vul de speler in die je wilt kicken').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de kick').setRequired(true)),		
	execute(interaction) {
		const user2 = interaction.options.getUser('member');
		const user = interaction.options.getMember('member');
		const reason = interaction.options.getString('reason');

		const kicked = new EmbedBuilder()
			.setTitle(`📤 | Kicked`)
			.setDescription(`\n ${user2} is gekicked!`)
			.addFields(
				{ name: 'User', value: `${user2}`},
				{ name: 'Moderator', value: `${interaction.user}`},
				{ name: 'Reason', value: `${reason}`},
			)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		const kickeduser = new EmbedBuilder()
			.setTitle(`📤 | Kicked`)
			.setDescription(`\n Je bent gekicked uit de ${interaction.guild.name}!`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		user.send({ embeds: [kickeduser]}).catch(async err => {
			const cannotdm = new EmbedBuilder()
				.setTitle(`⛔ | Kan niet DMen`)
				.setDescription(`\n Ik kan ${user} niet dmen!`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
			interaction.channel.send({ embeds: [cannotdm]});
		});			
		user.kick();
		console.log(`\u001b[1;31m[KICKED] ` + `\u001b[0m${user2.tag} is gekicked in ${interaction.guild.name}`);
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [kicked] });
		return interaction.reply({ embeds: [kicked]});		
	},
};