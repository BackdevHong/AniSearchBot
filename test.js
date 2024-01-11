const { default: axios } = require("axios");
const dotenv = require("dotenv");
// const { aniInfoEmbed } = require("../embed/aniInfoEmbed");

dotenv.config()

let id = 0;
const getAniIDOption = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/search/tv?query=나의 히어로 아카데미아&include_adult=false&language=ko-KR&page=1`,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API}`
  }
};

axios
  .request(getAniIDOption)
  .then((res) => {
    const getAniOption = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${res.data.results[0].id}?language=ko-KR`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API}`
      }
    };
    
    axios
      .request(getAniOption)
      .then((res) => {
        console.log(res.data)
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