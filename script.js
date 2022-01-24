const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


const apiKey = 'jyb2kTqcPqIj3JcsJoHjXTlDPpNPAlBahlfdWEyLtfU';
let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];

function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
        count = 30;
    }
}

//Create photo elements
const displayPhotos = () => {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        console.log(photo);
        const item = document.createElement('div');
        item.classList.add('image-item');
        const a = document.createElement('a');
        setAttributes(a, {
            href: photo.links['html'],
            target: '_blank'
        });

        const img = document.createElement('img');
        img.classList.add('image-content');
        img.addEventListener('load', imageLoaded);
        setAttributes(img, {
            src: photo.urls['regular'],
            alt: photo['alt_description'],
            title: photo['alt_description']
        });

        a.appendChild(img);
        item.appendChild(a);
        imageContainer.appendChild(item);
    });
}


//Get Photos from Unsplash Api
const getPhotos = async () => {
    try{
        const  response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (e) {

    }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos().then();
    }
});

getPhotos().then();
