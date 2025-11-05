import { getThemes, getRandomAffirmation } from "./api/affirmations";

const themesDiv = document.getElementById("themes")!;
const quoteEl = document.getElementById("quote")!;
const btn = document.getElementById("random-quote")!;

async function loadThemes() {
  const themes = [
    "self-love", "confidence", "gratitude", "motivation",
    "mindfulness", "health", "healing", "peace",
    "abundance", "purpose", "growth", "relationships"
  ];

  themesDiv.innerHTML = themes.map(t => `<button class="theme">${t}</button>`).join("");
  document.querySelectorAll(".theme").forEach(el => {
    el.addEventListener("click", async () => {
      const theme = (el as HTMLElement).innerText;
      const quote = await getRandomAffirmation(theme);
      quoteEl.textContent = quote;
    });
  });
}

loadThemes();
