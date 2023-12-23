import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTexture} from '@react-three/drei'


export default function ThreeElement() {

  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const matcap = useTexture('./imgs/matcap.jpg')
  const tone = useTexture('./imgs/fiveTone.jpg')

  // 아래 설정을 해줘야 toon 느낌을 낼 수 있음
  tone.minFilter = THREE.NearestFilter // 텍스쳐가 축소되었을 때 픽셀이 깨지는 것을 방지
  tone.magFilter = THREE.NearestFilter // 텍스쳐가 확대되었을 때 픽셀이 깨지는 것을 방지

  // 개체를 움직이게 만드는 곳
  useFrame((state, delta) => {});

  // 처음 렌더링 될 때만 실행되고 배열에 담긴 값이 바뀔 때만 실행되는 훅
  useEffect(() => {
    for(let i=0; i<groupRef.current!.children.length; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh
      mesh.geometry = meshRef.current!.geometry
      mesh.position.x = i*2
    }

  },[])

  return (
    <>
      <directionalLight position={[5,5,5]} intensity={1}/>
      <fog attach={"fog"} args={[0xffffff, 5, 20]}/>
      <mesh
        ref={meshRef}
        position={[0,0,0]}
        >
        <torusKnotGeometry args={[0.5, 0.15]}/>
        <meshBasicMaterial visible={false} color="green" />
      </mesh>
      <group
      ref={groupRef}>
        {/* 기본 머터리얼 */}
      <mesh>
        <meshBasicMaterial wireframe color="green" />
      </mesh>
      <mesh
        >
        <meshBasicMaterial 
        color="red" 
        visible={true}
        transparent={true}
        opacity={1} // transparent 가 true 일 때만 적용
        side={THREE.DoubleSide} // 바깥 면, 안쪽 면 렌더링
        alphaTest={0.5} // 투명도가 0.5 이상인 부분만 렌더링
        depthTest={true} // 뒤에 있어도 가리지 않고 렌더링
        depthWrite={true}
        fog={false} // false 면 fog 가 적용되지 않음
        />
      </mesh>
      
      {/* 빛에 영향을 받는 머터리얼 */}
      <mesh
      >
        <meshLambertMaterial 
        color="red" 
        visible={true}
        transparent={true}
        opacity={1} // transparent 가 true 일 때만 적용
        side={THREE.DoubleSide} // 바깥 면, 안쪽 면 렌더링
        alphaTest={0.5} // 투명도가 0.5 이상인 부분만 렌더링
        depthTest={true} // 뒤에 있어도 가리지 않고 렌더링
        depthWrite={true}
        fog={false} // false 면 fog 가 적용되지 않음
        
        emissive={"blue"} // 빛을 내는 색
        />
      </mesh>
      <mesh
      >
        <meshPhongMaterial 
        color="red" 
        visible={true}
        transparent={true}
        opacity={1} // transparent 가 true 일 때만 적용
        side={THREE.DoubleSide} // 바깥 면, 안쪽 면 렌더링
        alphaTest={0.5} // 투명도가 0.5 이상인 부분만 렌더링
        depthTest={true} // 뒤에 있어도 가리지 않고 렌더링
        depthWrite={true}
        fog={false} // false 면 fog 가 적용되지 않음
        
        emissive={"blue"} // 빛을 내는 색
        specular={"yellow"} // 빛을 반사하는 색
        shininess={40} // 빛을 반사하는 정도
        flatShading={true} // false 면 빛을 반사하는 색이 부드럽게 적용됨
        />
      </mesh>
      <mesh>
        {/* normal 벡터(각면의 축)를 rgb로 표현한 것 */}
        <meshNormalMaterial /> 
      </mesh>

      {/* 물리 기반 렌더링 머터리얼 */}
      <mesh>
        <meshStandardMaterial 
        color="red" 
        visible={true}
        transparent={true}
        opacity={1} // transparent 가 true 일 때만 적용
        side={THREE.DoubleSide} // 바깥 면, 안쪽 면 렌더링
        alphaTest={0.5} // 투명도가 0.5 이상인 부분만 렌더링
        depthTest={true} // 뒤에 있어도 가리지 않고 렌더링
        depthWrite={true}
        fog={false} // false 면 fog 가 적용되지 않음
        
        emissive={"blue"} // 빛을 내는 색
        roughness={1} // 거칠기
        metalness={0} // 금속성
        />
      </mesh>
      <mesh>
        <meshPhysicalMaterial  
        color="red" 
        visible={true}
        transparent={true}
        opacity={1} // transparent 가 true 일 때만 적용
        side={THREE.DoubleSide} // 바깥 면, 안쪽 면 렌더링
        alphaTest={0.5} // 투명도가 0.5 이상인 부분만 렌더링
        depthTest={true} // 뒤에 있어도 가리지 않고 렌더링
        depthWrite={true}
        fog={true} // false 면 fog 가 적용되지 않음
        
        emissive={"blue"} // 빛을 내는 색
        roughness={1} // 거칠기
        metalness={0} // 금속성
        clearcoat={1} // 투명도
        clearcoatRoughness={0} // 투명도 거칠기

        transmission={1} // 투명도
        thickness={2} // 물체의 두께
        ior={1} // 빛의 굴절률
        />
      </mesh>
      <mesh>
        {/* 카메라 거리에 따라 검정에서 흰색으로 변화함 */}
        <meshDepthMaterial />
      </mesh>

      {/* 매캡은 빛이 필요하지 않음 */}
      <mesh>
        <meshMatcapMaterial matcap={matcap} flatShading={false}/>
      </mesh>
      <mesh>
        <meshToonMaterial gradientMap={tone}/>
      </mesh>
      </group>
    </>
  )
}