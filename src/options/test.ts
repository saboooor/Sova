import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default async function options(cmd: SlashCommandBuilder){
    cmd.addStringOption(
        new SlashCommandStringOption()
        .setName("option")
        .setDescription('The description for the option')
        .setRequired(true)
        .setChoices(
            {name: 'Option 1', value: 'option1'},
            {name: 'Option 2', value: 'option2'},
        )
            
    )
}