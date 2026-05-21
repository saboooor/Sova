import { readdirSync } from 'fs';
import { Client, Partials, GatewayIntentBits } from 'discord.js';
import { Logger } from 'winston';
import dotenv from 'dotenv';
dotenv.config();

// Create Discord client
const client = new Client({
	shards: 'auto',
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User,
	],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	allowedMentions: {
		parse: ['users', 'roles', 'everyone'],
	},
});

declare global {
	var sleep: typeof sleepfunc;
	var rn: Date;
	var logger: Logger;
}

function sleepfunc(ms: number) {
	return new Promise(resolve => {
	  return setTimeout(resolve, ms);
	});
  }
global.sleep = sleepfunc;

for (const handlerName of readdirSync('./src/handlers').filter((file: string) => file.endsWith('.ts'))) require(`./handlers/${handlerName}`).default(client);