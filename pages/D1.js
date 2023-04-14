import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./Random1'), {
  ssr: false,
})
export default DynamicHeader  