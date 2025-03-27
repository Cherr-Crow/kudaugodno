'use client';
import React from 'react';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

interface YandexMapProps {
  coordinates: [number, number]; // Широта и долгота
  zoom?: number; // Опциональный параметр для зума
}

export const YandexMap: React.FC<YandexMapProps> = ({ coordinates, zoom = 12 }) => {
  return (
    <YMaps>
      <Map
        defaultState={{
          center: coordinates,
          zoom: zoom,
          behaviors: ['default'],
          controls: [],
        }}
        width='100%'
        height='100%'
        options={{
          // Отключаем зум при наведении курсора
          suppressMapOpenBlock: true, // Отключаем блокировку карты
          suppressObsoleteBrowserNotifier: true, // Отключаем уведомления об устаревшем браузере
          yandexMapDisablePoiInteractivity: true, // Отключаем интерактивность POI (точек интереса)
        }}
        //   modules={['control.ZoomControl']} // Подключаем модуль управления зумом
      >
        <Placemark geometry={coordinates} />
      </Map>
    </YMaps>
  );
};
