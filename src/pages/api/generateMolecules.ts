// pages/api/generateMolecules.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const API_KEY = process.env.NVIDIA_API_KEY; // Store API Key in environment variable for safety
  const invokeUrl = 'https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate';

  try {
    const response = await fetch(invokeUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error from API' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
