// import { getThemes, getRandomAffirmation, getRandomAffirmationByTheme } from "./api/affirmations";

import { AffirmationService } from "./api/AffirmationService";
const service = new AffirmationService();

const themesDiv = document.getElementById("themes")!;
const btn = document.getElementById("random-quote")!;
const quoteEl = document.getElementById("quote")!;

async function loadRandomButton(){
  btn.addEventListener("click", async () => {
      const quote = await service.getRandomAffirmation();
      quoteEl.textContent = quote;
  });
}

async function loadThemes() {
  const themes = await service.getThemes();

  themesDiv.innerHTML = themes.map(t => `<button class="theme">${t}</button>`).join("");
  document.querySelectorAll(".theme").forEach(el => {
    el.addEventListener("click", async () => {
      const theme = (el as HTMLElement).innerText;
      const quote = await service.getRandomAffirmationByTheme(theme);
      quoteEl.textContent = quote;
    });
  });
}

loadRandomButton();
loadThemes();
