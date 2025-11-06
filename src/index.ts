// import { getThemes, getRandomAffirmation, getRandomAffirmationByTheme } from "./api/affirmations";

import { AffirmationService } from "./api/AffirmationService";
import { ErrorHandler } from "./utils/ErrorHandler";

// Instantiate service (handles API calls)
const service = new AffirmationService();

// Select DOM elements
const themesDiv = document.getElementById("themes")!;
const btn = document.getElementById("random-quote")!;
const quoteEl = document.getElementById("quote")!;

// Create a status element dynamically used for error messages
const statusEl = document.createElement("p");
statusEl.id = "status";
document.body.appendChild(statusEl);

// Recursively renders a list of theme buttons
async function renderThemesRecursively(themes: string[], index = 0): Promise<void> {
  // Base case: stop when all themes are rendered
  if (index >= themes.length) return;

  // Create a new button for the current theme
  const theme = themes[index];
  const button = document.createElement("button");
  button.classList.add("theme");
  button.textContent = theme ?? "";

  // Add click listener to fetch an affirmation for the selected theme
  button.addEventListener("click", async () => {
    try {
      ErrorHandler.clear();
      const quote = await service.getRandomAffirmationByTheme(theme!);
      quoteEl.textContent = quote;
    } catch (err) {
      // Handle errors
      ErrorHandler.handle(err, "Failed to load affirmation for this theme.");
    }
  });
  
  themesDiv.appendChild(button);

  // Recursive call for the next theme
  await renderThemesRecursively(themes, index + 1);
}

// Loads all themes from the API and triggers recursive rendering
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

// Event listener for the "Get Random Affirmation" button
btn.addEventListener("click", async () => {
  try {
    ErrorHandler.clear();
    const quote = await service.getRandomAffirmation();
    quoteEl.textContent = quote;
  } catch (err) {
    ErrorHandler.handle(err, "Failed to load random affirmation.");
  }
});

// Load themes on page load
loadThemes();
