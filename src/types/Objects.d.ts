import { SlashCommandBuilder, PermissionsBitField, Message, Client, CommandInteraction, ButtonInteraction, ModalSubmitInteraction, ContextMenuCommandInteraction, GuildMember, StringSelectMenuInteraction, AutocompleteInteraction, CommandInteractionOptionResolver, CacheType } from 'discord.js';

export class Command {
  name?: string;
  description: string;
  category?: string;
  aliases?: string[];
  usage?: string;
  args?: boolean;
  permissions?: (keyof typeof PermissionsBitField.Flags)[];
  channelPermissions?: (keyof typeof PermissionsBitField.Flags)[];
  botPerms?: (keyof typeof PermissionsBitField.Flags)[];
  botChannelPerms?: (keyof typeof PermissionsBitField.Flags)[];
  cooldown?: number;
  ephemeral?: boolean;
  noDefer?: boolean;
  ownerOnly?: boolean;
  options?: (cmd: SlashCommandBuilder) => void | Promise<void>;
  autoComplete?: (client: Client, interaction: AutocompleteInteraction) => void | Promise<void>;
  execute: (interaction: CommandInteraction, args: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">) => void | Promise<void>;
}

export class ContextMenuCommand<T extends 'User' | 'Message'> {
  name: string;
  permissions?: (keyof typeof PermissionsBitField.Flags)[];
  botPerms?: (keyof typeof PermissionsBitField.Flags)[];
  ephemeral?: boolean;
  noDefer?: boolean;
  type: T;
  execute: (interaction: ContextMenuCommandInteraction, client: Client, item: T extends 'User' ? GuildMember : Message<true>) => void | Promise<void>;
}

export class Reaction {
  name?: string;
  triggers: string[];
  additionaltriggers?: string[];
  execute: (message: Message<true>) => void | Promise<void>;
}

export class Modal {
  name?: string;
  deferReply?: boolean;
  ephemeral?: boolean;
  execute: (interaction: ModalSubmitInteraction, client: Client, modalInfo: string) => void | Promise<void>;
}

export class Button {
  name?: string;
  botPerms?: (keyof typeof PermissionsBitField.Flags)[];
  deferReply?: boolean;
  noDefer?: boolean;
  ephemeral?: boolean;
  execute: (interaction: ButtonInteraction | StringSelectMenuInteraction, client: Client) => void | Promise<void>;
}