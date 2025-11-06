export class ErrorHandler {
    
  static handle(error: unknown, userMessage = "Something went wrong."): void {
    console.error("Error details:", error);

    const statusEl = document.getElementById("status");
    if (statusEl) {
      statusEl.textContent = `⚠️ ${userMessage}`;
      (statusEl as HTMLElement).style.color = "red";
    } else {
      alert(userMessage);
    }
  }

  static clear(): void {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.textContent = "";
  }
}
