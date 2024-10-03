const { EmbedBuilder } = require('discord.js');
const settings = require('../config.json');

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {

		let channel = oldMessage.guild.channels.cache.get(settings.auditChannelID);
		if (oldMessage.author.bot) return;
		if (oldMessage.content.length > 1020) return;
		if (oldMessage.content.length = 0) return;
		if (newMessage.content.length > 1020) return;
		if (newMessage.content.length = 0) return;		
		if (oldMessage.attachments.size > 0) return;

		var messagedeleted = new EmbedBuilder()
			.setTitle(`💬 | Bericht Geupdate`)
			.setColor(`${settings.warningColor}`)
			.setAuthor({ name: `${oldMessage.author.tag}`, iconURL: `${oldMessage.author.avatarURL({ size: 4096 })}`})
			.addFields(
				{ name: "__Gebruiker__", value: `<@${oldMessage.author.id}>`, inline: true },
				{ name: "__Kanaal__", value: `${oldMessage.channel}`, inline: true },
				{ name: "__Ga naar het bericht__", value: `[Klik Hier](${newMessage.url})` },
				{ name: "__Oud Bericht__", value:  ` \`\`\`${oldMessage}\`\`\` ` },
				{ name: "__Nieuw Bericht__", value:  ` \`\`\`${newMessage}\`\`\` ` },
			)
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		channel.send({ embeds: [messagedeleted] });        
	},
};