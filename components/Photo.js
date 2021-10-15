import { supabase } from '../utils/supabaseClient'


export async function getStaticProps() {
    const { publicURL, error } = supabase
    .storage
    .from('photos')
    .getPublicUrl('photos/neko.jpg')
    return {
        props: { publicURL },
    }
}