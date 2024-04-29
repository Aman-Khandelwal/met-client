import { NextApiRequest, NextApiResponse } from 'next';

let objectIDs: string | any[] = [];
let total = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  console.log('here')
  let data = null;
  if(objectIDs.length === 0) {
    console.log('here1')
    try{
      const response = await fetch(url);
      data = await response.json();
    }catch(e) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to fetch data' })
    }
    objectIDs = data.objectIDs;
    total = data.total;
  }
  else {
    console.log('here2')
    data = {
      objectIDs: objectIDs,
      total: total
    }
  }
  return res.status(200).json(data);
}