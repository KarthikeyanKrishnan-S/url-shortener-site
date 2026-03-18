import axios from 'axios';
import { Url, ClickEvent } from '../types';

const API_URL = 'http://localhost:8080/api/urls';

export const shortenUrl = async (originalUrl: string): Promise<Url> => {
    const response = await axios.post(API_URL, { originalUrl });
    return response.data;
};

export const getRecentUrls = async (): Promise<Url[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getUrlAnalytics = async (id: number): Promise<ClickEvent[]> => {
    const response = await axios.get(`${API_URL}/${id}/analytics`);
    return response.data;
};
