const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { create } = require('discord-timestamps');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('💼 | Ban')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addUserOption(option => option.setName('user').setDescription('Vul de speler in die je wilt bannen').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de ban').setRequired(true)),		
	execute(interaction) {
		const user2 = interaction.options.getUser('user');
		const user = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		const banned = new EmbedBuilder()
			.setTitle(`🔨 | Verbannen`)
			.setDescription(`\n ${user} is verbannen!`)
			.addFields(
				{ name: `__User__`, value: `${user}`},
				{ name: `__Moderator__`, value: `${interaction.user}`},
				{ name: `__Reason__`, value: `${reason}`},
			)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()					
		const banneduser = new EmbedBuilder()
			.setTitle(`🔨 | Verbannen`)
			.setDescription(`\n Je bent verbannen uit **${interaction.guild.name}**!`)
			.addFields(
				{ name: `__User__`, value: `${user}`},
				{ name: `__Moderator__`, value: `${interaction.user}`},
				{ name: `__Reason__`, value: `${reason}`},
			)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		user.send({ embeds: [banneduser]}).catch(async err => {
			const cannotdm = new EmbedBuilder()
				.setTitle(`⛔ | Oeps`)
				.setDescription(`\n Ik kan ${user} niet dmen!`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
			interaction.channel.send({ embeds: [cannotdm]});
		});			
		interaction.guild.members.ban(user2);
		console.log(`\u001b[1;31m[BANNED] ` + `\u001b[0m${user.tag} is gebanned in ${interaction.guild.name}`);
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [banned] });
		return interaction.reply({ embeds: [banned]});		
	},
};