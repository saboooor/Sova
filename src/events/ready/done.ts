import { Client } from "discord.js";

export default async (client: Client<true>) =>{
    logger.info(`Logged in as ${client.user.tag}!`);
    logger.info(`Guilds: ${client.guilds.cache.size}`)
}