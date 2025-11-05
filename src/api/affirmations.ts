const BASE_URL = "https://affirmation-api.p.rapidapi.com/affirmations";

export async function getThemes(): Promise<string[]>{
    const response = await fetch(BASE_URL + "/themes");
    return response.json();
}

export async function getRandomAffirmation(theme: string): Promise<string> {
  const response = await fetch(BASE_URL + "/random ");
  const data = await response.json();
  return data.text || "No affirmation found.";
}