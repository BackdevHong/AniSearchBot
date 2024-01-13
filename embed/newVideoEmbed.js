const { EmbedBuilder } = require("discord.js")

function durationCalculator(duration) {
  // PT12M30S
  const str = duration.split('PT')[1].replace("M", "분 ")
  const lastStr = str.replace("S", "초")
  return lastStr
}

function titleEdit(title) {
  return title.replace(/&quot;/g, '"')
}

module.exports = {
  newVideoEmbed : (result, video) => {
    const embed = new EmbedBuilder()
      .setTitle(`${titleEdit(result.snippet.title)}`)
      .setURL(`https://www.youtube.com/watch?v=${result.id.videoId}`)
      .setDescription("여러분! 새영상이 업로드 됬어요! 확인하러 가시죠!")
      .addFields({
        name: "조회수",
        value: `${video.statistics.viewCount}`,
        inline: true
      },
      {
        name: "동영상 길이",
        value: `${durationCalculator(video.contentDetails.duration)}`,
        inline: true
      },
      {
        name: "좋아요 수",
        value: `${video.statistics.likeCount}`,
        inline: true
      })
      .setImage(result.snippet.thumbnails.high.url)
      .setAuthor(
        {
          name: "애푸덕님의 새로운 영상이 업로드 되었습니다!"
        }
      )
      return embed
  }
}