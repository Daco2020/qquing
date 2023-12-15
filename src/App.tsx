import './App.css'
import { Canvas } from '@react-three/fiber'
import ThreeElement from './ThreeElement.tsx'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

function App() {

  const controls = useControls({
    color: '#ffffff',
    segment: {value:20, min:10, max:500, step:1}
  })
  
  return (
    <>
    <Canvas>
      <color attach="background" args={[controls.color]}/>
      <OrbitControls/>
      <axesHelper args={[50]}/>
      <gridHelper args={[controls.segment, controls.segment, "#d1d1d1", "#d1d1d1"]}/>
      <ThreeElement/>
    </Canvas>
    </>
  )
}

export default App
