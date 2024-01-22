import './App.css'
import { Canvas } from '@react-three/fiber'
import MovingBox from './MovingBox.tsx'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
// import { useControls } from 'leva'

function App() {
  const [collisionCount, setCollisionCount] = useState(0);
  // const controls = useControls({
  //   color: '#ffffff',
  //   segment: {value:20, min:10, max:500, step:1}
  // })
  const CollisionCounter = ({ count }) => (
    <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 24 }}>
      점수: {count}
    </div>
  );
  
  return (
    <>
    <Canvas>
      <OrbitControls/>
      <axesHelper args={[100]}/>
      <gridHelper args={[]}/>
      <MovingBox setCount={setCollisionCount}/>
    </Canvas>
    <CollisionCounter count={collisionCount} />
    </>
  )
}

export default App
