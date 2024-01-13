const dotenv = require("dotenv");
const { aniInfoEmbed } = require("../embed/aniInfoEmbed.js");
const axios = require('axios');

dotenv.config()

module.exports = {
  /**
   * 
   * @param {import("discord.js").ChatInputCommandInteraction} interaction 
   */
  aniInfoHandling : async (interaction) => {
    await interaction.deferReply()
    const aniName = interaction.options.getString("이름")
    
    let id = 0;
    const getAniIDOption = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/tv?query=${aniName}&include_adult=false&language=ko-KR&page=1`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API}`
      }
    };

    axios
      .request(getAniIDOption)
      .then((res) => {
        if (res.data.results.length === 0) {
          return interaction.editReply({
            content: `검색 결과가 없습니다.`
          })
        }

        res.data.results.forEach((v) => {
          if (v.genre_ids.includes(16)) {
            id = v.id
          }
        })

        if (id === 0) {
          return interaction.editReply({
            content: `검색 결과가 없습니다.`
          })
        }

        const getAniOption = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${id}?language=ko-KR`,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API}`
          }
        };
        
        axios
          .request(getAniOption)
          .then((res) => {
            return interaction.editReply({
              embeds: [aniInfoEmbed(res.data)]
            })
          })
          .catch((error) => {
            console.log(error)
            return interaction.editReply({
              content: `검색 결과가 없습니다.`
            })
          })
      })
      .catch((error) => {
        console.log(error)
        return interaction.editReply({
          content: `인증, 혹은 애니메이션 검색에 실패하였습니다. ${error.message}`
        })
      })    
  }
}