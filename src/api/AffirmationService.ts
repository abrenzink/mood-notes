export class AffirmationService {

  private apiUrl: string;
  private apiKey: string;
  private apiHost: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_RAPIDAPI_URL;
    this.apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    this.apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  }

  private get headers(): HeadersInit {
    return {
      "x-rapidapi-key": this.apiKey,
      "x-rapidapi-host": this.apiHost,
    };
  }

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

  async getThemes(): Promise<string[]> {
    const response = await fetch(`${this.apiUrl}/themes`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) throw new Error(`Failed to fetch themes: ${response.status}`);
    const data = await response.json();

    return Array.isArray(data) ? data : data.themes;
  }
}
