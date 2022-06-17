import { Pane } from 'tweakpane'
import { usePlsStopRerendering, useSettings } from '../lib/stores'

const Tweakpane: React.FC = (): JSX.Element => {
  const existence = usePlsStopRerendering()
  const settings = useSettings((state) => state)

  if (!existence.paneExists) {
    existence.setPaneExists(true)
    const pane = new Pane({
      title: 'Settings',
      expanded: true,
    })

    pane.addInput(settings, 'shaderSpeed', { label: 'Speed', min: 0, max: 5 }).on('change', (ev) => {
      settings.setShaderSpeed(ev.value)
    })
    pane
      .addInput(settings, 'backgroundShader', {
        label: 'Background',
        options: {
          flow: 'flow',
          tunnel: 'tunnel',
        },
      })
      .on('change', (ev) => {
        settings.setBackgroundShader(ev.value)
      })

    const resetSettings = pane.addButton({ title: 'Reset Settings' })
    resetSettings.on('click', () => {
      localStorage.clear()
      settings.resetShaderSpeed()
      settings.resetBackgroundShader()

      // so hacky
      pane.dispose()
      existence.setPaneExists(false)
    })

    const saveSettings = pane.addButton({ title: 'Save Settings' })
    saveSettings.on('click', () => {
      localStorage.setItem('sceneSettings', JSON.stringify(settings))
    })
  }

  return <></>
}
export default Tweakpane
