import { useState, useEffect, useRef } from 'react';
import { Box as BoxMesh } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Box = ({ position }: { position: [number, number, number] }) => (
  <BoxMesh position={position}>
    <meshStandardMaterial color="royalblue" />
  </BoxMesh>
);

const RandomMovingBox = ({setRandomBoxPosition}) => {
  const boxRef = useRef(); // 박스의 참조를 생성합니다.

//   useFrame((_, delta) => {
//     let newVelocity = velocity - 12.8 * delta;
//     boxRef.current.position.y += newVelocity * delta;
//     boxRef.current.position.x += direction.x * delta;
//     boxRef.current.position.z += direction.z * delta;

//     if (boxRef.current.position.y <= 0) {
//       boxRef.current.position.y = 0;
//       newVelocity *= -0.5;
  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.position.z += delta; // 매 프레임마다 Y 축 위치를 1만큼 증가시킵니다.
      setRandomBoxPosition([boxRef.current.position.x, boxRef.current.position.y, boxRef.current.position.z])
      // 다른 축(x, z)에 대한 움직임이 필요하다면 여기에 로직을 추가합니다.
    }
  });

  return (
    <BoxMesh ref={boxRef} position={[0, 0, -10]}>
      <meshStandardMaterial color="royalblue" />
    </BoxMesh>
  );
};


const MovingBox = ({ onCollision, randomBoxPosition }) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  // console.log(position, randomBoxPosition)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setPosition(pos => [pos[0], pos[1], pos[2] - 1]);
          break;
        case 'ArrowDown':
          setPosition(pos => [pos[0], pos[1], pos[2] + 1]);
          break;
        case 'ArrowLeft':
          setPosition(pos => [pos[0] - 1, pos[1], pos[2]]);
          break;
        case 'ArrowRight':
          setPosition(pos => [pos[0] + 1, pos[1], pos[2]]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      console.log(position, randomBoxPosition)
      if (Math.abs(position[0] - randomBoxPosition[0]) < 1 &&
          Math.abs(position[1] - randomBoxPosition[1]) < 1 &&
          Math.abs(position[2] - randomBoxPosition[2]) < 1) {
        onCollision();
      }
    };

    const id = setInterval(checkCollision, 100); // 매 100ms마다 충돌을 확인
    return () => clearInterval(id);
  }, [position, randomBoxPosition, onCollision]);

  return <Box position={position} />;
};

const App = () => {
  const [randomBoxPosition, setRandomBoxPosition] = useState([0, 0, -10]);
  // console.log(randomBoxPosition, setRandomBoxPosition)
  const handleCollision = () => {
    console.log('충돌!');
    // alert('게임 오버!');
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MovingBox onCollision={handleCollision} randomBoxPosition={randomBoxPosition}/>
      <RandomMovingBox setRandomBoxPosition={setRandomBoxPosition}/>
    </>
  );
};

export default App;
