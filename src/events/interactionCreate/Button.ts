import { ButtonInteraction, Client, StringSelectMenuInteraction } from "discord.js";
import buttons from "~/lists/buttons";

export default async (client: Client, interaction: ButtonInteraction | StringSelectMenuInteraction) => {
    if(!interaction.isButton() && !interaction.isStringSelectMenu()) return;
    if(!interaction.guild) return;

    const id = interaction instanceof StringSelectMenuInteraction ? interaction.values[0] : interaction.customId;

    const button = buttons.get(id);
    if(!button) return;

    try{
        if(!button.noDefer){
            await interaction[button.deferReply ? 'deferUpdate' : 'deferReply']({ephemeral: button.ephemeral});
        }
        button.execute(interaction, client);
    }catch(err){
        logger.error(`Error while executing button ${button.name}`);
        logger.error(err);
    }
}