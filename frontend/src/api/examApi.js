import apiClient from './apiClient';

export const examApi = {
  getAvailableExams: () => apiClient.get('/exams/available'),
  startExam: (examId) => apiClient.get(`/exams/${examId}/start`),
  submitExam: (examId, answers) => apiClient.post(`/exams/${examId}/submit`, { answers }),
  getExam: (examId) => apiClient.get(`/exams/${examId}`),
};
