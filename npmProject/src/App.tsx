import { useState } from 'react'
import JWJWSearchBox from './components/JWJWSearchBox'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JWJWSearchBox/>      
    </>
  )
}

export default App
