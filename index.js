const {
    Client,
    GatewayIntentBits,
    Events,
    Partials,
} = require("discord.js");
const dotenv = require("dotenv");
const { registerCommands } = require("./deploy-commands");
const { aniInfoHandling } = require("./handling/aniInfo");

dotenv.config();

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});


registerCommands(process.env.TOKEN, process.env.CLIENT_ID)

client.on(Events.ClientReady, async (client) => {
    console.log("Client Ready")
})


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) {
      return
    }

    if (interaction.channel.id !== process.env.CHANNEL_BOT) {
      return interaction.reply({
        ephemeral: true,
        content: "여기서는 사용하실 수 없는 명령어입니다."
      })
    }

    switch (interaction.commandName) {
      case "애니":
        aniInfoHandling(interaction)
        break;
    
      default:
        break;
    }
})

client.login(process.env.TOKEN);
  