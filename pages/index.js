import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from 'next/image'

export default function Home({ results }) {
  // let { cuties } = props
  //const { results } = props
  // console.log('cuties', cuties);
  // below line might not be necessary?
  //const { resources } = results;

  console.log('halp me', results)

  return (
    <div className="container">
      <Head>
        <title>Next.js Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Welcome to my app!" />

        <div className="all_images">
        {results.resources.map((resource ) => (
          <div className="image_container">
          <Image
          src={resource.url}
          layout="fill"
          />
          </div>
        ))}
        </div>

      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const results = await fetch('https://api.cloudinary.com/v1_1/cutelify/resources/image', {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());

  const { resources } = results;

  return {
    props: { 
      results 
    }
  }
}