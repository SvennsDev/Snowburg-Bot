const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('👤 | Verwijder iemand toe aan een ticket!')
		.addUserOption(option => option.setName('member').setDescription('Vul de persoon toe die je wilt verwijderen').setRequired(true)),
	execute(interaction) {
		const nochannel = new EmbedBuilder()
			.setTitle(`⛔ | Oeps!`)
			.setDescription(`\n Dit is geen ticket kanaal`)
			.setColor(`${settings.dangerColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		if (!interaction.channel.parentId === settings.ticketCategory) return interaction.reply({ embeds: [nochannel], ephemeral: true });
	
		const user2 = interaction.options.getUser('member');
		const user = interaction.options.getMember('member');


		const added = new EmbedBuilder()
			.setTitle(`➖ | Verwijderd`)
			.setDescription(`\n ${user2} is verwijderd van het ticket`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		const addedDM = new EmbedBuilder()
			.setTitle(`➖ | Verwijderd`)
			.setDescription(`\n Je bent van het ticket ${interaction.channel} afgehaald door ${interaction.user}`)
			.setColor(`${settings.warningColor}`)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		interaction.channel.permissionOverwrites.edit(user.id, { VIEW_CHANNEL: false });
		user2.send({ embeds: [addedDM] }).catch(async err => {
			const cannotdm = new EmbedBuilder()
				.setTitle(`⛔ | Oeps!`)
				.setDescription(`\n Ik kan ${user} niet dmen! \n ${user} heeft zijn DM's uistgeschakeld of ik heb geen toegang tot zijn DM's!`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
			interaction.channel.send({ embeds: [cannotdm]});
		});
		return interaction.reply({ embeds: [added]});		
	},
};