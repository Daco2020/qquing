import { useState, useEffect, useRef } from 'react';
import { Box as BoxMesh } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Box = ({ position }: { position: [number, number, number] }) => (
  <BoxMesh position={position}>
    <meshStandardMaterial color="royalblue" />
  </BoxMesh>
);

const EnemyMovingBox = ({onPositionChange}) => {
  const boxRef = useRef(); 

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.position.z += delta; 
      console.log(boxRef.current.position.z)
      onPositionChange([boxRef.current.position.x, boxRef.current.position.y, boxRef.current.position.z]);
    }
  });

  return (
    <BoxMesh ref={boxRef} position={[0, 0, -10]}>
      <meshStandardMaterial color="royalblue" />
    </BoxMesh>
  );
};


const MovingBox = ({ onCollision, boxPosition }) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

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
      // if (Math.abs(position[0] - boxPosition[0]) < 1 &&
      //     Math.abs(position[1] - boxPosition[1]) < 1 &&
      if (Math.abs(position[2] - boxPosition[2]) < 1) {
        onCollision();
      }
    };

    checkCollision(); 
  }, [position, boxPosition, onCollision]);

  return <Box position={position} />;
};

const App = () => {
  const [enemyBoxPosition, setEnemyBoxPosition] = useState<[number, number, number]>([0, 0, -10]);
  const handleCollision = () => {
    console.log('충돌!');
    // alert('게임 오버!');
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MovingBox onCollision={handleCollision} boxPosition={enemyBoxPosition}/>
      <EnemyMovingBox onPositionChange={setEnemyBoxPosition}/>
    </>
  );
};

export default App;
