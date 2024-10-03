const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton, Client, MessageAttachment, MessageSelectMenu } = require('discord.js');
const settings = require('../../config.json');
const discordTranscripts = require('discord-html-transcripts');
const { create } = require('discord-timestamps')    
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDescription('💼 | Sluit een ticket!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('ticket')
				.setDescription('💼 | Sluit een ticket!')
        )		
		.addSubcommand(subcommand =>
			subcommand
				.setName('sollicitatie')
				.setDescription('💼 | Sluit een sollicitatie!')
        ),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === 'ticket') {
			const nochannel = new EmbedBuilder()
				.setTitle(`⛔ | Oeps!`)
				.setDescription(`\n Dit is geen ticket kanaal`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			if (!interaction.channel.parentId === settings.ticketCategory) return interaction.reply({ embeds: [nochannel], ephemeral: true });
		
			const user = interaction.member
			const userid = interaction.member.id
			const username = interaction.member.user.tag
			console.log(`${interaction.channel.topic}`)
			const ticketcreated = `${interaction.channel.topic}`
			let auditchannel = interaction.guild.channels.cache.get(settings.ticketchannelId);
			
			const attachment = await discordTranscripts.createTranscript(interaction.channel, {
				saveImages: true,
				poweredBy: false
			});

			const ticketdeleted = new EmbedBuilder()
				.setTitle(`🗑️ | Ticket Gesloten`)
				.setDescription(`Je ticket is gesloten!`)
				.addFields({name: "__Closed By:__", value: `${user}`, inline: true})
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})    
				.setTimestamp()		

			const ticketlogs = new EmbedBuilder()
				.setTitle(`🗑️ | Ticket Gesloten!`)
				.setDescription(`Ticket gesloten door ${username}!`)
				.addFields(
					{name: "__Ticket Door:__", value: `<@${ticketcreated}>`},
					{name: "__User:__", value: `${user}`, inline: true},
					{name: "__Kanaal:__", value: `#${interaction.channel.name}`, inline: true}
				)       
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})    
				.setTimestamp()

			let c = await create(10, 'Relative')
			const ticketdeleting = new EmbedBuilder()
				.setTitle(`🗑️ | Ticket Sluiten!`)
				.setDescription(`Je ticket is gesloten in ${c}`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
			interaction.guild.members.fetch(`${ticketcreated}`).then((user) => user.send({ embeds: [ticketdeleted], files: [attachment] })).catch(async err => {
				console.log(err)
				const cannotdm = new EmbedBuilder()
					.setTitle(`⛔ | Oeps!`)
					.setDescription(`\n Ik kan ${user} niet dmen! \n ${user} heeft zijn DM's uitstaan`)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
				interaction.channel.send({ embeds: [cannotdm]});
            });            
			auditchannel.send({ embeds: [ticketlogs], files: [attachment] })
			interaction.reply({ embeds: [ticketdeleting] })	
			setTimeout(function(){
				interaction.channel.delete()
			}, 10000);  
		} else if (interaction.options.getSubcommand() === 'sollicitatie') {
			const nochannel = new EmbedBuilder()
				.setTitle(`⛔ | Oeps!`)
				.setDescription(`\n Dit is geen sollicitatie kanaal`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			if (!interaction.channel.parentId === settings.ticketCategory) return interaction.reply({ embeds: [nochannel], ephemeral: true });
		
			const user = interaction.member
			const userid = interaction.member.id
			const username = interaction.member.user.tag
			console.log(`${interaction.channel.topic}`)
			const ticketcreated = `${interaction.channel.topic}`
			let auditchannel = interaction.guild.channels.cache.get(settings.ticketchannelId);
			
			const attachment = await discordTranscripts.createTranscript(interaction.channel, {
				saveImages: true,
				poweredBy: false
			});

			const ticketdeleted = new EmbedBuilder()
				.setTitle(`🗑️ | Sollicitatie Ticket Gesloten`)
				.setDescription(`Je ticket is gesloten!`)
				.addFields({name: "__Closed By:__", value: `${user}`, inline: true})
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})    
				.setTimestamp()		

			const ticketlogs = new EmbedBuilder()
				.setTitle(`🗑️ | Sollicitatie Ticket Gesloten!`)
				.setDescription(`Ticket gesloten door ${username}!`)
				.addFields(
					{name: "__Ticket Door:__", value: `<@${ticketcreated}>`},
					{name: "__User:__", value: `${user}`, inline: true},
					{name: "__Kanaal:__", value: `#${interaction.channel.name}`, inline: true}
				)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})    
				.setTimestamp()

			let c = await create(10, 'Relative')
			const ticketdeleting = new EmbedBuilder()
				.setTitle(`🗑️ | Sollicitatie Ticket Sluiten!`)
				.setDescription(`Je ticket is gesloten in ${c}`)
				.setColor(`${settings.dangerColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
				
			interaction.guild.members.fetch(`${ticketcreated}`).then((user) => user.send({ embeds: [ticketdeleted], files: [attachment] })).catch(async err => {
				console.log(err)
				const cannotdm = new EmbedBuilder()
					.setTitle(`⛔ | Oeps!`)
					.setDescription(`\n Ik kan ${user} niet dmen! \n ${user} heeft zijn DM's uitstaan`)
					.setColor(`${settings.dangerColor}`)
					.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})			
				interaction.channel.send({ embeds: [cannotdm]});
            }); 
			auditchannel.send({ embeds: [ticketlogs], files: [attachment] })
			interaction.reply({ embeds: [ticketdeleting] })	
			setTimeout(function(){
				interaction.channel.delete()
			}, 10000);  
		}			
	},
};