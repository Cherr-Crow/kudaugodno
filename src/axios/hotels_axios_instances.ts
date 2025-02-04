'use client';

import axios from 'axios';

import { Hotel } from '@/types/hotel';

const hotel = axios.create({
  baseURL:
    process.env.KUDA_UGODNO__FRONTEND__MAIN_APP__FULL_DOMAIN__DEV + '/hotels/',
});

// TODO: Подумать над тем, что бы вынести механизм работы с токенами и интерцептерами в отдельную переиспользуемую функцию

// TODO: урлы поменять после реализации механизма с токенами на бэкенд + refreshToken нужно запихвать в куки

// Функция для обновления токена
const refreshToken = async () => {
  try {
    const response: Axios.AxiosXHR<{ accessToken: string }> = await axios.post(
      'https://api.example.com/auth/refresh',
      {
        refreshToken: localStorage.getItem('refreshToken'),
      },
    );
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken); // Сохраняем новый access token
    return accessToken;
  } catch (error) {
    console.error('Не удалось обновить токен:', error);
    // Перенаправляем на страницу логина или обрабатываем ошибку
    window.location.href = '/login';
    return null;
  }
};

// Перехватчик для добавления access token в заголовки запросов
// hotel.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// Перехватчик для обработки ошибок и обновления токена
hotel.interceptors.response.use(
  (response: any) => response,
  async (error: { config: any; response: { status: number; }; }) => {
    const originalRequest = error.config;

    // Если ошибка 401 (Unauthorized) и это не запрос на обновление токена
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос как повторный

      const newAccessToken = await refreshToken(); // Пытаемся обновить токен
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Обновляем заголовок
        return hotel(originalRequest); // Повторяем оригинальный запрос с новым токеном
      }
    }

    return Promise.reject(error);
  },
);

// Пример использования
// const fetchData = async () => {
//   try {
//     const response = await hotel.get('/data');
//     console.log(response.data);
//   } catch (error) {
//     console.error('Ошибка при запросе данных:', error);
//   }
// };

// работа с ручками hotels
// export async function getHotel(): Promise<Hotel[]> {
//   return await hotel.request({}).then((response) => response.data);
// }

export async function CreatHotel(payload: Hotel): Promise<Hotel> {
  return (await hotel.post('', payload).then((response: { data: any; }) => response.data)) as Hotel;
}
