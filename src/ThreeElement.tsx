import * as THREE from 'three'

export default function ThreeElement() {
  return (
    <>
      <directionalLight position={[1,5,5]}/>
      {/* <mesh rotation={[0,30,0]}> */}
      <mesh rotation={[
        THREE.MathUtils.degToRad(45),
        THREE.MathUtils.degToRad(45),
        0]}>
        <boxGeometry />
        <meshMatcapMaterial color="hotpink" />
      </mesh>
    </>
  )

}