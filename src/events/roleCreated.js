	const { EmbedBuilder, AuditLogEvent } = require('discord.js');
	const settings = require('../config.json');
	module.exports = {
		name: 'roleCreate',
		async execute(role) {

		let auditchannel = role.guild.channels.cache.get(settings.auditChannelID);
		const fetchedLogs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.RoleCreate,
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
	
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return console.log(`Audit log not found.`);
	
		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things
		const { executor, target } = deletionLog;
		var messagedeleted = new EmbedBuilder()
			.setTitle(`👜 | Role Aangemaakt`)
			.setColor(`${settings.warningColor}`)
			.addFields(
				{ name: "__Moderator__", value: `<@${executor.id}>`, inline: true },
				{ name: "__Role__", value: `${role}`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})

		try {
			auditchannel.send({ embeds: [messagedeleted] });
		} catch (error) {
			console.error(error);
		}

	},
};