const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setStatus('idle');
		client.user.setActivity("Sven hoofdpijn geven");
		//const activities_list = [		
			//{ type: 'PLAYING',  message: `Check About Me!`  },
			//{ type: 'WATCHING',  message: `Coding Tutorials...`  },
			//{ type: 'WATCHING',  message: `Ur mom ♥`  },
			//{ type: 'WATCHING',  message: `@Zone`  },
			//{ type: 'WATCHING',  message: `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Discord members!`  }
		//];

		//setInterval(() => {
			//const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
	
			//client.user.setStatus('idle')
			//client.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
			//console.log(`\u001b[1;35m[STATUS]` + `\u001b[0m CHANGED TO` + `\u001b[1;33m ${activities_list[index].type} ${activities_list[index].message}\u001b[0m`)
		//}, 10000);
	
        console.log(`\u001b[1;32m[READY] ` + `\u001b[0m@${client.user.tag} is nu ` + `\u001b[1;32monline`);
        
        
        
	},
};