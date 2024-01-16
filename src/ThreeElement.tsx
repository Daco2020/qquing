import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export default function ThreeElement() {
  const boxRef = useRef<THREE.Mesh>(null!);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState(new THREE.Vector3());

  // 클릭 시작 시간을 추적하기 위한 state
  const [clickStart, setClickStart] = useState<number | null>(null);

  useFrame((_, delta) => {
    let newVelocity = velocity - 12.8 * delta;
    boxRef.current.position.y += newVelocity * delta;
    boxRef.current.position.x += direction.x * delta;
    boxRef.current.position.z += direction.z * delta;

    if (boxRef.current.position.y <= 0) {
      boxRef.current.position.y = 0;
      newVelocity *= -0.5;

      if (Math.abs(newVelocity) < 0.5) {
        newVelocity = 0;
        setDirection(new THREE.Vector3(0, 0, 0));
      }
    }
    setVelocity(newVelocity);
  });

  // pointerDown 이벤트 핸들러
  const handlePointerDown = () => {
    setClickStart(Date.now());
  };

  // pointerUp 이벤트 핸들러
  const handlePointerUp = () => {
    if (clickStart !== null) {
      const clickDuration = Date.now() - clickStart;
      setVelocity(5 + clickDuration / 200);
      setDirection(new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize());
    }
  };


  return (
    <>
      <directionalLight position={[1, 5, 5]} />
      <mesh
        ref={boxRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        position={[0, 3, 0]}
        >
        <boxGeometry />
        <meshMatcapMaterial color="hotpink" />
      </mesh>
    </>
  );
}
