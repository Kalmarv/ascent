import { lastFmSongProps } from '../types/types'

const SongInfo: React.FC<lastFmSongProps> = ({ song }): JSX.Element => {
  //   const { track } = songData
  return (
    <div className="absolute bottom-0 right-0 m-2">
      <h1 className="font-bold text-right text-black">{song.track}</h1>
      <h2 className="text-right text-black">{song.artist}</h2>
    </div>
  )
}
export default SongInfo
