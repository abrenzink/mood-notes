const API_URL = import.meta.env.VITE_RAPIDAPI_URL;
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// API call options
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY,
		'x-rapidapi-host': API_HOST
	}
};

export async function getRandomAffirmation(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/random`, options); 
    if (!response.ok) throw new Error("API error");
    
    const result = await response.json();
    return result.affirmation;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRandomAffirmationByTheme(theme: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/random/${theme}`, options); 
    if (!response.ok) throw new Error("API error");

    const result = await response.json();
    return result.affirmation;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getThemes(): Promise<string[]>{
  try {
    const response = await fetch(`${API_URL}/themes`, options); 
    const result = await response.text();
	  console.log(result);
    return response.json();
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

