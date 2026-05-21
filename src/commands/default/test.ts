import { Command } from '~/types/Objects';
import options from '~/options/test';

export const test: Command = {
  description: 'test command!',
  options,
  execute: function (interaction, args) {
    const option = args.getString('option');
    interaction.editReply({ content: `You chose ${option}` });
  },
};