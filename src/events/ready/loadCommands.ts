import { Client, SlashCommandBuilder } from "discord.js";
import commands from "~/lists/commands";
const truncateString = (string: string, maxLength: number) =>
  string.length > maxLength
    ? `${string.substring(0, maxLength)}…`
    : string;

export default async (client: Client) =>{

    let cmds = [];
    for (let obj of commands){
        const command = obj[1];
        logger.info(`Loading command ${command.name}`);

        const cmd = new SlashCommandBuilder()
        .setName(command.name!)
        .setDescription(truncateString(command.description, 99))
        if(command.options) command.options(cmd);
        cmds.push(cmd);
    }
    await client.application?.commands.set(cmds);
    logger.info(`${cmds.length} slash commands loaded`);
}