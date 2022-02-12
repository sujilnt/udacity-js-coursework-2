import * as Immutable from "https://unpkg.com/immutable@4.0.0-rc.9/dist/immutable.es.js?module";

let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign({},store, newState);
    render(root, store);

    console.log("store",store);
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { apod } = state

    return `
        <main class="mainContainer">
            ${Greeting(store.user.name)}
            <section>
                <h3 class="heading3 pTag">Put things on the page!</h3>
                <p class="pTag" style="margin-top: 20px;">
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${imageOfTheDay(apod)}
            </section>
        </main>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    const message = name ? `Welcome, ${name}!` : 'Hello!';
    return `<h1>${message}</h1>`
}

// Example of a pure function that renders infomation requested from the backend
function imageOfTheDay(apod){
    const {date, explanation, hdurl,media_type,service_version,title,url } = apod;

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    if (!apod || date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (media_type === "video") {
        return (`
            <p class="pTag">See today's featured video <a href="${url}">here</a></p>
            <p class="pTag">${title}</p>
            <p class="pTag">${explanation}</p>
        `)
    } else {
        return (`
            <div class="container">
                 <img src=${hdurl} class="image"  alt="nasa apod image "/>
                <p class="pTag">${explanation}</p>
            </div>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (store) => {
    console.log("immutable", Immutable);
    /*fetch(`http://localhost:3000/apod`)
        .then((response)=> response.json())
        .then((apod)=> updateStore(store, {apod}));*/
}
