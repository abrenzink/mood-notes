// import { getThemes, getRandomAffirmation, getRandomAffirmationByTheme } from "./api/affirmations";

import { AffirmationService } from "./api/AffirmationService";
import { ErrorHandler } from "./utils/ErrorHandler";

const service = new AffirmationService();

const themesDiv = document.getElementById("themes")!;
const btn = document.getElementById("random-quote")!;
const quoteEl = document.getElementById("quote")!;
const statusEl = document.createElement("p");
statusEl.id = "status";
document.body.appendChild(statusEl);


async function renderThemesRecursively(themes: string[], index = 0): Promise<void> {
  // base case: list is finished
  if (index >= themes.length) return;

  // create current btn
  const theme = themes[index];
  const button = document.createElement("button");
  button.classList.add("theme");
  button.textContent = theme ?? "";

  // adds listener
  button.addEventListener("click", async () => {
    try {
      ErrorHandler.clear();
      const quote = await service.getRandomAffirmationByTheme(theme!);
      quoteEl.textContent = quote;
    } catch (err) {
      ErrorHandler.handle(err, "Failed to load affirmation for this theme.");
    }
  });
  
  themesDiv.appendChild(button);

  // Recalls function
  await renderThemesRecursively(themes, index + 1);
}


async function loadThemes(): Promise<void> {
  try {
    ErrorHandler.clear();
    const themes = await service.getThemes();

    themesDiv.innerHTML = "";
    await renderThemesRecursively(themes);
  } catch (err) {
    ErrorHandler.handle(err, "Failed to load themes.");
  }
}

btn.addEventListener("click", async () => {
  try {
    ErrorHandler.clear();
    const quote = await service.getRandomAffirmation();
    quoteEl.textContent = quote;
  } catch (err) {
    ErrorHandler.handle(err, "Failed to load random affirmation.");
  }
});

loadThemes();
