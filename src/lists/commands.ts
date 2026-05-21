import { readdirSync } from 'fs';
import { Collection } from 'discord.js';
import { Command } from '~/types/Objects';

// Set the slash commands collection
const commands = new Collection<string, Command>();

// Register all slash commands
const slashcommandFolders = readdirSync('./src/commands');
for (const folder of slashcommandFolders) {
  const slashcommandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('ts'));
  for (const file of slashcommandFiles) {
    let command = require(`../commands/${folder}/${file}`);
    const name = Object.keys(command)[0] as keyof typeof command;

    command = { name: command.name ?? name, category: folder, ...command[name] };
    commands.set(command.name, command);
  }
}
logger.info(`${commands.size} slash commands loaded`);

export default commands;