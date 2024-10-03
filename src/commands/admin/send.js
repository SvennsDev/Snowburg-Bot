const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, MessageSelectMenu, TextInputStyle, MessageButton, ModalBuilder, TextInputBuilder } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDefaultMemberPermissions(8)
		.setDescription('💼 | Stuur een bericht naar een het kanaal')
		.addSubcommand(subcommand =>
			subcommand
				.setName('embed')
				.setDescription('📃 | Stuur een embed naar een het kanaal')
        )
		.addSubcommand(subcommand =>
			subcommand
				.setName('message')
				.setDescription('📃 | Stuur een message naar een het kanaal')
        ),				
	execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'embed') {
			const user = interaction.member
			const userid = interaction.member.id
			const username = interaction.member.user.tag

			const modal = new ModalBuilder()
			.setCustomId(`sendembed`)
			.setTitle(`📃 | Stuur een embed`)
		   
			
			const title = new TextInputBuilder()
				.setCustomId("embedtitle")
				.setLabel("Titel")
				.setRequired(true)
				.setStyle(TextInputStyle.Short);

			const message = new TextInputBuilder()
				.setCustomId("embedbericht")
				.setLabel("Het bericht dat je wilt sturen")
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph);
			
			const color = new TextInputBuilder()
				.setCustomId("embedcolor")
				.setLabel("Embed Kleur (#000000)")
				.setRequired(true)
				.setStyle(TextInputStyle.Short);
	
			const question1 = new ActionRowBuilder().addComponents(title);
			const question2 = new ActionRowBuilder().addComponents(message);
			const question3 = new ActionRowBuilder().addComponents(color);
		
			modal.addComponents(question1, question2, question3);
			
			interaction.showModal(modal);			
		}
		if (interaction.options.getSubcommand() === 'message') {
			const user = interaction.member
			const userid = interaction.member.id
			const username = interaction.member.user.tag

			const modal = new ModalBuilder()
			.setCustomId(`sendbericht`)
			.setTitle(`📃 | Stuur een embed`)
		   
			const message = new TextInputBuilder()
				.setCustomId("embedbericht")
				.setLabel("Het bericht dat je wilt sturen")
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph);
	
			const question2 = new ActionRowBuilder().addComponents(message);
		
			modal.addComponents(question2); 
			
			interaction.showModal(modal);			
		}			
	},
};