import { useFrame } from '@react-three/fiber'
import { useEffect} from 'react'

export default function ThreeElement() {
  // 개체를 움직이게 만드는 곳
  useFrame((state, delta) => {});

  // 처음 렌더링 될 때만 실행되고 배열에 담긴 값이 바뀔 때만 실행되는 훅
  useEffect(() => {

  },[])

  return (
    <>
      <directionalLight position={[5,5,5]}/>
      <mesh
        position={[0,0,0]}
      >
        <boxGeometry />
        <meshStandardMaterial wireframe color="red" />
      </mesh>
    </>
  )
}