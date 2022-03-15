import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from 'next/image'
import { buildUrl, extractPublicId } from 'cloudinary-build-url'
import { Cloudinary } from '@cloudinary/url-gen'
import {Resize} from '@cloudinary/url-gen/actions/resize'

export default function Home({ images }) {

  // console.log('halp', images)

  return (
    <div className="container">
      <Head>
        <title>Next.js Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Welcome to my app!" />

        <div className="all_images">
        {images.map((image ) => (
          <div className="image_container">
          <img
            src={image.url}
            width={image.width}
            height={image.height}
            alt={image.alt}
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

  const cloudinaryLib = "cutelify"

  const results = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryLib}/resources/image`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());

  const { resources } = results;

  const images = resources.map(resource => { 
    return {
      url:`https://res.cloudinary.com/${cloudinaryLib}/image/${resource.type}/v1646929623/c_crop,h_200,w_200/${resource.public_id}.${resource.format}`,
      //publicId:`${resource.public_id}`,
      //width: resource.width,
      //height: resource.height,
      //alt: "something here"
    }
  })


  return {
    props: { 
      images
    }
  }

}