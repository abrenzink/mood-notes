export class AffirmationService {

  private apiUrl: string;
  private apiKey: string;
  private apiHost: string;

  constructor() {
    // Load API info from environment variables
    this.apiUrl = import.meta.env.VITE_RAPIDAPI_URL;
    this.apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    this.apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  }

  // Headers for API requests
  private get headers(): HeadersInit {
    return {
      "x-rapidapi-key": this.apiKey,
      "x-rapidapi-host": this.apiHost,
    };
  }

  // Get a random affirmation
  async getRandomAffirmation(): Promise<string> {
    const response = await fetch(`${this.apiUrl}/random`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log(data.affirmation);
    return data.affirmation;
  }

  // Get a random affirmation for a specific theme
  async getRandomAffirmationByTheme(theme: string): Promise<string> {
    const response = await fetch(`${this.apiUrl}/random/${theme}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    console.log(data.affirmation);
    return data.affirmation;
  }

  // Get a list of all themes
  async getThemes(): Promise<string[]> {
    const response = await fetch(`${this.apiUrl}/themes`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) throw new Error(`Failed to fetch themes: ${response.status}`);
    const data = await response.json();

    // Return array of themes
    return Array.isArray(data) ? data : data.themes;
  }
}
