const { MessageActionRow, MessageSelectMenu, EmbedBuilder, MessageButton } = require('discord.js');
const settings = require('../config.json');
const discordTranscripts = require('discord-html-transcripts');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'transcript-ticket') {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const channel = interaction.channel;
            const attachment = await discordTranscripts.createTranscript(channel);
            const ticketdeleting = new EmbedBuilder()
                .setTitle(`📖 | Kopie`)
                .setColor(`${settings.defaultColor}`)
                .setDescription("Het kopie van je ticket is verzonden naar je DM's!")
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
            
            const transcript = new EmbedBuilder()
                .setTitle(`📖 | Transcript`)
                .setColor(`${settings.defaultColor}`)
                .setDescription(`Download je kopie van je ticket hier **boven**! \n \n **Klik om terug te gaan naar je ticket ${interaction.channel}**`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})    

            user.send({ embeds: [transcript], files: [attachment] })
            interaction.reply({ embeds: [ticketdeleting] })
            //interaction.reply({ embeds: [verify], ephemeral: true })        
        }
    },
}
                                            