const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Unlock channel'),
	async execute(interaction, client) {

		const ping = new EmbedBuilder()
			.setTitle(`🔓 | Geopent!`)
			.setDescription(`\n Dit kanaal is geopent!`)
			.setColor(`${settings.defaultColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
					
		const log = new EmbedBuilder()
			.setTitle(`🔓| Kanaal geopent`)
			.addFields(
				{ name: `__Channel__`, value: `${interaction.channel}` },
				{ name: `__Moderator__`, value: `${interaction.member}` }
			)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true });
	
		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		channel.send({ embeds: [log] });		
		return interaction.reply({ embeds: [ping] });
	},
};