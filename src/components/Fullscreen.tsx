import useFullscreen from '@jdthornton/usefullscreen'

export const FullScreen: React.FC<{}> = (): JSX.Element => {
  const [isFullscreen, toggleFullscreen] = useFullscreen()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all h-8 w-8 absolute bottom-2 right-2 opacity-25 hover:opacity-100 hover:cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      onClick={toggleFullscreen}
    >
      {!isFullscreen ? (
        <>
          <path d="M3 3H9V5H5V9H3V3Z" fill="black" />
          <path d="M3 21H9V19H5V15H3V21Z" fill="black" />
          <path d="M15 21H21V15H19V19H15V21Z" fill="black" />
          <path d="M21 3H15V5H19V9H21V3Z" fill="black" />
        </>
      ) : (
        <>
          <path d="M9 9H3V7H7V3H9V9Z" fill="black" />
          <path d="M9 15H3V17H7V21H9V15Z" fill="black" />
          <path d="M21 15H15V21H17V17H21V15Z" fill="black" />
          <path d="M15 9.00012H21V7.00012H17V3.00012H15V9.00012Z" fill="black" />
        </>
      )}
    </svg>
  )
}
export default FullScreen
