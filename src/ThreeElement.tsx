import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { useControls } from 'leva'

export default function ThreeElement() {
  // useRef는 개체를 참조하는데 사용되는 훅
  const boxRef = useRef<THREE.Mesh>(null!)
  const boxCopyRef = useRef<THREE.Mesh>(null!)
  const boxControl = useControls({
    width : {value:1, min:0.1, max:10, step:0.1},
    height : {value:1, min:0.1, max:10, step:0.1},
    depth : {value:1, min:0.1, max:10, step:0.1},
    withSegments : {value:1, min:1, max:10, step:1},
    heightSegments : {value:1, min:1, max:10, step:1},
    depthSegments : {value:1, min:1, max:10, step:1},

  })

  // 개체를 움직이게 만드는 곳
  useFrame((_, delta) => {});

  // 처음 렌더링 될 때만 실행되고 배열에 담긴 값이 바뀔 때만 실행되는 훅
  useEffect(() => {
    boxCopyRef.current.geometry = boxRef.current.geometry
  },[ boxControl.width, boxControl.height, boxControl.depth, boxControl.withSegments, boxControl.heightSegments, boxControl.depthSegments])

  return (
    <>
      <directionalLight position={[5,5,5]}/>
      <mesh 
        ref={boxRef}
        position={[0,0,0]}
        >
        <boxGeometry args={[boxControl.width, boxControl.height, boxControl.depth, boxControl.withSegments, boxControl.heightSegments, boxControl.depthSegments]}/>
        <meshStandardMaterial wireframe/>
      </mesh>
      <mesh
      ref={boxCopyRef}
      >
        <meshStandardMaterial color="tomato"/>
      </mesh>

    </>
  )

}