import { Pane } from 'tweakpane'
import { useSettings } from '../lib/stores'

const Tweakpane: React.FC = (): JSX.Element => {
  const settings = useSettings()

  if (!settings.paneExist) {
    settings.setPaneExist()
    const pane = new Pane()

    pane.addInput(settings, 'shaderSpeed', { label: 'Speed', min: 0, max: 5 }).on('change', (ev) => {
      settings.setShaderSpeed(ev.value)
    })
  }

  return <></>
}
export default Tweakpane
