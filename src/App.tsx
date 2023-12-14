import './App.css'
import Hello from './Hello.tsx'
import ThreeElement from './ThreeElement.tsx'
import { Canvas } from '@react-three/fiber'

function App() {
  
  return (
    <>
    <Canvas>
      <ThreeElement/>
    </Canvas>
      <Hello to="QQuing" from="Daco"></Hello>
    </>
  )
}

export default App
