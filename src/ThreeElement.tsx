import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { useControls } from 'leva'

export default function ThreeElement() {
  // useRef는 개체를 참조하는데 사용되는 훅
  const boxRef = useRef<THREE.Mesh>(null!)
  const boxCopyRef = useRef<THREE.Mesh>(null!)
  const boxControl = useControls({
    radius: { value: 1, min: 0, max: 10, step: 0.1 },
    seg: { value: 32, min: 3, max: 64, step: 1 },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
  })

  // 개체를 움직이게 만드는 곳
  useFrame((_, delta) => {});

  // 처음 렌더링 될 때만 실행되고 배열에 담긴 값이 바뀔 때만 실행되는 훅
  useEffect(() => {
    boxCopyRef.current.geometry = boxRef.current.geometry
  },[ boxControl])

  return (
    <>
      <directionalLight position={[5,5,5]}/>
      <mesh 
        ref={boxRef}
        position={[0,0,0]}
        >
        <circleGeometry args={[
          boxControl.radius,
          boxControl.seg,
          THREE.MathUtils.degToRad(boxControl.thetaStart),
          THREE.MathUtils.degToRad(boxControl.thetaLength)
        ]}/>
        <meshStandardMaterial wireframe/>
      </mesh>
      <mesh
      ref={boxCopyRef}
      >
        <meshStandardMaterial color="blue"/>
      </mesh>

    </>
  )

}