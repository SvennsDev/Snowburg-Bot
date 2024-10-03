const { ActionRowBuilder, MessageSelectMenu, TextInputStyle, MessageButton, ModalBuilder, TextInputBuilder } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        if (interaction.customId === 'ticket-options') {
            if (interaction.values[0] === 'report-user') {
                const user = interaction.member
                const userid = interaction.member.id
                const username = interaction.member.user.tag

                const modal = new ModalBuilder()
                .setCustomId(`reportusermodal`)
                .setTitle(`🤬 | Report een Speler`)
               
                
                const ign = new TextInputBuilder()
                    .setCustomId("ign")
                    .setLabel("IGN (In Game Name)")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short);

                const offender = new TextInputBuilder()
                    .setCustomId("offender")
                    .setLabel("De speler die je wilt reporten.")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short);
                    
                const reason = new TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("Waarom report je deze speler?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
        
                const question1 = new ActionRowBuilder().addComponents(ign);
                const question2 = new ActionRowBuilder().addComponents(offender);                
                const question3 = new ActionRowBuilder().addComponents(reason);
            
                modal.addComponents(question1, question2, question3); 

                interaction.showModal(modal);
            //interaction.reply({ embeds: [verify], ephemeral: true })        
            }
        }
    },
}
                                            