import { Pane } from 'tweakpane'
import { useSettings } from '../lib/stores'

const Tweakpane: React.FC = (): JSX.Element => {
  const settings = useSettings()

  const PARAMS = {
    speed: 0.5,
  }

  if (!settings.paneExist) {
    settings.setPaneExist(true)
    const pane = new Pane()

    pane.addInput(PARAMS, 'speed').on('change', (ev) => {
      console.log(ev.value)
    })
  }

  return <></>
}
export default Tweakpane
