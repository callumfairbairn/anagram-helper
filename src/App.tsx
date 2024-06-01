import { useState } from 'react';
import './App.css'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button';
import { ShuffleIcon } from 'lucide-react';

const BASE_RADIUS = 100
const boxDim = 27

function App() {
  const [input, setInput] = useState<string[]>([]);
  const radius = getRadius(input.length)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center gap-3'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight w-72'>Start typing</h4>
        <Input className='max-w-sm' onChange={(e) => { setInput(e.target.value.toLocaleUpperCase().split('').sort(randomSort)) }} />
        <div className='self-end shrink-3'>
          <Button onClick={() => setInput(prevValue => [...prevValue.sort(randomSort)])} className='self-end'><ShuffleIcon /></Button>
        </div>
        <div style={{ paddingTop: radius }}>
          {input.map((char, i) =>
            <div
              key={`${i}-${char}`}
              className={`absolute border text-xl`}
              style={{ width: `${boxDim}px`, height: `${boxDim}px`, ...getTransform(input.length, i, radius) }}
            >
              {char}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const randomSort = () => Math.random() < 0.5 ? -1 : 1

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

export default App
