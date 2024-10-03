const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, PermissionsBitField, ChannelType, ButtonStyle } = require('discord.js');
const settings = require('../config.json');
const { create } = require('discord-timestamps')    
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        
        if (interaction.customId === `marketingmodal`) {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const age = interaction.fields.getTextInputValue('age');
            const reason = interaction.fields.getTextInputValue('description');
            const sterk = interaction.fields.getTextInputValue('sterk');
            const bereiken = interaction.fields.getTextInputValue('bereiken');
            const ervaring = interaction.fields.getTextInputValue('ervaring');

            let c = await create(1, 'Relative')
            const ticketcreated = new EmbedBuilder()
                .setTitle(`📸 | Marketing Sollicitatie`)
                .addFields(
                    { name: 'Gemaakt:', value: `${c}`, inline: true },
                    { name: 'Leeftijd:', value: `${age}`, inline: true },
                    { name: 'Waarom wil je een marketing medewerker worden?', value: `${reason}`, inline: false },
                    { name: 'Wat zijn je sterke/zwakke punten?', value: `${sterk}`, inline: false },
                    { name: 'Wat wil je bereiken als marketing medewerker?', value: `${bereiken}`, inline: false },
                    { name: 'Heb je al ervaring gehad? Zo ja, waar?', value: `${ervaring}`, inline: true },
                )
                .setColor(`${settings.defaultColor}`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                .setAuthor(`${username}`, `${user.user.displayAvatarURL({ dynamic: true })}`)
                .setTimestamp()        
            interaction.guild.channels.create({
                name: `📸│${username}`,
                type: ChannelType.GuildText,
                parent: settings.applyCategoryID,
                topic: `${userid}`,
                permissionOverwrites: [
                    {
                        id: userid,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: settings.LeadRoleID,
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
                            .setLabel('Ga naar je sollicitatie')
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
                    .setTitle(`📸 | Marketing Sollicitatie`)
                    .setDescription("Je sollicitatie ticket is zo juist aangemaakt! Je kan nu je sollicitatie ticket bekijken door op de knop hieronder te klikken.")
                    .setColor(`${settings.defaultColor}`)
                    .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                    .setTimestamp()                       
                interaction.reply({ embeds: [ticket], ephemeral: true, components: [jumptoticket] });
                const sent = await channel.send(`<@${settings.SupportRoleID}>`)
                channel.send({ content: `Welkom <@${userid}> in je sollicitatie ticket! Wees geduldig en tag geen medewerkers, tenzij het u word gezegt`, embeds: [ticketcreated], components: [transcript] })
                sent.delete()
            })
        }
    },
}
                                            