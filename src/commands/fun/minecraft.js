const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ConnectionService } = require('discord.js');
const axios = require('axios');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('minecraft')
		.setDescription('👤 | Voor allemaal minecraft gerelateerde commands uit')
		.addSubcommand(subcommand =>
			subcommand
				.setName('players')
				.setDescription('🎮 | Krijg de lijst van de spelers die online zijn op de server')
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName('skin')
				.setDescription('🎮 | Krijg de skin van een speler')
				.addStringOption(option => option.setName('username').setDescription('Vul de naam van de speler in').setRequired(true))	
        ),
	async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'players') {
            const error = new EmbedBuilder()
                .setTitle(`⛔ | Oeps`)
                .setDescription(`\n Er ging iets mis met het krijgen van de afbeelding! \nDe API is waarschijnlijk offline!`)
                .setColor(`#ff001e`)
                .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
            const url = `https://api.mcsrvstat.us/2/play.seyox.nl`;
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
				console.log(image)
            } catch (e) {
                return interaction.reply({ embeds: [error], ephemeral: true });
            }
            if (image.players.online === 0) {
                const embed = new EmbedBuilder()
                    .setTitle(`<a:grassblock:1107333264638742539> | Spelers Online`)
                    .setDescription(`Er zijn momenteel geen spelers online op de server!`)
                    .setColor(`${settings.defaultColor}`)
                    .setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
                return interaction.reply({ embeds: [embed], ephemeral: false});
            } else {
                const embed = new EmbedBuilder()
                    .setTitle(`<a:grassblock:1107333264638742539> | Spelers Online`)
                    .setDescription(`Er zijn momenteel ${image.players.online} spelers online op de server!`)
                    .setColor(`${settings.defaultColor}`)
				return interaction.reply({ embeds: [embed], ephemeral: false});
            }
        }
		if (interaction.options.getSubcommand() === 'skin') {
			const playername = interaction.options.getString('username');
			const error = new EmbedBuilder()
				.setTitle(`⛔ | Oeps`)
				.setDescription(`\n Er ging iets mis met het krijgen van de afbeelding! \nDe API is waarschijnlijk offline!`)
				.setColor(`#ff001e`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})     
						
			const url = `https://api.mojang.com/users/profiles/minecraft/${playername}`;
			let image, response;
			try {
				response = await axios.get(url);
				image = response.data;

			} catch (e) {
				return interaction.reply({ embeds: [error], ephemeral: true });
			}

			const embed = new EmbedBuilder()
				.setTitle(`<a:grassblock:1107333264638742539> | ${playername}'s Skin`)
				.setImage(`https://skins.mcstats.com/body/front/${image.id}`)
				.setColor(`${settings.defaultColor}`)
				.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

			interaction.reply({ embeds: [embed], ephemeral: false});
		}
	},
};


//https://skins.mcstats.com/body/front/${image.id}