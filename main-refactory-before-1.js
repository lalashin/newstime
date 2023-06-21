let news = [];
let menus = document.querySelectorAll(".menus button");
//console.log("menus", menus);
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));

let searchButton = document.getElementById("search_button");
// console.log("searchButton");

//각 함수에서 필요한 URL을 만든다.
//api 호출 함수를 부른다
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

const getNewsByKeyword = async () => {
    //console.log("click")
    //1. 검색키워드읽기
    //2. url 검색키워드 넣기
    //3. 헤더준비
    //4. url 부르기
    //5. 데어터 가져오기
    //6. 데이터 보여주기

    let keyword = document.getElementById("search_input").value;
    //console.log("keyword", keyword)
    let url = new URL(
        `https://api.newscatcherapi.com/v2/search?q=${keyword}&from=2021/12/15&countries=KR&page_size=10`
    );
    let header = new Headers({
        'x-api-key': 'hQHgayRJNFeBrSx9GyTukDR3EreXiRMu8sSltHYqVyc'
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    //console.log(data)
    news = data.articles;
    render()

}

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
searchButton.addEventListener("click", getNewsByKeyword)
getLatestNews();
