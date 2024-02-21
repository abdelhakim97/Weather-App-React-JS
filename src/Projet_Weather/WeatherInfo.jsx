// WeatherIcon.js
import React from 'react';
import _01d from './img/01d.png'
import _01n from './img/01n.png'
import _02d from './img/02d.png'
import _02n from './img/02n.png'
import _03d from './img/03d.png'
import _04d from './img/04d.png'
import _09d from './img/09d.png'
import _10d from './img/10d.png'
import _10n from './img/10n.png'
import _11d from './img/11d.png'
import _13d from './img/13d.png'
import _50d from './img/50d.png'
export default function getWeatherIcon(iconCode) {
  // Map the weather icon code to the corresponding image path
  const iconMapping = {
    '01d': _01d,
    '01n': _01n,
    '02d': _02d,
    '02n': _02n,
    '03d': _03d,
    '03n': _03d,
    '04d': _04d,
    '04n': _04d,
    '09d': _09d,
    '09n': _09d,
    '10d': _10d,
    '10n': _10n,
    '11d': _11d,
    '11n': _11d,
    '13d': _13d,
    '13n': _13d,
    '50d': _50d,
    '50n': _50d
  };

  return iconMapping[iconCode]; // Use a default icon if not found
}
