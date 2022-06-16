import { useState } from 'react'

const SceneOptions: React.FC<{}> = (): JSX.Element => {
  const [selectedShader, setSelectedShader] = useState<string>('flow')
  const options = ['Flow', 'Tunnel']

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10">
        <div className="tabs transition-all ease-in-out rounded-lg hover:-translate-y-1 hover:scale-110 hover:bg-black/[.3]">
          {options.map((option) => (
            <a
              key={option}
              className={`tab ${
                selectedShader === option.toLocaleLowerCase()
                  ? 'font-bold backdrop-blur bg-black/[0.15] rounded-full'
                  : ''
              }`}
              onClick={() => setSelectedShader(option.toLocaleLowerCase())}
            >
              {option}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SceneOptions
