import { lastFmData, lastFmSongProps } from '../lib/types'

const SongInfo: React.FC<lastFmSongProps> = ({ song }): JSX.Element => {
  //   const { track } = songData
  return (
    <div className="absolute bottom-0 right-0 m-2">
      <h1>{song.track}</h1>
      <h2>{song.artist}</h2>
      <h2>{song.album}</h2>
      {/* <a href={lastFmData?.url}>
        <img className="m-16 w-1/2 rounded-lg" src={lastFmData?.image}></img>
      </a> */}

      {/* <p>User: {user}</p> */}
    </div>
  )
}
export default SongInfo
