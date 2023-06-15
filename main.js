let news = [];
let menus = document.querySelectorAll(".menus button");
//console.log("menus", menus);
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));
const getLatestNews = async () => {
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
    );
    // console.log(url);
    let header = new Headers({
        'x-api-key': 'hQHgayRJNFeBrSx9GyTukDR3EreXiRMu8sSltHYqVyc'
    });

    let response = await fetch(url, { headers: header });//ajax, http, fetch
    let data = await response.json();
    //console.log("this is data", data);
    news = data.articles;
    // console.log(news);

    render()
};

const getNewsByTopic = async (event) => {
    // console.log("클릭됨", event.target.textContent);
    let topic = event.target.textContent.toLowerCase()

    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
    );
    //console.log(url)
    let header = new Headers({
        'x-api-key': 'hQHgayRJNFeBrSx9GyTukDR3EreXiRMu8sSltHYqVyc'
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    //console.log(data)
    news = data.articles;
    render()
};

const render = () => {
    let newsHTML = '';
    newsHTML = news.map(item => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news_img_size" src="${item.media}" alt="">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div>${item.rights} * ${item.published_date}</div>
        </div>
    </div>`
    }).join('');

    //console.log(newsHTML);

    document.getElementById("news_board").innerHTML = newsHTML
}

getLatestNews();
