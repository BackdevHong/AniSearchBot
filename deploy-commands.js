const {SlashCommandBuilder, REST, Routes, PermissionFlagsBits, ChannelType} = require("discord.js")

const commands = [
    new SlashCommandBuilder()
        .setName('애니')
        .setDescription('애니메이션 정보를 불러옵니다')
        .addStringOption(
            opt => opt
                .setName("이름")
                .setDescription("애니메이션 이름을 입력해주세요!")
                .setRequired(true)
        )
].map(command => command.toJSON());

module.exports = {
    registerCommands : (token, clientId) => {
        const rest = new REST({version: '10'}).setToken(token);
    
        rest.put(Routes.applicationCommands(clientId), {body: commands})
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    }
}