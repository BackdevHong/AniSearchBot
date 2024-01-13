const axios = require('axios');
const dotenv = require("dotenv");
const video = require("./video.json")

dotenv.config();

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
      // const id = v.data.items[0].id.videoId
      // const prevVideo = video
      console.log(v.data.items[0])
      
      // if (video.LastVideoId !== id) {
      //   console.log('다름')
      // }
      //   prevVideo.LastVideoId = id

      //   const getVideoOption = {
      //     method: 'GET',
      //     url: `https://www.googleapis.com/youtube/v3/videos`,
      //     headers: {
      //       accept: 'application/json',
      //     },
      //     params : {
      //       key : process.env.API_YT,
      //       part: "statistics, contentDetails",
      //       id: id,
      //       q: ""
      //     }
      //   };

      //   axios
      //     .request(getVideoOption)
      //     .then((c) => {
      //       fs.writeFileSync("./video.json", JSON.stringify(prevVideo))

      //       return channel.send({
      //         content: "<@&972351492679938078>",
      //         embeds: [newVideoEmbed(v.data.items[0], c.data.items[0])]
      //       })
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
      // }
    })
    .catch((error) => {
      console.log(error)
    })

