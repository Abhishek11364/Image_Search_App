const accesskey = "RsZ66W3SLfbm6bNgikLLGOLT2YJCN7CqaZfOYhWxHtQ";
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const search_results = document.querySelector(".srch_results");
const show_btn = document.getElementById("btn_show");

let inputData = "";
let page = 1;

async function search() {
  inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.results) {
    const results = data.results;

    if (page === 1) {
      search_results.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("srch_result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.textContent = result.alt_description;
      imageLink.target = "_blank";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      search_results.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      show_btn.style.display = "block";
    }
  } else {
    console.error("No results found.");
  }
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search();
});

show_btn.addEventListener("click", () => {
  search();
});
