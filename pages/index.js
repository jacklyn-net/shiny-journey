import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home({ images }, copyUrl) {

  // console.log('halp', images)

  return (
    <div className="container">
      <Head>
        <title>ʕ•ᴥ•ʔ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="cute things are here" />
        <div className="text">
          When you click a photo, an image markdown code is copied to your <br></br>clipboard so you can easily use the image in your GitHub issues or PRs.
        </div>
        <div className="all_images">
        {images.map((image ) => (
          <div className="image_container">
          <img
            src={image.url}
            alt={image.alt}
            onClick={() => {navigator.clipboard.writeText(image.copyMe)}}
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

  // console.log(results);

  const images = resources.map(resource => { 
    return {
      url:`https://res.cloudinary.com/${cloudinaryLib}/image/${resource.type}/c_fill,g_auto,q_auto:low,w_300,h_350/${resource.public_id}.${resource.format}`,
      publicId: resource.public_id,
      copyMe: `![cute animal](https://res.cloudinary.com/${cloudinaryLib}/image/${resource.type}/c_fill,g_auto,q_auto:low,w_300,h_350/${resource.public_id}.${resource.format})
      `,
      alt: 'cute image of animal'
    }
  })


  return {
    props: { 
      images
    }
  }

}