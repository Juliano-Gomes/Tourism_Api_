export let db_country =[
    {
        id:"1",
        name:"london",
        author:"johndoe@gmail.com",
        description:"one of the most beautiful part of united kingdom",
        country:"united kingdom",
        image:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/04/13/istock-458936005.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp"
    },{
        id:"2",
        name:"Paris",
        author:"jeanmarrie@gmail.com",
        description:"one of the most beautiful part of france",
        country:"France",
        image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/67/21/caption.jpg?w=600&h=500&s=1"

    },{
        id:"3",
        name:"Madrid",
        author:"pietro@gmail.com",
        description:"one of the most beautiful part of spain",
        country:"spain",
        image:"https://ak-d.tripcdn.com/images/1i64m4224ti9zqdcx7E48_W_640_0_R5_Q80.jpg?proc=source/trip"

    },{
        id:"4",
        name:"Rome",
        description:"one of the most beautiful part of italy",
        author:"mamamya@gmail.com",
        country:"Italy",
        image:"https://miro.medium.com/v2/resize:fit:720/format:webp/1*fgjFweEGCe8crTnzwcgJXQ.jpeg"

    },{
        id:"5",
        name:"covilha",
        author:"caetano@gmail.com",
        description:"one of the most beautiful and peaceful part of portugal",
        country:"Portugal",
        image:"https://atickettotakeoff.com/wp-content/uploads/2024/02/What-to-visit-in-Covilha-Urban-Art-7-1024x682.jpg.webp"

    },{
        id:"6",
        name:"rio of janeiro",
        author:"celdjine@gmail.com",
        description:"one of the most beautiful and peaceful part of Brazil",
        country:"Brasil",
        image:"https://bookaweb.s3.eu-central-1.amazonaws.com/media/27763/responsive-images/Rio-de-Janeiro-%281%29___media_library_original_1200_630.jpg"
    },{
        id:"7",
        name:"Tokyo",
        author:"marklander@gmail.com",
        description:"one of the most beautiful and peaceful part of Japan",
        country:"Japan",
        image:"https://www.japan-guide.com/blog/g/sakura25_250414_fuji_feature.jpg"
    },{
        id:"8",
        name:"Sydney",
        author:"markz@gmail.com",
        description:"one of the most beautiful and peaceful part of Australia",
        country:"Australia",
        image:"https://www.sydney.com/sites/sydney/files/styles/gallery_no_thumb_large/public/2024-07/148558%20-%20Bondi%20Beach%20-%20Sydney%20-%20DNSW%20-%20desktop.webp?h=76e65f98&itok=R0djagMg"
    },{
        id:"9",
        name:"New York",
        author:"jordan@gmail.com",
        description:"one of the most beautiful and peaceful part of USA",
        country:"USA",
        image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/2c/15/ac/the-metropolitan-museum.jpg?w=600&h=500&s=1"
    },{
        id:"10",
        name:"Luanda",
        author:"cg@gmail.com",
        description:"one of the most beautiful and peaceful part of Angola",
        country:"Angola",
        image:"https://images.tripspell.com/h600,80/SPELL/best-travel-destinations-and-cities-in-angola/5e8b496a07c4962b92282d49/5e8b498907c4962b92282d4c.webp"
    }
]
type db={
    id: string;
    name: string;
    author: string;
    description: string;
    country: string;
    image: string;
}
export const update_db = (data:any[])=>{
    try {
        db_country = data;  
        return true   
    } catch (error) {
        return false
    }
}

export const create_db = (data:db)=>{
    try {
        db_country.push(data)
        return true
    } catch (error) {
        return false
    }
}

export const delete_db = (id:string)=>{
    try {
        db_country = db_country.filter(e=>{
            return e.id !== id
        })
        return true
    } catch (error) {
        return false
    }
}
