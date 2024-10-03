const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder, Guild, VoiceState, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = require('node:path');
const fs = require('fs');
const { token } = require('./token.json');
//const settings = require('./src/config.json');
const { clientId, guildId } = require('./config.json');
const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences,
    ]
});	

//############################################################################################
//    
//                                      EVENTS
//
//############################################################################################
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const eventFilesTICKET = fs.readdirSync('./src/tickets').filter(file => file.endsWith('.js'));

for (const file of eventFilesTICKET) {
	const eventTicket = require(`./src/tickets/${file}`);
	if (eventTicket.once) {
		client.once(eventTicket.name, (...args) => eventTicket.execute(...args));
	} else {
		client.on(eventTicket.name, (...args) => eventTicket.execute(...args));
	}
}

const eventFilesAPPLY = fs.readdirSync('./src/apply').filter(file => file.endsWith('.js'));

for (const file of eventFilesAPPLY) {
	const eventApply = require(`./src/apply/${file}`);
	if (eventApply.once) {
		client.once(eventApply.name, (...args) => eventApply.execute(...args));
	} else {
		client.on(eventApply.name, (...args) => eventApply.execute(...args));
	}
}
//############################################################################################
//    
//                                      COMMANDS
//
//############################################################################################
client.commands = new Collection();
//const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
	//const command = require(`./src/commands/${file}`);
	//client.commands.set(command.data.name, command);
//}
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('👤 | Geef de ping van de bot!'),
    new SlashCommandBuilder().setName('coinflip').setDescription('👤 | Kop of munt?'),
    new SlashCommandBuilder().setName('emojify').setDescription('Emojify een bericht').addStringOption(option => option.setName('message').setDescription('Het bericht dat daar emojis word veranderd').setRequired(true)),
    new SlashCommandBuilder().setName('joke').setDescription('👤 | Krijg een slechte grap'),
    new SlashCommandBuilder().setName('lyrics').setDescription('👤 | Krijg de songtekst van een liedje').addStringOption(option => option.setName('song').setDescription('Van welk nummer wilt jij de songtekst').setRequired(true)),
    new SlashCommandBuilder().setName('leden').setDescription('👤 | Hoeveel leden hebben we nu?'),
    new SlashCommandBuilder().setName('minecraft').setDescription('👤 | Voor allemaal minecraft gerelateerde commands uit').addSubcommand(subcommand =>subcommand.setName('players').setDescription('🎮 | Krijg de lijst van de spelers die online zijn op de server')).addSubcommand(subcommand =>subcommand.setName('skin').setDescription('🎮 | Krijg de skin van een speler').addStringOption(option => option.setName('username').setDescription('Vul de naam van de speler in').setRequired(true))),
    new SlashCommandBuilder().setName('trumptweet').setDescription('👤 | Laat Donald Trump iets tweeten').addStringOption(option => option.setName('message').setDescription('Het bericht dat hij gaat tweeten').setRequired(true)),
    new SlashCommandBuilder().setName('joebidentweet').setDescription('👤 | Laat Joe Biden iets tweeten').addStringOption(option => option.setName('message').setDescription('Het bericht dat hij gaat tweeten').setRequired(true)),
	new SlashCommandBuilder().setName('yomomma').setDescription('👤 | Yo Momma joke 😐'),
    new SlashCommandBuilder().setName('8ball').setDescription('👤 | Stel een vraag aan de magic 8ball').addStringOption(option => option.setName('question').setDescription('De vraag voor de magic 8ball').setRequired(true)),
	new SlashCommandBuilder().setName('hack').setDescription('👤 | Hack IEMAND! (LEGIT GEEN JOKE!111!!!!)').addUserOption(option => option.setName('speler').setDescription('Wie wil je hacken?!!').setRequired(true)),
	new SlashCommandBuilder().setName('watwiljeliever').setDescription('👤 | Wat wil je liever?'),
	new SlashCommandBuilder().setName('translate').setDescription('👤 | Vertaal een bericht').addStringOption(option =>option.setName('taal').setDescription('De taal waarin je het bericht wilt vertalen').setRequired(true).addChoices({ name: '🇬🇧 | Engels', value: 'trans_engels' },{ name: '🇩🇪 | Duits', value: 'trans_duits' },{ name: '🇫🇷 | Frans', value: 'trans_frans' },{ name: '🇹🇷 | Turks', value: 'trans_turks' },{ name: '🇲🇦 | Marokkaans', value: 'trans_marokkaans' },)).addStringOption(option => option.setName('message').setDescription('Het bericht dat hij gaat vertalen').setRequired(true)),			
    new SlashCommandBuilder().setName('applypanel').setDefaultMemberPermissions(8).setDescription('🔧 | Apply Panel'),
    new SlashCommandBuilder().setName('ticketpanel').setDefaultMemberPermissions(8).setDescription('🔧 | Ticket Panel'),  
    new SlashCommandBuilder().setName('add').setDescription('👤 | Voeg iemand toe aan je ticket').addUserOption(option => option.setName('member').setDescription('Vul de persoon toe die je wilt toevoegen').setRequired(true)),
    new SlashCommandBuilder().setName('remove').setDescription('👤 | Verwijder iemand van je ticket').addUserOption(option => option.setName('member').setDescription('Vul de persoon toe die je wilt verwijderen').setRequired(true)),		
    new SlashCommandBuilder().setName('close').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Sluit een ticket!').addSubcommand(subcommand => subcommand.setName('ticket').setDescription('💼 | Sluit een ticket!')).addSubcommand(subcommand => subcommand.setName('sollicitatie').setDescription('💼 | Sluit een sollicitatie!')),
    new SlashCommandBuilder().setName('ban').setDescription('💼 | Ban').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).addUserOption(option => option.setName('user').setDescription('Vul de speler in die je wilt bannen').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de ban').setRequired(true)),	
    new SlashCommandBuilder().setName('kick').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Kick').addUserOption(option => option.setName('member').setDescription('Vul de speler in die je wilt kicken').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de kick').setRequired(true)),		
    new SlashCommandBuilder().setName('slowmode').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Slowmode').addNumberOption(option => option.setName('seconds').setDescription('Hoelang moet de slowmode zijn (IN SECONDES)').setRequired(true)),		
    new SlashCommandBuilder().setName('clear').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Clear Mesages').addNumberOption(option => option.setName('messages').setDescription(`Geef het getal op van hoeveel berichten je wilt verwijderen`).setRequired(true)),
    new SlashCommandBuilder().setName('unlock').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Unlock channel'),    
    new SlashCommandBuilder().setName('lock').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Lock channel'),        
    new SlashCommandBuilder().setName('unban').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).setDescription('💼 | Unban').addUserOption(option => option.setName('user').setDescription('Geef de speler op die je wilt unbannen').setRequired(true)).addStringOption(option => option.setName('reason').setDescription('Geef de reden op voor de unban').setRequired(true)),	            
    new SlashCommandBuilder().setName('send').setDefaultMemberPermissions(8).setDescription('💼 | Stuur een bericht naar een het kanaal').addSubcommand(subcommand =>subcommand.setName('embed').setDescription('📃 | Stuur een embed naar een het kanaal')).addSubcommand(subcommand =>subcommand.setName('message').setDescription('📃 | Stuur een message naar een het kanaal')),		
    new SlashCommandBuilder().setName('verifypanel').setDefaultMemberPermissions(8).setDescription('💼 | Verify panel'),
]
    .map(command => command.toJSON());  

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log(`\u001b[1;34m[DEBUG]` + `\u001b[0m Successfully registered application commands.`))
    .catch(console.error);
