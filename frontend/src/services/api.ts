// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // Adjust this based on your API URL
});

export const fetchTopDataCollectors = async () => {
  const response = await api.get('/top-data-collectors');
  return response.data.top_collectors;
};

export const fetchTopPointEarners = async () => {
  const response = await api.get('/top-point-earners');
  return response.data.top_point_earners;
};

export const fetchRecentActivities = async () => {
  const response = await api.get('/recent-activities');
  return response.data.recent_activities;
};

export const fetchTotalDataCollected = async () => {
    const response = await api.get('/total-data-collected');
    return response.data.total_data_collected;
  };


 

 export const fetchTopDataCategories = async () => {
    const response = await axios.get('/api/top-data-categories');
    return response.data;
 };
  