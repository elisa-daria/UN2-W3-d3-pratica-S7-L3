const row = document.getElementsByClassName("row")[0];

const libraryAtYourDisposal = () => {
  fetch("https://striveschool-api.herokuapp.com/books", {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })

    .then((books) => {
      console.log(books);
      console.log(books[0].title);

      //FUNZIONE RIEMPI SCAFFALE
      const fillTheLibrary = () => {
        books.forEach((book) => {
          const newCol = document.createElement("div");
          newCol.classList.add("col-10");
          newCol.classList.add("col-sm-6");
          newCol.classList.add("col-md-3");
          newCol.innerHTML = `
              <div class="card h-100">
                  <img src="${book.img}" class="card-img-top" style="height:320px" alt="book-cover" />
                      <div class="card-body">
                           <h5 class="card-title fs-5" style="height:135px">${book.title}</h5>
                              <p class="card-text">💲: ${book.price}</p>
                                  <button class="btn btn-outline-danger">Gives me the ick!</button>
                      </div>
              </div>
                    `;
          row.appendChild(newCol);
        });
      };
      //FUNZIONE IT GIVES ME THE ICK:REMOVE IT!
      const removeBook = () => {
        const ickBtns = document.querySelectorAll(".btn-outline-danger");
        ickBtns.forEach((button) => {
          button.addEventListener("click", (e) => {
            const card = e.target.closest(".col-10");
            if (card) {
              row.removeChild(card);
            }
          });
        });
      };
      fillTheLibrary();
      removeBook();
    })

    .catch((error) => {
      console.log(`ERROR:${error}`);
    });
};

//inizializzo la libreria
libraryAtYourDisposal();