//##### REMOVE ALL COMMANDS #####
//rest.put(Routes.applicationGuildCommands(`${clientId}`, `${guildId}`, { body: commands }))
//############################################################################################
//    
//                                  INTERACTION CREATE
//
//############################################################################################    
const blockedUsers = ['501796808897331220'];
client.on('interactionCreate', async (interaction, message, channel, distube) => {
    const blacklistedembed = new EmbedBuilder()
        .setTitle(`⛔ | BlackListed!`)
        .setDescription('Wow Je bent geblacklisted van de bot \n Kijk Sven even lief aan dan haalt hij hem voor je weg <3')
        .setColor(`#ff001e`)

	if (!interaction.isCommand()) return;
	if (blockedUsers.includes(interaction.user.id)) return interaction.reply({ embeds: [blacklistedembed], ephemeral: false });
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, message, channel, distube);
	} catch (error) {
		console.error(error);
    const errorembed = new EmbedBuilder()
        .setTitle(`⛔ | Foutje!`)
        .setDescription('Sorry! Er ging helaas iets fout \n \n Maak een ticket aan en stuur een screenshot van deze error naar een stafflid! \n \n Error: `'+ error +'`')
        .setColor(`#ff001e`)
        //.setFooter({ text: settings.footerText, iconURL: settings.footerIcon})
   
		await interaction.reply({ embeds: [errorembed], ephemeral: true });
	}
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        const help = new EmbedBuilder()
            .setTitle(`👋 | Hey!`)
            .setDescription(`Hey ${message.author}, Waar mee kan ik u van dienst zijn? \n Type **/** om **alle** commands te bekijken!`)
            //.setColor(`${settings.defaultColor}`)
            //.setFooter({ text: `${settings.footerText} • Gemaakt door @Sven.#1879`, iconURL: settings.footerIcon})
        
        message.reply({ embeds: [help] });
    }
});
    
client.login(token);    
