import { useState, useEffect, useRef } from 'react';
import { Box as BoxMesh } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MutableRefObject } from 'react';

const Box = ({ position }: { position: [number, number, number] }) => (
  <BoxMesh position={position}>
    <meshStandardMaterial color="royalblue" />
  </BoxMesh>
);

const EnemyMovingBox = ({
  position,
  setRef,
}: {
  position: [number, number, number];
  setRef: (ref: MutableRefObject<BoxMesh | null>) => void;
}) => {
  const boxRef = useRef<BoxMesh | null>(null);

  useEffect(() => {
    setRef(boxRef);
  }, [setRef]);

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.position.z += delta * 10;
    }
  });

  return (
    <BoxMesh ref={boxRef} position={position}>
      <meshStandardMaterial color="red" />
    </BoxMesh>
  );
};

const MovingBox = ({
  setPosition,
}: {
  setPosition: (position: [number, number, number]) => void;
}) => {
  const [position, setPositionState] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setPositionState(pos => [pos[0], pos[1], pos[2] - 1]);
          break;
        case 'ArrowDown':
          setPositionState(pos => [pos[0], pos[1], pos[2] + 1]);
          break;
        case 'ArrowLeft':
          setPositionState(pos => [pos[0] - 1, pos[1], pos[2]]);
          break;
        case 'ArrowRight':
          setPositionState(pos => [pos[0] + 1, pos[1], pos[2]]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setPosition(position);
  }, [position, setPosition]);

  return <Box position={position} />;
};

const App = ({
  setCount,
}: {
  setCount: (count: (prevCount: number) => number) => void;
}) => {
  const [enemyBoxes, setEnemyBoxes] = useState<[number, number, number][]>([]);
  const [intervalDelay, setIntervalDelay] = useState<number>(500);
  const enemyRefs = useRef<MutableRefObject<BoxMesh | null>[]>([]);
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0, 0]);

  const handleCollision = () => {
    console.log('충돌!');
    setCount((prevCount: number) => prevCount + 1);
  };

  useFrame(() => {
    enemyRefs.current.forEach((ref) => {
      if (ref.current) {
        const enemyPosition = ref.current.position;
        if (
          Math.abs(playerPosition[0] - enemyPosition.x) < 1 &&
          Math.abs(playerPosition[1] - enemyPosition.y) < 1 &&
          Math.abs(playerPosition[2] - enemyPosition.z) < 1
        ) {
          handleCollision();
        }
      }
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const xPosition = Math.random() * 10 - 5;
      const zPosition = -20;
      setEnemyBoxes((enemyBoxes) => [...enemyBoxes, [xPosition, 0, zPosition]]);

      setIntervalDelay((oldDelay) => Math.max(150, oldDelay));
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [intervalDelay]);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MovingBox setPosition={setPlayerPosition} />
      {enemyBoxes.map((position, index) => (
        <EnemyMovingBox
          key={index}
          position={position}
          setRef={(ref) => (enemyRefs.current[index] = ref)}
        />
      ))}
    </>
  );
};

export default App;
