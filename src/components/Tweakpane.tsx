import { Pane } from 'tweakpane'
import { usePlsStopRerendering, useSettings } from '../lib/stores'

// A bunch of imperative code to enable me to save settings to localStorage
const Tweakpane: React.FC = (): JSX.Element => {
  const existence = usePlsStopRerendering()
  const settings = useSettings((state) => state)

  if (!existence.paneExists) {
    existence.setPaneExists(true)
    const pane = new Pane({
      title: 'Settings',
      expanded: false,
    })

    const tab = pane.addTab({
      pages: [{ title: 'Text' }, { title: 'Background' }],
    })

    tab.pages[1]
      .addInput(settings, 'shaderSpeed', { label: 'Speed', min: 0, max: 5 })
      .on('change', (ev) => {
        settings.setShaderSpeed(ev.value)
      })
    tab.pages[0]
      .addInput(settings, 'distortion', { label: 'Distortion', min: 0, max: 1 })
      .on('change', (ev) => {
        settings.setDistortion(ev.value)
      })
    tab.pages[0]
      .addInput(settings, 'textSpeed', { label: 'Text Speed', min: 0, max: 5 })
      .on('change', (ev) => {
        settings.setTextSpeed(ev.value)
      })
    tab.pages[0]
      .addInput(settings, 'fontSize', { label: 'Text Size', min: 0, max: 1 })
      .on('change', (ev) => {
        settings.setFontSize(ev.value)
      })
    tab.pages[0]
      .addInput(settings, 'textCutoff', { label: 'Text Cutoff', min: 0, max: 10 })
      .on('change', (ev) => {
        settings.setTextCutoff(ev.value)
      })

    tab.pages[1]
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

    const flowSettings = tab.pages[1].addFolder({ title: 'Flow Settings', expanded: false })
    flowSettings
      .addInput(settings, 'lacunarity', { label: 'Lacunarity', min: 0, max: 5 })
      .on('change', (ev) => {
        settings.setLacunarity(ev.value)
      })
    flowSettings
      .addInput(settings, 'gain', { label: 'Gain', min: 0, max: 1 })
      .on('change', (ev) => {
        settings.setGain(ev.value)
      })
    flowSettings
      .addInput(settings, 'ridges', { label: 'Ridges', min: 50, max: 500 })
      .on('change', (ev) => {
        settings.setRidges(ev.value)
      })

    const tunnelSettings = tab.pages[1].addFolder({ title: 'Tunnel Settings', expanded: false })
    tunnelSettings
      .addInput(settings, 'glow', { label: 'Glow', min: 0, max: 1 })
      .on('change', (ev) => {
        settings.setGlow(ev.value)
      })
    tunnelSettings
      .addInput(settings, 'step', { label: 'Step', min: 0, max: 15 })
      .on('change', (ev) => {
        settings.setStep(ev.value)
      })
    tunnelSettings
      .addInput(settings, 'shape', { label: 'Shape', min: 0, max: 2 })
      .on('change', (ev) => {
        settings.setShape(ev.value)
      })
    tunnelSettings
      .addInput(settings, 'scale', { label: 'Scale', min: 0, max: 20 })
      .on('change', (ev) => {
        settings.setScale(ev.value)
      })
    tunnelSettings
      .addInput(settings, 'thickness', { label: 'Thickness', min: 0, max: 0.1 })
      .on('change', (ev) => {
        settings.setThickness(ev.value)
      })

    const saveSettings = pane.addButton({ title: 'Save Settings' })
    saveSettings.on('click', () => {
      localStorage.setItem('sceneSettings', JSON.stringify(settings))
    })

    const resetSettings = pane.addButton({ title: 'Reset Settings' })
    resetSettings.on('click', () => {
      localStorage.clear()
      settings.reset()

      // so hacky
      pane.dispose()
      existence.setPaneExists(false)
    })
  }

  // JSX component so I can use hooks without being yelled at
  // Also to enable next.js dynamic import
  return <></>
}
export default Tweakpane
