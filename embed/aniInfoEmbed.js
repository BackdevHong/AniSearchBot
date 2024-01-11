const { EmbedBuilder } = require("discord.js")

function getDate(str) {
  if (str === "01" || str === "02" || str === "03") {
    return "1분기"
  }

  if (str === "04" || str === "05" || str === "06") {
    return "2분기"
  }

  if (str === "07" || str === "08" || str === "09") {
    return "3분기"
  }

  if (str === "10" || str === "11" || str === "12") {
    return "4분기"
  }
}

// function getStatus(status) {
//   if (status === "Returning Series") {
//     return "방영 예정"
//   }

//   if (status === "")
// }
module.exports = {
  aniInfoEmbed : (result) => {
    const embed = new EmbedBuilder()
      .setTitle(`${result.name}`)
      .addFields(
        {
          name: "줄거리",
          value: `${result.overview.replace(/\n/g, " ").substr(0, 300)}...`
        },
        {
          name: "출시",
          value: `${result.first_air_date.substr(0, 4)}년 ${getDate(result.first_air_date.substr(5, 2))}`,
          inline: true
        },
        {
          name: "현재 기수",
          value: `${result.number_of_seasons}`,
          inline: true
        },
        {
          name: "제작사",
          value: `${result.production_companies.length !== 0 ? result.production_companies[0].name : "정보 없음"}`,
          inline: true
        },
        {
          name: "장르",
          value: `${result.genres.map(v => v.name).toString().replace(/,/g, ', ')}`
        },
        {
          name: "평점",
          value: `${Math.round(result.vote_average)}점`
        }
      )
      .setImage(`https://image.tmdb.org/t/p/original${result.backdrop_path}`)

      if (result.created_by) {
        embed.setAuthor(
          {
            name: `원작자 : ${result.created_by[0].name}`
          }
        )
      }

      return embed
  }
}