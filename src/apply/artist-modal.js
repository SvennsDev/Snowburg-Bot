const { ActionRowBuilder, MessageSelectMenu, TextInputStyle, MessageButton, ModalBuilder, TextInputBuilder } = require('discord.js');
const settings = require('../config.json');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        if (interaction.customId === 'apply-options') {
            if (interaction.values[0] === 'artist-apply') {
                const user = interaction.member
                const userid = interaction.member.id
                const username = interaction.member.user.tag

                const modal = new ModalBuilder()
                .setCustomId(`artistmodal`)
                .setTitle(`🖌 | Artist Sollicitatie`)
               
                

                const age = new TextInputBuilder()
                    .setCustomId("age")
                    .setLabel("Leeftijd")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short);                    

                const reason = new TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("Waarom wil je een artist worden?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
        
                const sterk = new TextInputBuilder()
                    .setCustomId("sterk")
                    .setLabel("Wat zijn je sterke/zwakke punten?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
                            
                const bereiken = new TextInputBuilder()
                    .setCustomId("bereiken")
                    .setLabel("Wat wil je bereiken als artist?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
                           
                const ervaring = new TextInputBuilder()
                    .setCustomId("ervaring") 
                    .setLabel("Heb je al ervaging gehad?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);
                                                
                const question2 = new ActionRowBuilder().addComponents(age);
                const question3 = new ActionRowBuilder().addComponents(reason);
                const question4 = new ActionRowBuilder().addComponents(sterk);
                const question6 = new ActionRowBuilder().addComponents(bereiken);
                const question7 = new ActionRowBuilder().addComponents(ervaring);

                modal.addComponents(question2, question3, question4, question6, question7); 

                interaction.showModal(modal);
            //interaction.reply({ embeds: [verify], ephemeral: true })        
            }
        }
    },
}
                                            