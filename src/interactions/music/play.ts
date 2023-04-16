import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember } from "discord.js";
import { SearchResult, ConnectionState } from "vulkava";
import { SlashCommandBuilder } from "../../structures/Classes/SlashCommand";

export default new SlashCommandBuilder({
  name: "play",
  description: "Toque uma música em um canal de voz",
  options: [
    {
      name: "song",
      description: "Me diga o som que deseja tocar",
      type: 3,
      required: true
    }
  ],
 async run({ client, interaction }) {
    const button = new ButtonBuilder().setLabel("Servidor de Suporte").setStyle(ButtonStyle.Link).setURL("https://discord.com/").setDisabled(true)
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([button])

  const song = interaction.options.getString("song")

   let player = client.manager.players.get(interaction.guild.id);
  const member = interaction.member as GuildMember;
      const currentChannel = member?.voice?.channelId;
      if (!currentChannel) {
        return interaction.reply({
          content: 'Você não está em um canal de voz.',
          ephemeral: true
        });
      }
    const res: SearchResult = await client.manager.search(song)
    if(res.loadType === "LOAD_FAILED") {
      return interaction.reply({ content: `Ocorreu algum problema ao carregar esta faixa.`, components: [row], ephemeral: true })
    } else if(res.loadType === "NO_MATCHES") {
      return interaction.reply({ content: `Não achei nada relacionado a faixa **${song}**.`})
    }

    if (!player) {
      player = client.manager.createPlayer({
        guildId: interaction.guild.id,
        voiceChannelId: interaction.member.voice.channelId,
        textChannelId: interaction.channel.id,
        selfDeaf: true,
      });
      player.filters.setVolume(30);
    }

    if (player.state === ConnectionState.DISCONNECTED) player.connect();



    if(res.loadType === "PLAYLIST_LOADED") {
      for (const track of res.tracks) {
        track.setRequester(interaction.user)
        player.queue.add(track)
      }
      interaction.reply(`Você adicionou uma playlist a fila de espera chamada: ${res.playlistInfo.name}`)
    } else {
      
      const track = res.tracks[0]
      track.setRequester(interaction.user)
      player.queue.add(track)
        interaction.reply("Você adicionou uma música a queue.")

      if(!player.playing) player.play()
    }
  }
})