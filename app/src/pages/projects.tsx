import { CustomLoader } from '@/components/dom/Loader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
// import Shader from '@/components/canvas/Shader/Shader'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

const ProjectsShader = dynamic(
  () => import('@/components/canvas/ProjectsShader'),
  {
    ssr: false,
  }
)

const Page = (props) => {
  const [unmount, setUnmount] = useState<boolean>(false)

  return (
    <>{!unmount && <CustomLoader setUnmount={setUnmount} text='Projects' />}</>
  )
}

// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <ProjectsShader />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Dale Bañares | Projects',
    },
  }
}
