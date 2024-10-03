const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, EmbedBuilder, MessageButton, Modal, TextInputComponent } = require('discord.js');//const settings = require('../../../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verifypanel')
		.setDefaultMemberPermissions(8)
		.setDescription('💼 | Verify panel'),
	execute(interaction, client) {
		const ping = new EmbedBuilder()
			.setTitle(`👋 | Verify!`)
			.setDescription(`Welkom in de discord server. \n Om toegang te krijgen tot de server moet je eerst de regels door lezen. \n En als je dat hebt gedaan kan je op de knop hier onder klikken om toegang te krijgen tot de discord.`)
			.setColor(`#26cf00`)
			//.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		
		const verify = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('verify')
					.setLabel('Verify!')
					.setEmoji('📖')
					.setStyle('SUCCESS'),
			);                     

		interaction.channel.send({ embeds: [ping], components: [verify] });
	},
};