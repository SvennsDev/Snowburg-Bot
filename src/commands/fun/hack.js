const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const settings = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hack')
		.setDescription('👤 | Hack IEMAND! (LEGIT GEEN JOKE!111!!!!)')
		.addUserOption(option => option.setName('speler').setDescription('Wie wil je hacken?!!').setRequired(true)),
	async execute(interaction, client) {
		const speler = interaction.options.getUser('speler');    
		interaction.reply(`**${speler.username}** Wordt gehackt!`)
		interaction.channel.send(`**${speler.username}** Hacken... [0%]`).then((msg) => {
			setTimeout(() => {
				msg.edit(`**${speler.username}** Hacken... IP: 690.420.OMA [10%]`);
			}, 2300);
			setTimeout(() => {
				msg.edit(`Fornite account van **${speler.username}%** gehacked! [21%]`);
			}, 5600);
			setTimeout(() => {
				msg.edit(`50 Pizza hawii besteld MET **${speler.username}'s** PINPAS! [34%]`);
			}, 8700);
			setTimeout(() => {
				msg.edit(`**${speler.username}** Hacken... IP: 690.420.OMA [47%]`);
			}, 11000);
			setTimeout(() => {
				msg.edit(`Goose virus op de computer van **${speler.username}** gedownload [54%]`);
			}, 13000);
			setTimeout(() => {
				msg.edit(`IK HEB DE RELATIE VAN **${speler.username}** EN EEN **EGIRL** BEEINDIG! [69%]`);
			}, 16000);
			setTimeout(() => {
				msg.edit(`€169,- uit gegeven aan CoralValley met de creditcard van **${speler.username}** [79%]`);
			}, 17800);
			setTimeout(() => {
				msg.edit(`🔞 CONTENT GEVONDEN OP COMPUTER VAN **${speler.username}** [84%]`);
			}, 20000);
			setTimeout(() => {
				msg.edit(`DE COMPUTER FILES VAN **${speler.username}** ONLINE GEGOOIT! [99%] Check hier: (Klik hier)[https://www.youtube.com/watch?v=dQw4w9WgXcQ]`);
			}, 25000);
			setTimeout(() => {
				msg.edit(`**${speler.username}** Is gehacked!1111!!!!111! [100%]`);
			}, 28888);
		});
	},
};