import { Command } from '~/types/Objects';

export const test: Command = {
	description: "test command!",
    options: require('~/options/test').default,
	execute: function (interaction, args) {
		const option = args.getString("option");
		interaction.editReply({content: `You chose ${option}`})
	}
}