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
    const commandModule = await import(`../commands/${folder}/${file}`);
    const name = Object.keys(commandModule)[0] as keyof typeof commandModule;

    const command = { name: commandModule.name ?? name, category: folder, ...(commandModule[name] as Command) };
    commands.set(command.name, command);
  }
}
logger.info(`${commands.size} slash commands loaded`);

export default commands;