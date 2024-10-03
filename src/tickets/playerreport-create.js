const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, PermissionsBitField, ChannelType, ButtonStyle } = require('discord.js');
const settings = require('../config.json');
const { create } = require('discord-timestamps')    
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        
        if (interaction.customId === `reportusermodal`) {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const question1 = interaction.fields.getTextInputValue('ign');
            const question2 = interaction.fields.getTextInputValue('offender');
            const question3 = interaction.fields.getTextInputValue('description');
            let c = await create(1, 'Relative')
            const ticketcreated = new EmbedBuilder()
                .setTitle(`🤬 | Bug Report Ticket`)
                .addFields(
                    {name: "__Gemaakt__", value: `${c}`, inline: true},
                    {name: "__In Game Name__", value: `${question1}`, inline: true},
                    {name: "__Reported speler:__", value: `${question2}`},
                    {name: "__Reden:__", value: `${question3}`},
                )                
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                //.setAuthor(`${username}`, `${user.user.displayAvatarURL({ dynamic: true })}`)
                .setTimestamp()        
            interaction.guild.channels.create({
                name: `🤬│${username}`,
                type: ChannelType.GuildText,
                parent: settings.ticketCategoryID,
                topic: `${userid}`,
                permissionOverwrites: [
                    {
                        id: userid,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: settings.SupportRoleID,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },                                   
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },                        
                ],                
            }).then(async channel => {
                const jumptoticket = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`)
                            .setLabel('Ga naar je ticket')
                            .setEmoji('📎')
                            .setStyle(ButtonStyle.Link),
                    );                

                const transcript = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('transcript-ticket')
                            .setLabel('Kopie')
                            .setEmoji('📖')
                            .setStyle(ButtonStyle.Primary),
                    );                     
                const ticket = new EmbedBuilder()
                    .setTitle(`📨 | Ticket`)
                    .setDescription("Je ticket is succesvol aangemaakt! Je kan nu je ticket bekijken door op de knop hieronder te klikken.")
                    .setColor(`${settings.defaultColor}`)
                    .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                    .setTimestamp()                      
                interaction.reply({ embeds: [ticket], ephemeral: true, components: [jumptoticket] });
                const sent = await channel.send(`<@${settings.SupportRoleID}>`)
                channel.send({ content: `Welkom <@${userid}> in je ticket! Wees geduldig en tag geen medewerkers, tenzij het u word gezegt`, embeds: [ticketcreated], components: [transcript] })
                sent.delete()
            })
        }
    },
}
                                            