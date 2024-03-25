import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let {
    query: { searchTerm },
  } = req;

  searchTerm = searchTerm?.toString().toLowerCase().replace(/ /g, '+');
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`;

  let data = null;
  try{
    const response = await fetch(url);

    data = await response.json();
  }catch(e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch data' })
  }

  return res.status(200).json(data);
}