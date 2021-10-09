function Photos({ publicURL }) {
    //
}

export async function getPhotos(context) {
    const { publicURL, error } = supabase
    .storage
    .from('photos')
    .getPublicUrl('neko.jpg')
    return {
        publicURL: {
            publicURL,
        },
    }
}

export default Photos

