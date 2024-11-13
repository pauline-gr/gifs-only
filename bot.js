require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

// Nom du channel
const CHANNEL_NAME = process.env.CHANNEL;
// Token du bot
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
  console.log(`${client.user.tag} est en ligne !`);
});

client.on('messageCreate', async (message) => {
  // Ignore les messages envoyés par le bot lui même
  if (message.author.bot) return;

  if (message.channel.name === CHANNEL_NAME) {
    const hasGifOrImage = message.attachments.some(attachment =>
        attachment.contentType?.startsWith('image/') || attachment.contentType?.startsWith('video/')
      );
  
      // Vérifie si le message contient un lien vers Giphy, Tenor ou d'autres sites GIF
      const gifLinkPattern = /(https?:\/\/.*\.(?:gif))|(https?:\/\/(?:giphy|tenor)\.com)/;
      const containsGifLink = gifLinkPattern.test(message.content);

    // Si le message ne contient ni GIF/image ni lien vers un GIF, on le supprime
    if (!hasGifOrImage && !containsGifLink) {
        await message.delete();
    }
  }
});
client.login(TOKEN);
