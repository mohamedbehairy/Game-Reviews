import { Ui } from "./ui.js";

class Details {
  constructor(id) {
    document.getElementById(
      "showDetails"
    ).innerHTML = `<div class="col-12 loading-spinner">
              <div class="spinner-container">
                <div class="custom-spinner"></div>
                <div class="spinner-text">Loading Details...</div>
              </div>
            </div>`;
    document
      .querySelector(".show-game-details .btn-close")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.closeDetails();
      });
    this.getGameDetails(id);
    this.ui = new Ui();
  }

  async getGameDetails(id) {
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "602c0c26a7mshe3f7fa055731db3p1c01f1jsncb30413b3311",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      const res = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        options
      );
      const game = await res.json();
      this.ui.displayDetails(game);
    } catch (error) {
      console.log("Error!!!", error);
    }
  }

  closeDetails() {
    document.getElementById("showDetailsUi").classList.add("d-none");
    document.getElementById("mainGamesUi").classList.remove("d-none");
  }
}

export default Details;
