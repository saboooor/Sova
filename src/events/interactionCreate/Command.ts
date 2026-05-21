import { Client, CommandInteraction } from "discord.js";
import commands from "~/lists/commands";

export default async (client: Client, interaction: CommandInteraction) => {

    if(!interaction.isChatInputCommand()) return;
    if(!interaction.guild) return;

    const command = commands.get(interaction.commandName);
    if(!command) return;

    const args = interaction.options;
    await interaction.deferReply({ephemeral: command.ephemeral})

    if(command.ownerOnly && interaction.member!.user.id != process.env.OWNERID){
        return interaction.editReply({content: "This command can only be used by the bot creator"})
    }
    try {
        await command.execute(interaction, args);
    } catch (error) {
        console.error(error);
        await interaction.editReply({ content: 'There was an error while executing this command!' });
    }
}