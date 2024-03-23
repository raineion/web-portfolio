import React, { Suspense } from 'react'
import { useThree, Vector3 } from '@react-three/fiber'
import {
  Html,
  Loader,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  Sparkles,
  Text,
} from '@react-three/drei'

import Shader from './Shader/Shader'

const ProjectsShader: React.FC = () => {
  const posY = -0.5

  const images = [
    {
      title: 'Uno',
      position: [-0.1, -1 + posY, -0.09],
      src: '/img/projects/iphone.jpg',
      url: 'https://iphone-config.vercel.app/',
    },

    {
      title: 'Dos',
      position: [0.1, -2 + posY, -0.09],
      src: '/img/projects/laptop.jpg',
      url: 'https://umamin.link/',
    },

    {
      title: 'Tres',
      position: [-0.1, -3 + posY, -0.09],
      src: '/img/projects/hello.jpg',
      url: 'https://chatti.vercel.app',
    },

    {
      title: 'Cuatro',
      position: [0.1, -4 + posY, -0.09],
      src: '/img/projects/head.jpg',
      url: 'https://github.com/hyamero',
    },
  ]

  const { width } = useThree((state) => state.viewport)

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 1]}
        fov={55}
        near={0.1}
        far={100}
      />

      <ScrollControls
        pages={5.5}
        distance={1}
        damping={4}
        horizontal={false}
        infinite={false}
      >
        <fog attach='fog' args={[0x050505, 0, 6]} />
        <Scroll>
          <Sparkles
            count={35}
            position={[-0.5, -2, -3.5]}
            scale={[6, 10, 10]}
            size={1}
            speed={2}
          />
          <Suspense
            fallback={
              <Html>
                <Loader />
              </Html>
            }
          >
            <Shader
              image={'/img/projects/texture.webp'}
              planeArgs={[6, 4, 32, 32]}
              planeRotation={[-Math.PI / 2.3, 0, 0]}
              wireframe={true}
              pointer={false}
              position={[0, -0.2, -1]}
            />

            {images.map((image, i) => {
              const { position, src, title, url } = image

              return (
                <group key={url}>
                  <Shader
                    image={src}
                    position={position as Vector3}
                    planeArgs={[0.4, 0.6, 32, 32]}
                    planeRotation={[0, 0, 0]}
                    wireframe={false}
                    pointer={true}
                    url={url}
                  />

                  <Text
                    position={[0, position[1], 0.1] as Vector3}
                    fillOpacity={0.7}
                    font='/FogtwoNo5.otf'
                    fontSize={width / 16}
                    material-toneMapped={false}
                    anchorX='center'
                    anchorY='middle'
                  >
                    {title}
                  </Text>

                  <Text
                    position={[-position[0], position[1], 0.4] as Vector3}
                    strokeWidth={'0.1%'}
                    strokeOpacity={0.4}
                    strokeColor='#ffffff'
                    fillOpacity={0}
                    font='/FogtwoNo5.otf'
                    fontSize={width / 8}
                    material-toneMapped={false}
                    anchorX={`${position[0] === 0.1 ? 'right' : 'left'}`}
                    anchorY='middle'
                  >
                    {i + 1}
                  </Text>
                </group>
              )
            })}
            <Text
              position={[0, 0.7, -3]}
              rotation={[-0.3, 0, 0]}
              lineHeight={1.3}
              fillOpacity={1}
              font='/FogtwoNo5.otf'
              fontSize={width / 2}
              material-toneMapped={false}
              anchorX='center'
              anchorY='middle'
            >
              Projects
            </Text>
          </Suspense>
        </Scroll>
      </ScrollControls>
    </>
  )
}

export default ProjectsShader
