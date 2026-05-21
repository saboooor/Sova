import { Client } from 'discord.js';
import { readdirSync } from 'fs';

export default async (client: Client) => {
  const eventFolders = readdirSync('./src/events/');
  let jsFiles: string[] = [];
  for (const event of eventFolders) {
    jsFiles = readdirSync(`./src/events/${event}`).filter(subfile => subfile.endsWith('.ts'));
    for (const file of jsFiles) {
      const eventModule = await import(`../events/${event}/${file}`);
      const js = eventModule.default ?? eventModule;
      client.on(event, js.bind(null, client));
    }
  }
  logger.info(`${jsFiles.length} event listeners loaded`);
};