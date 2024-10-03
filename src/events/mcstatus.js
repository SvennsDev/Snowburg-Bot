const { ActivityType } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {

		console.log(`\u001b[1;32m[STATUS] ` + `\u001b[1;32mUpdating server status...`);
		const url = `https://api.mcsrvstat.us/2/play.coralvalley.nl`;
		let image, response;
		try {
			response = await axios.get(url);
			image = response.data;
		} catch (e) {
			const channel = client.channels.cache.get(`1247282244603875460`).setName(`🔴 | play.CoralValley.nl`);
			client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: 0`);
		}	
		if (image.online == false) {
			client.channels.cache.get(`1247282244603875460`).setName(`🔴 | play.CoralValley.nl`);
			client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: 0`);
		} else {
			client.channels.cache.get(`1247282244603875460`).setName(`🟢 | play.CoralValley.nl`);
			client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: ${image.players.online}`);
		}

		setInterval(async () => {	
			console.log(`\u001b[1;32m[STATUS] ` + `\u001b[1;32mUpdating server status...`);
            const url = `https://api.mcsrvstat.us/2/play.coralvalley.nl`;
            let image, response;
            try {
                response = await axios.get(url);
                image = response.data;
            } catch (e) {
				const channel = client.channels.cache.get(`1247282244603875460`).setName(`🔴 | play.CoralValley.nl`);
				client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: 0`);
            }	
			if (image.online == false) {
				client.channels.cache.get(`1247282244603875460`).setName(`🔴 | play.CoralValley.nl`);
				client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: 0`);
			} else {
				client.channels.cache.get(`1247282244603875460`).setName(`🟢 | play.CoralValley.nl`);
				client.channels.cache.get(`1247282244603875461`).setName(`👤 | Online: ${image.players.online}`);
			}
		}, 300000);        
        
        
	},
};