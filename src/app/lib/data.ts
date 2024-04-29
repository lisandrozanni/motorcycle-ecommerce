import axios from 'axios';
import formatNumber from './utils';
import { AccessoryDetail, ApiPayload, ApiResponse, MotorcycleDetail } from './definitions';

const apiToken = process.env.API_TOKEN;
const exchangeApiToken = process.env.EXCHANGE_API_TOKEN;

const API_URL = 'https://nathan.tasa.develop.simplitec.io/webhook/simplimuv';
const API_URL_POST = 'https://nathan.tasa.develop.simplitec.io/webhook/simplimuv/createlead';
const EXCHANGE_API_URL = `https://v6.exchangerate-api.com/v6/${exchangeApiToken}/latest/USD`;

export async function getMotorcycles() {
  try {
    const response = await axios.get(`${API_URL}/products/motorcycles`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export async function getMotorcycleDetail(uuid: string): Promise<MotorcycleDetail | null> {
  try {
    const response = await axios.get(`${API_URL}/products/motorcycles?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = response.data[0];

    if (!data || !data.variants) {
      return null;
    }

    const images: string[] = [];
    data.variants.forEach(({ images: imagesUrls }: { images: { url: string }[] }) => {
      imagesUrls.forEach(({ url }: { url: string }) => {
        images.push(url);
      });
    });

    const description = data.variants[0]?.details?.features[0]?.value || '';
    const price = data.variants[0]?.prices[0]?.amount || '';

    return {
      name: data.name,
      images,
      description,
      price,
    };
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export async function getAccessories() {
  try {
    const response = await axios.get(`${API_URL}/products/accessories`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export async function getAccessoryDetail(uuid: string): Promise<AccessoryDetail | null> {
  try {
    const response = await axios.get(`${API_URL}/products/accessories?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = response.data[0];

    if (!data) {
      return null;
    }

    const image = data.variants[0]?.images[0]?.url || '';
    const description = data.variants[0]?.details?.features[0]?.value || '';
    const price = data.variants[0]?.prices[0]?.amount || '';

    return {
      name: data.name,
      image,
      description,
      price,
    };
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export async function convertCurrency(amount: number, rate: string) {
  try {
    const response = await axios.get(EXCHANGE_API_URL);
    const rates = response.data.conversion_rates;
    const convertedRate = rates[rate];

    if (convertedRate) {
      return formatNumber(amount * convertedRate);
    } else {
      console.error('No se pudo obtener el tipo de cambio.');

      return null;
    }
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export async function createLead(payload: ApiPayload): Promise<ApiResponse | null> {
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post<ApiResponse>(API_URL_POST, payload, { headers });

    return response.data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}
