const { MessageActionRow, MessageSelectMenu, EmbedBuilder, MessageButton } = require('discord.js');
const settings = require('../config.json');
const discordTranscripts = require('discord-html-transcripts');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'verify') {
            const user = interaction.member
            const userid = interaction.member.id
            const username = interaction.member.user.tag

            const verify = new EmbedBuilder()
                .setTitle(`<a:check:1089540439838838914> | Verify`)
                .setColor(`#26cf00`)
                .setDescription("Je bent geverifieerd!")
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon});
            
            user.roles.add("1035191842267992216");
            user.roles.remove("1035191847888371772");
            interaction.reply({ embeds: [verify], ephemeral: true })

            const userverified = new EmbedBuilder()
                .setTitle(`<a:check:1089540439838838914> | User verified`)
                .setColor(`#26cf00`)
                .addFields({name: "__User__", value: `${user}`, inline: true})
                .setTimestamp()
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon});

            let auditchannel = interaction.guild.channels.cache.get(settings.auditChannelID);
            auditchannel.send({ embeds: [userverified] });
            //interaction.reply({ embeds: [verify], ephemeral: true })        
        }
    },
}
                                            