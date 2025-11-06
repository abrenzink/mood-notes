export class ErrorHandler {
    
  // Show an error message and log details to the console
  static handle(error: unknown, userMessage = "Something went wrong."): void {
    console.error("Error details:", error);

    const statusEl = document.getElementById("status");
    if (statusEl) {
      statusEl.textContent = `⚠️ ${userMessage}`;
      (statusEl as HTMLElement).style.color = "red";
    } else {
    // Fallback alert if status element is missing
      alert(userMessage);
    }
  }

  // Clear any previous error message
  static clear(): void {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.textContent = "";
  }
}
