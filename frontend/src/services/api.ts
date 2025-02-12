import axios from 'axios';

// Use the environment variable, or fallback to a default URL if not set
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Fallback if the environment variable isn't set
});


export const getUsers = async () => {
  const response = await api.get('users/get-users');
  console.log("this is the data form get_users api", response.data);
  return response.data;
};

// Fetch function examples
export const fetchTopDataCollectors = async () => {
  const response = await api.get('dashboard/top-data-collectors');
  return response.data.top_collectors;
};

export const fetchTopPointEarners = async () => {
  const response = await api.get('dashboard/top-point-earners');
  return response.data.top_point_earners;
};

export const fetchRecentActivities = async () => {
  const response = await api.get('dashboard/recent-activities');
  return response.data.recent_activities;
};

export const fetchTotalDataCollected = async () => {
  const response = await api.get('dashboard/total-data-collected');
  return response.data.total_data_collected;
};

export const fetchTopDataCategories = async () => {
  const response = await api.get('dashboard/top-data-categories');
  return response.data;
};
