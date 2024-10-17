const acceskey = "kxBJ7aAHdJqcKy8mFLa-eitva8uwzzuUAxEWiyh93xc";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acceskey}&per_page=12`;

    try {
        const response = await fetch(url); 
        const data = await response.json();
        const results = data.results;

        if(page ===1){
            searchResult.innerHTML = "";
        }

        if (results) {
            results.forEach((result) => {
                const image = document.createElement("img");
                image.src = result.urls.small;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });
        }
    } catch (error) {
        console.error('Error fetching images', error);
    }
    showMoreBtn.style.display = "block";
    
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
})
