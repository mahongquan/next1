import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./App'), {
  ssr: false,
})
export default DynamicHeader  