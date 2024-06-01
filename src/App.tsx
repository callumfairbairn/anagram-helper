import { useState } from 'react';
import './App.css'
import { Input } from './components/ui/input'

const BASE_RADIUS = 100

function App() {
  const [input, setInput] = useState('');
  const randomisedInput = input.split('').sort(() => Math.random() < 0.5 ? -1 : 1)
  const radius = getRadius(input.length)

  return (
    <div className='flex flex-col items-center gap-2'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>Start typing</h4>
      <Input className='max-w-sm' onChange={(e) => { setInput(e.target.value.toLocaleUpperCase()) }} />
      <div style={{ paddingTop: radius, marginTop: '1.5rem' }}>
        {randomisedInput.map((char, i) =>
          <div
            key={i}
            className={`absolute border h-7 w-7 text-xl`}
            style={{ ...getTransform(input.length, i, radius) }}
          >
            {char}
          </div>
        )}
      </div>
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
    transform: `translate(${xTranslate}px, ${-yTranslate}px)`
  }
}

export default App
