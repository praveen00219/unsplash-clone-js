const accessKey = "BdNtRpBKDveuvCT8h6KKO1rjRC7t4ntbIEXTuVa3bcQ";
const perPage = 30;
let currentPage = 1;
let query = "coding"; // Default search query

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const imgContainer = document.getElementById("img-container");

let fetching = false;

// Fetch default images on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchImages();
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (searchInput.value.trim() === "") {
    await fetchImages();
  } else {
    query = searchInput.value.trim();
    currentPage = 2;
    imgContainer.innerHTML = "";
    await fetchImages();
  }
});

// Second search input box
const searchForm2 = document.getElementById("searchForm2");
const searchInput2 = document.getElementById("searchInput2");
searchForm2.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (searchInput2.value.trim() === "") {
    await fetchImages();
  } else {
    query = searchInput2.value.trim();
    currentPage = 1;
    imgContainer.innerHTML = "";
    await fetchImages();
  }
});

async function fetchImages() {
  if (fetching) return; // Avoid fetching if a request is already in progress
  fetching = true; // Set the fetching flag

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&client_id=${accessKey}&per_page=${perPage}`
    );

    const data = await response.json();
    displayImages(data.results);
    currentPage++; // Increment page after successful fetch
  } catch (error) {
    console.error("Error fetching images:", error);
    // Optionally, provide user feedback here
  } finally {
    fetching = false; // Reset the fetching flag
  }
}

function displayImages(images) {
  images.forEach((image) => {
    // Check if the image is in portrait orientation
    if (image.height > image.width) {
      const imgCard = document.createElement("div");
      imgCard.classList.add("img-card", "max-w-sm", "rounded-lg");

      imgCard.innerHTML = `
        <img src="${image.urls.regular}" alt="${image.alt_description}" class="rounded-lg">
        <div class="overlay space-x-2">
          <button class="like-icon bg-white text-black p-2 rounded-lg">
            <span class="unlinked-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="black" fill-rule="evenodd" d="M4.536 5.778a5 5 0 0 1 7.07 0q.275.274.708.682q.432-.408.707-.682a5 5 0 0 1 7.125 7.016L13.02 19.92a1 1 0 0 1-1.414 0L4.48 12.795a5 5 0 0 1 .055-7.017z" />
              </svg>
            </span>
            <span class="linked-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="red" fill-rule="evenodd" d="M4.536 5.778a5 5 0 0 1 7.07 0q.275.274.708.682q.432-.408.707-.682a5 5 0 0 1 7.125 7.016L13.02 19.92a1 1 0 0 1-1.414 0L4.48 12.795a5 5 0 0 1 .055-7.017z" />
              </svg>
            </span>
          </button>
          <button class="add-icon bg-white text-black p-2 rounded-lg">
            <span class="unadded-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="currentColor" d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z" />
                </g>
              </svg>
            </span>
            <span class="added-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="red" d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z" />
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div class="bottom-overlay">
          <div class="text-white">
            <div class="flex items-center space-x-3">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer fill-gray-500" width="1.5em" height="1.5em" viewBox="0 0 48 48">
                  <g>
                    <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0" />
                    <path fill-rule="evenodd" d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20h-.274q-.272 0-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 2.498 4.002A17.94 17.94 0 0 0 42 24c0-9.941-8.059-18-18-18S6 14.059 6 24c0 4.916 1.971 9.373 5.166 12.621" clip-rule="evenodd" />
                  </g>
                </svg>
              </span>
              <div>
                <h4 class="text-sm font-bold">Unsplash+</h4>
                <p class="text-xs">With Riccardo Cervia</p>
              </div>
            </div>
          </div>
          <button class="Download-button bg-gray-800 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Download
          </button>
        </div>
      `;

      imgContainer.appendChild(imgCard);
    }
  });
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchImages();
  }
});
