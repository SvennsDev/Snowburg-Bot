const { ActionRowBuilder, MessageSelectMenu, TextInputStyle, MessageButton, ModalBuilder, TextInputBuilder } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        if (interaction.customId === 'ticket-options') {
            if (interaction.values[0] === 'other') {
                const user = interaction.member
                const userid = interaction.member.id
                const username = interaction.member.user.tag

                const modal = new ModalBuilder()
                .setCustomId(`overigmodal`)
                .setTitle(`👀 | Overige Vragen`)
               
                
                const ign = new TextInputBuilder()
                    .setCustomId("ign")
                    .setLabel("IGN (In Game Name)")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short);
                    
                const reason = new TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("Beschrijf je vraag zo duidelijk mogelijk.")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
        
                const question1 = new ActionRowBuilder().addComponents(ign);         
                const question2= new ActionRowBuilder().addComponents(reason);
            
                modal.addComponents(question1, question2); 
                
                interaction.showModal(modal);
            //interaction.reply({ embeds: [verify], ephemeral: true })        
            }
        }
    },
}
                                            