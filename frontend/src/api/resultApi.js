import apiClient from './apiClient';

export const resultApi = {
  getStudentResults: () => apiClient.get('/results/student'),
  getResultDetail: (attemptId) => apiClient.get(`/results/${attemptId}`),
};
