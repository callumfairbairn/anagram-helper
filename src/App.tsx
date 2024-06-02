import { useState } from 'react';
import './App.css'
import { Input, UnderlineInput } from './components/ui/input'
import { Button } from './components/ui/button';
import { ShuffleIcon } from 'lucide-react';

const BASE_RADIUS = 100
const boxDim = 27

function App() {
  const [input, setInput] = useState<string[]>([]);
  const inputLength = input.length
  const radius = getRadius(inputLength)

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
              className={`absolute border text-xl rounded-md`}
              style={{ width: `${boxDim}px`, height: `${boxDim}px`, ...getTransform(inputLength, i, radius) }}
            >
              {char}
            </div>
          )}
        </div>
        <div className='flex gap-1' style={{ paddingTop: radius + 16 }}>
          {input.map((_, i) => <UnderlineInput key={i} className='max-w-10' />)}
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
