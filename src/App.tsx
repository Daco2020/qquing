import './App.css'
import { Canvas } from '@react-three/fiber'
import MovingBox from './MovingBox.tsx'
import { OrbitControls } from '@react-three/drei'
// import { useControls } from 'leva'

function App() {

  // const controls = useControls({
  //   color: '#ffffff',
  //   segment: {value:20, min:10, max:500, step:1}
  // })
  
  return (
    <>
    <Canvas>
      <OrbitControls/>
      <axesHelper args={[100]}/>
      <gridHelper args={[]}/>
      <MovingBox/>
    </Canvas>
    </>
  )
}

export default App
