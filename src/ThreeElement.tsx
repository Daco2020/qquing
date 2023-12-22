import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function ThreeElement() {
  // useRef는 개체를 참조하는데 사용되는 훅
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState(new THREE.Vector3());
  const {scene} = useThree();
  const boxRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)


  // 개체를 움직이게 만드는 곳
  useFrame((_, delta) => {
    // 중력 효과
    let newVelocity = velocity - 12.8 * delta; // 중력 가속도 적용
    boxRef.current.position.y += newVelocity * delta;
    boxRef.current.position.x += direction.x * delta;
    boxRef.current.position.z += direction.z * delta;

    if (boxRef.current.position.y <= 0) {
      // 바닥에 닿으면
      boxRef.current.position.y = 0;
      newVelocity *= -0.5; // 반발력 적용

      if (Math.abs(newVelocity) < 0.5) {
        newVelocity = 0; // 최소 속도 도달 시 정지
        setDirection(new THREE.Vector3(0,0,0)); // 정지 시 방향도 0으로 설정
    }
  }
    setVelocity(newVelocity);
  });

  const handleClick = () => {
    setVelocity(5); // 초기 속도 설정
    setDirection(new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize()); // 랜덤 방향 설정
  };

  // scene.rotation.x = THREE.MathUtils.degToRad(45);
  scene.rotation.x += 0.01;
  groupRef.current.rotation.y += 0.01;

  return (
    <>
      <directionalLight position={[1,5,5]}/>
      <group
        ref={groupRef}
        position={[0,0,0]}
      >  
      <mesh 
        ref={boxRef}
        onClick={handleClick}
        position={[0,0,0]}
        scale={[1,1,1]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0)]}>
        <boxGeometry />
        <meshMatcapMaterial color="hotpink" />
      </mesh>
      <mesh 
        ref={boxRef}
        onClick={handleClick}
        position={[3,0,0]}
        scale={[1,1,1]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0)]}>
        <boxGeometry />
        <meshMatcapMaterial color="tomato" />
      </mesh>
      <mesh 
        ref={boxRef}
        onClick={handleClick}
        position={[0,0,3]}
        scale={[1,1,1]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0)]}>
        <boxGeometry />
        <meshMatcapMaterial color="orange" />
      </mesh>
      </group>
    </>
  )

}