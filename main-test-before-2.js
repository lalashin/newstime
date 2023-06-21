let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
//console.log("menus", menus);
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));

let searchButton = document.getElementById("search_button");
// console.log("searchButton");
let url
//각 함수에서 필요한 URL을 만든다.
//api 호출 함수를 부른다
const getNews = async () => {

    try {
        let header = new Headers({
            // 'x-api-key': 'bOSyaXlJcqFJm0vX2iUZH-GyHOIgOJEZmvxUv4dOCz1'
            'x-api-key': 'L_y1ku9zlbj2emnwUMI5kFYIDC6qRql28-UqM4a0Mq4'
        });
        url.searchParams.set('page', page); //&page=
        console.log("url?", url);
        let response = await fetch(url, { headers: header });//ajax, http, fetch
        let data = await response.json();
        //console.log("this is data", data);
        if (response.status == 200) {
            if (data.total_hits == 0) {
                throw new Error("검색된 결과값이 없습니다.");
            }
            console.log("받는데이터가뭐지?", data)
            total_pages = data.total_pages;
            page = data.page;
            news = data.articles;
            //console.log(news);

            render();
            pagenation();

        } else {
            throw new Error(data.message);
        }

        // console.log("response는", response);
        // console.log("data는", data);

    } catch (error) {
        // console.log("잡힌 에러는", error.message);
        errorRender(error.message);
    }


}
const getLatestNews = async () => {
    url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
    );

    getNews();

};

const getNewsByTopic = async (event) => {
    // console.log("클릭됨", event.target.textContent);
    let topic = event.target.textContent.toLowerCase()

    url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
    );

    getNews();
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
    console.log("keyword", keyword)
    url = new URL(
        `https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`
    );

    getNews();
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

    document.getElementById("news_board").innerHTML = newsHTML;
};

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`
    document.getElementById("news_board").innerHTML = errorHTML;
}



const pagenation = () => {

    //total_page
    //page
    //page group
    let pageGroup = Math.ceil(page / 5);
    //last
    let last = pageGroup * 5
    //first
    let first = last - 4
    //first~last 페이지 프린트

    // tatal page 3일경우 3개의 페이지만 프린트하는 방법 last, first
    // << >> 이 버튼 만들어주기 맨처음, 맨끝으로 가는 버튼 만들기
    // 내가 그룹1 일때 << < 이 버튼이 없다.
    // 내가 마지막 그룹일때 > >> 버튼이 없다.


    let pagenationHTML = ` <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page - 1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`;
    for (let i = first; i <= last; i++) {
        pagenationHTML += ` <li class="page-item ${page == i ? "active" : ""} "><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }
    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page + 1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li>`;
    document.querySelector(".pagination").innerHTML = pagenationHTML;

}

const moveToPage = (pageNum) => {
    //1. 이동하고 싶은 페이지를 알아야함
    page = pageNum;
    console.log(page);
    getNews()
    //2. 이동하고 싶은 페이지를 가지고 api를 다시 호출
}

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();


//Pagenation
//1. page정보기준으로 내가 몇번째 그룹인지 안다.Math.ceil(page/5)
// 2. 그 그룹의 첫번째(마지막-4)와 마지막 페이지를 안다. 그룹숫자 *5
// 3. 첫번째~ 마지막 페이까지 그려준다.
//   for(첫번째~마지막)
//    <a> page number</a>