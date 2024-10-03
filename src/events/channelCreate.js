	const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'channelCreate',
		async execute(channel) {

		let auditchannel = channel.guild.channels.cache.get(settings.auditChannelID);
		const fetchedLogs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.ChannelCreate,
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
	
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return console.log(`Er is geen audit log gevonden voor het kanaal ${channel.name}.`);
	
		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things
		const { executor, target } = deletionLog;
		var messagedeleted = new EmbedBuilder()
			.setTitle(`🗃 | Channel Aangemaakt`)
			.setColor(`${settings.warningColor}`)
			.addFields(
				{ name: "__Kanaal__", value: `${channel}`, inline: true },
				{ name: "__Type__", value: ` \`\`\`${channel.type}\`\`\` `, inline: true },
				{ name: "__Moderator__", value: `<@${executor.id}>` },
			)
			.setTimestamp()
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
		try {
			auditchannel.send({ embeds: [messagedeleted] });
		} catch (error) {
			
		}

	},
};