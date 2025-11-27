import Details from "./getDetails.js";
import { Ui } from "./ui.js";

export default class Games {
  constructor() {
    this.getGames();

    document.querySelectorAll(".navbar .nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(
          "gamesList"
        ).innerHTML = `<div class="col-12 loading-spinner">
              <div class="spinner-container">
                <div class="custom-spinner"></div>
                <div class="spinner-text">Loading Games...</div>
              </div>
            </div>`;
        document
          .querySelector(".navbar .nav-link.active")
          .classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });

      this.ui = new Ui();
    });
  }

  async getGames(cat = "mmorpg") {
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
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
        options
      );
      const result = await res.json();
      this.ui.displayGames(result);
      this.addDetailsClick();
    } catch (error) {
      console.log("Error!!!", error);
    }
  }

  addDetailsClick() {
    document.querySelectorAll(".game-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const gameId = item.dataset.game_id;
        this.showDetails(gameId);
      });
    });
  }

  showDetails(id) {
    const details = new Details(id);
    document.getElementById("showDetailsUi").classList.remove("d-none");
    document.getElementById("mainGamesUi").classList.add("d-none");
  }
}
