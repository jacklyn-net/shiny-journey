import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Home({ images }) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="container">
      <Head>
        <title>ʕ•ᴥ•ʔ</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pacifico"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
      </Head>
      <main>
        <Header title="[ git cute ]" />
        <div className="text">
          When you click a photo, an image markdown code is copied to your<br></br>clipboard so you can easily use the image in your GitHub issues or PRs.
          <br></br><br></br>
          all images from <a href="https://unsplash.com/">unsplash</a>
        </div>
        <div className="all_images">
        {images.map((image ) => (
          <div className="image_container">
          <img
            src={image.url}
            alt={image.alt}
            onClick={() => {navigator.clipboard.writeText(image.copyMe) && handleClick()}}
          />
          <Snackbar
            open={open}
            autoHideDuration={2200}
            onClose={handleClose}
            message="✅  &nbsp; Copied!"
            action={action}
            ContentProps={{
              sx: {
                background: "#1D2F6F",
                boxShadow: 0,
              }
            }}
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

  const results = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryLib}/resources/image?max_results=40`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());

  const { resources } = results;

  const images = resources.map(resource => { 
    return {
      url:`https://res.cloudinary.com/${cloudinaryLib}/image/${resource.type}/c_fill,g_auto,q_auto:good,w_300,h_350/${resource.public_id}.${resource.format}`,
      publicId: resource.public_id,
      copyMe: `![cute animal](https://res.cloudinary.com/${cloudinaryLib}/image/${resource.type}/c_fill,g_auto,q_auto:good,w_300,h_350/${resource.public_id}.${resource.format})`,
      alt: 'cute image of animal'
    }
  })


  return {
    props: { 
      images
    }
  }

}