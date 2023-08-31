const input = document.getElementById('input');
const btn = document.getElementById('btn');
const newsSection = document.getElementById('news-section')
const loader = document.getElementById('loader')

const makingCard = ({ imgSrc, newsLink, cardTitle, cardNews }) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.setAttribute('id', 'card');
    const img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    div.append(img);
    const cardHead = document.createElement('h3');
    cardHead.setAttribute('class', 'card-head');
    cardHead.innerText = cardTitle;
    div.append(cardHead);
    const cardDescription = document.createElement('p');
    cardDescription.setAttribute('class', 'card-description');
    cardDescription.innerText = cardNews;
    div.append(cardDescription);
    const readDiv = document.createElement('div');
    readDiv.setAttribute('class', 'read-more');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', newsLink);
    anchor.innerText = 'Read More';

    readDiv.append(anchor);
    div.append(readDiv);
    newsSection.append(div);
}
let newsData = [];
let query = 'india';
const fetchData = async (searchInput) => {
    try {
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=c45880031b5b4e4dbaea271ab3a534d7`
        const data = await fetch(url);
        const dataReadable = await data.json();
        newsData = dataReadable.articles;
        if (newsData.length === 0) {
            alert('Kuch Dhang ka search karega tabhi to dikhega???')
        }
        else {
            newsData.map((value, index) => {
                loader.style.display = 'none';
                if ((value.urlToImage != null) && (value.url != null) && (value.title != null) && (value.description != null)) {
                    const news = {
                        imgSrc: value.urlToImage,
                        newsLink: value.url,
                        cardTitle: value.title,
                        cardNews: value.description
                    }
                    makingCard(news);
                }
            })
        }
    } catch (error) {
        console.log('no data')
    }
}
fetchData();
const removeCard = () => {
    loader.style.display = 'flex';
    const removeArray = document.querySelectorAll('.card');
    for (let i of removeArray) {
        i.remove();
    }
}
let searchInput = '';
input.addEventListener('change', (e) => {
    searchInput = e.target.value;
})
btn.addEventListener('click', () => {
    newsData = [];
    if (searchInput === '') {
        alert("Sharam aa Rahi Hai??")
    }
    else {
        removeCard();
        query = searchInput;
        fetchData(searchInput);
    }
})