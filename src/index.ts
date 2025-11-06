import { getThemes, getRandomAffirmation, getRandomAffirmationByTheme } from "./api/affirmations";

const themesDiv = document.getElementById("themes")!;
const btn = document.getElementById("random-quote")!;
const quoteEl = document.getElementById("quote")!;

async function loadRandomButton(){
  btn.addEventListener("click", async () => {
      const quote = await getRandomAffirmation();
      quoteEl.textContent = quote;
  });
}

async function loadThemes() {
  const themes = await getThemes();

  themesDiv.innerHTML = themes.map(t => `<button class="theme">${t}</button>`).join("");
  document.querySelectorAll(".theme").forEach(el => {
    el.addEventListener("click", async () => {
      const theme = (el as HTMLElement).innerText;
      const quote = await getRandomAffirmationByTheme(theme);
      quoteEl.textContent = quote;
    });
  });
}

loadRandomButton();
loadThemes();
