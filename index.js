const {
    Client,
    GatewayIntentBits,
    Events,
    Partials,
} = require("discord.js");
const dotenv = require("dotenv");
const { registerCommands } = require("./deploy-commands");
const { aniInfoHandling } = require("./handling/aniInfo");
const video = require("./video.json");
const { newVideoEmbed } = require("./embed/newVideoEmbed.js");
const axios = require('axios');
const fs = require('fs')

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
      console.log(interaction.channel.id)
      console.log(process.env.CHANNEL_BOT)
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
  
setInterval(async () => {
  let channel;

  const guild = client.guilds.fetch(process.env.GUILD_ID).then((v) => {
    channel = v.channels.cache.get(process.env.CHANNEL_YT)
  })

  const getLatestYTIDOption = {
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/playlistItems`,
    headers: {
      accept: 'application/json',
    },
    params : {
      key : process.env.API_YT,
      part: "snippet",
      playlistId: process.env.YTC_ID,
      maxResults: 1,
      q: ""
    }
  };
  
  axios
      .request(getLatestYTIDOption)
      .then((v) => {
        const id = v.data.items[0].snippet.resourceId.videoId
        const prevVideo = video
        
        if (video.LastVideoId !== id) {
          prevVideo.LastVideoId = id

          const getVideoOption = {
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/videos`,
            headers: {
              accept: 'application/json',
            },
            params : {
              key : process.env.API_YT,
              part: "statistics, contentDetails",
              id: id,
              q: ""
            }
          };

          axios
            .request(getVideoOption)
            .then((c) => {
              fs.writeFileSync("./video.json", JSON.stringify(prevVideo))

              return channel.send({
                content: "<@&972351492679938078>",
                embeds: [newVideoEmbed(v.data.items[0], c.data.items[0])]
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
}, 10000);