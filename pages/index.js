import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from 'next/image'
import { supabase } from '../utils/supabaseClient'

export default function Home(props) {
  let { publicURL } = props
  console.log(publicURL)
  
  return (
    <div className="container">
      <Head>
        <title>Next.js Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Welcome to my app!" />

        <Image 
          src={publicURL}
          width={500}
          height={500}
        />

      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const { publicURL, error } = supabase
  .storage
  .from('photos')
  .getPublicUrl('neko.jpg')
  return {
      props: { publicURL },
  }
}