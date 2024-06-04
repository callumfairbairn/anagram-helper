const BASE_RADIUS = 100
const boxDim = 27

interface CircleProps {
  letters: string[]
}

export const Circle = ({ letters }: CircleProps) => {
  const radius = getRadius(letters.length)
  return (
    <div style={{ paddingTop: radius, paddingBottom: radius + 16 }}>
      {letters.map((char, i) => <div
        key={`${i}-${char}`}
        className={`absolute border text-xl rounded-md`}
        style={{ width: `${boxDim}px`, height: `${boxDim}px`, ...getTransform(letters.length, i, radius) }}
      >
        {char}
      </div>
      )}
    </div>
  )
}

const getRadius = (inputLength: number) => {
  const charLimit = 13
  if (inputLength > charLimit) {
    return BASE_RADIUS
  }

  return (BASE_RADIUS / charLimit) * inputLength
}

const getTransform = (inputLength: number, index: number, radius: number) => {
  const yTranslate = Math.floor(Math.cos((index / inputLength) * 2 * Math.PI) * radius)
  const xTranslate = Math.floor(Math.sin((index / inputLength) * 2 * Math.PI) * radius)
  return {
    transform: `translate(${xTranslate - boxDim / 2}px, ${-yTranslate}px)`
  }
}