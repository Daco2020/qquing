import './App.css';
import { Canvas } from '@react-three/fiber';
import MovingBox from './MovingBox.tsx';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

interface CollisionCounterProps {
  count: number;
}

function CollisionCounter({ count }: CollisionCounterProps) {
  return (
    <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 24 }}>
      점수: {count}
    </div>
  );
}

function App() {
  const [collisionCount, setCollisionCount] = useState<number>(0);

  return (
    <>
      <Canvas>
        <OrbitControls />
        <axesHelper args={[100]} />
        <gridHelper args={[]} />
        <MovingBox setCount={setCollisionCount} />
      </Canvas>
      <CollisionCounter count={collisionCount} />
    </>
  );
}

export default App;
