import { useState } from 'react';
import './App.css'
import { Input, UnderlineInput } from './components/ui/input'
import { Button } from './components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import { Circle } from './components/Circle';

function App() {
  const [input, setInput] = useState<string[]>([]);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center gap-3'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight w-72'>Start typing</h4>
        <Input className='max-w-sm' onChange={(e) => { setInput(e.target.value.toLocaleUpperCase().split('').sort(randomSort)) }} />
        <div className='self-end shrink-3'>
          <Button onClick={() => setInput(prevValue => [...prevValue.sort(randomSort)])} className='self-end'><ShuffleIcon /></Button>
        </div>
        <Circle letters={input} />
      </div>
      <div className='flex gap-1'>
        {input.map((_, i) => <UnderlineInput key={i} className='max-w-10' />)}
      </div>
    </div>
  )
}

const randomSort = () => Math.random() < 0.5 ? -1 : 1

export default App
