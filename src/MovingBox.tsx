import { useState, useEffect, useRef } from 'react';
import { Box as BoxMesh } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Box = ({ position }) => (
  <BoxMesh position={position}>
    <meshStandardMaterial color="royalblue" />
  </BoxMesh>
);

const EnemyMovingBox = ({ position, setRef }) => {
  const boxRef = useRef<BoxMesh>(null); // 타입을 BoxMesh로 지정

  useEffect(() => {
    setRef(boxRef); // 상위 컴포넌트로 ref 전달
  }, [setRef]);

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.position.z += delta * 10; // TODO: 상자가 특정 개수 이상 통과했으면 숫자를 늘려서 난이도를 올릴 수 있음
    }
  });

  return (
    <BoxMesh ref={boxRef} position={position}>
      <meshStandardMaterial color="red" />
    </BoxMesh>
  );
};

const MovingBox = ({ setPosition }) => {
  const [position, setPositionState] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { // 타입을 명시적으로 KeyboardEvent로 지정
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

const App = ({ setCount }: { setCount: (count: number) => void }) => { // setCount를 props로 전달하고 타입을 명시적으로 지정
  const [enemyBoxes, setEnemyBoxes] = useState<number[][]>([]); // 타입 지정
  const [intervalDelay, setIntervalDelay] = useState<number>(500); // 타입 지정
  const enemyRefs = useRef<(React.MutableRefObject<BoxMesh | null>)[]>([]); // 타입 지정
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0, 0]); // 타입 지정

  const handleCollision = () => {
    console.log('충돌!');
    setCount((count: number) => count + 1); // 타입 지정
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
      const xPosition = Math.random() * 10 - 5; // 박스의 X 위치
      const zPosition = -20; // 박스의 Z 위치
      setEnemyBoxes((enemyBoxes: number[][]) => [...enemyBoxes, [xPosition, 0, zPosition]]); // 타입 지정

      // 다음 인터벌의 지연 시간을 업데이트
      setIntervalDelay((oldDelay: number) => Math.max(150, oldDelay)); // 타입 지정
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
