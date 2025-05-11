
// const books =  [
//     {
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       section: "Fiction",
//       description: "A classic novel about the American dream.",
//       link: "https://example.com/gatsby"
//     },
//     {
//       title: "1984",
//       author: "George Orwell",
//       section: "Dystopian",
//       description: "A novel about a totalitarian future.",
//       link: "https://example.com/1984"
//     },
//     {
//       title: "Atomic Habits",
//       author: "James Clear",
//       section: "Self-help",
//       description: "Small habits that lead to big results.",
//       link: "https://example.com/atomic-habits"
//     },
//     {
//       title: "python",
//       author: "Oumar",
//       section: "programming",
//       description: "A hand on programming with python programming language",
//       link: "https://example.com/python"
//     }
//   ];

//   const rowsContainer = document.querySelector(".rows-section")

// function displayBooks(booksList) {

//   rowsContainer.innerHTML = "";

//   booksList.forEach(book => {
//     const title = document.createElement("div");
//     title.textContent = book.title;
//     title.style.cursor = "pointer";
//     title.style.textDecoration = "underline";
//     title.classList.add("rows");
//     title.addEventListener("click", ()=> openPopup(book));

//     const author = document.createElement("div");
//     author.textContent= book.author;
//     author.classList.add("rows");

//     const section = document.createElement("div");
//     section.textContent = book.section;
//     section.classList.add("rows");

//     const description = document.createElement("div");
//     description.textContent = book.description;
//     description.classList.add("rows");

//     const downloadLink = document.createElement("div");
//     downloadLink.innerHTML = `<a href=" ${book.link} "> Download </a>`;
//     downloadLink.classList.add("rows");

//     rowsContainer.append(title, author, section, description, downloadLink);
//   })
// }

// displayBooks(books)

// search fonctionality
  // const searchInput = document.querySelector("#search-input")
  //   searchInput.addEventListener("input", () => {
  //   const query = searchInput.value.toLowerCase()

  //   const filterBooks = books.filter(book =>
  //     book.title.toLowerCase().includes(query) ||
  //     book.author.toLowerCase().includes(query) ||
  //     book.section.toLowerCase().includes(query)
  //   );

  //   displayBooks(filterBooks)
  // })

  // // filtering by section

  //   function filterBySection () {

  //     const sectionFilter = document.getElementById("section-filter");
  //     sectionFilter.addEventListener("change", ()=> {
  //       const selectedSection = sectionFilter.value;
  //       const matchSection = selectedSection === "all" ? books :
  //       books.filter(book => book.section === selectedSection )
  
  //       displayBooks(matchSection)
  //     })
      
  //   }

  //   filterBySection()

  const openPopup = (title, author, section, description, link) =>{
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-author").textContent = author;
    document.getElementById("popup-section").textContent = section;
    document.getElementById("popup-description").textContent = description;
    document.getElementById("popup-link").href = link;
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-overlay").style.display = "block";
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup-overlay").style.display = "none";
  }

  const backToTopBtn = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

  