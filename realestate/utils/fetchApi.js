import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '588fcb8793msh1151c7af41bb5c9p1c37b4jsn63eb194c4639' ,
    },
  });
    
  return data;
}