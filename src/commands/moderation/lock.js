const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton, PermissionsBitField  } = require('discord.js');
const settings = require('../../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Lock channel'),
	async execute(interaction, client) {
		const ping = new EmbedBuilder()
			.setTitle(`🔒 | Op slot!`)
			.setDescription(`\n Dit kanaal is op slot gezet!`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
					
		const log = new EmbedBuilder()
			.setTitle(`🔒 | Kanaal opslot`)
			.addFields(
				{ name: `__Channel__`, value: `${interaction.channel}` },
				{ name: `__Moderator__`, value: `${interaction.member}` }
			)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
			.setTimestamp()

		interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });

		let channel = interaction.guild.channels.cache.get(settings.auditChannelID);
		
		channel.send({ embeds: [log] });		
		return interaction.reply({ embeds: [ping] });
	},
};