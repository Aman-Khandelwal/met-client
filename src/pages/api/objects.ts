import { NextApiRequest, NextApiResponse } from 'next';

function shuffle(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  let data = null;
  try{
    const response = await fetch(url);
    data = await response.json();
  }catch(e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch data' })
  }
  shuffle(data.objectIDs);
  return res.status(200).json(data);
}