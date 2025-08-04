let apiKey = '0de1d779880d4b2d85f6b82c7ac81808';

let blogContainer = document.getElementById("blog-container");
let searchFeild = document.getElementById("searchInput");
let searchBtn = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apiKey}`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    return data.articles;

  } catch (error) {
    console.error("Error in Fetching News Data", error);
    return [];
  }

}

searchBtn.addEventListener("click", async () => {
  let query = searchFeild.value.trim();
  if (query !== "") {
    try {
      let articles = await fetchNewsQuery(query)
      displayBlogs(articles)
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
})

async function fetchNewsQuery(query) {
  try {
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    return data.articles;

  } catch (error) {
    console.error("Error in Fetching News Data", error);
    return [];
  }
}


function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    //div
    let blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    //image
    let img = document.createElement("img");
    img.src = article.urlToImage || "https://via.placeholder.com/150";
    img.alt = article.title;

    //h2 tag
    let title = document.createElement("h2");
    let truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
    title.textContent = truncatedTitle;
    //Description (news part )
    let description = document.createElement("p");
    let truncatedDes = article.title.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    })
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    let articles = await fetchRandomNews();
    displayBlogs(articles);

  } catch (error) {
    console.error("Error in Fetching News Data", error);
    return [];
  }

})();