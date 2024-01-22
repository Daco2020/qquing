import { useState, useEffect, useRef } from 'react';
import { Box as BoxMesh } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Box = ({ position }) => (
  <BoxMesh position={position}>
    <meshStandardMaterial color="royalblue" />
  </BoxMesh>
);

const EnemyMovingBox = ({ position, setRef }) => {
  const boxRef = useRef();

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
    const handleKeyDown = (event) => {
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

const App = ({setCount}) => {
  const [enemyBoxes, setEnemyBoxes] = useState([]);
  const [intervalDelay, setIntervalDelay] = useState(500); // 초기 간격을 1초로 설정
  const enemyRefs = useRef([]);
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0]);

  const handleCollision = () => {
    console.log('충돌!');
    setCount(count => count + 1);
  };

  useFrame(() => {
    enemyRefs.current.forEach(ref => {
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
      setEnemyBoxes(enemyBoxes => [...enemyBoxes, [xPosition, 0, zPosition]]);

      // 다음 인터벌의 지연 시간을 업데이트
      setIntervalDelay(oldDelay => Math.max(150, oldDelay) ); // 50 이하로 가지 않도록, TODO: 상자가 특정 개수 이상 통과했으면 시간을 줄여서 난이도를 올릴 수 있음
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [intervalDelay]);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MovingBox setPosition={setPlayerPosition} />
      {enemyBoxes.map((position, index) => (
        <EnemyMovingBox key={index} position={position} setRef={(ref) => enemyRefs.current[index] = ref} />
      ))}
    </>
  );
};

export default App;
