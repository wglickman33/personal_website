import { useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import './AFKClock.scss';

const TIMEZONES = [
  { label: 'Eastern (EST/EDT)', value: 'America/New_York' },
  { label: 'Central (CST/CDT)', value: 'America/Chicago' },
  { label: 'Mountain (MST/MDT)', value: 'America/Denver' },
  { label: 'Pacific (PST/PDT)', value: 'America/Los_Angeles' },
  { label: 'Alaska (AKST/AKDT)', value: 'America/Anchorage' },
  { label: 'Hawaii (HST)', value: 'Pacific/Honolulu' },
];

interface AFKClockProps {
  isPreview?: boolean;
}

const AFKClock = ({ isPreview = false }: AFKClockProps) => {
  const { theme } = useTheme();
  const [time, setTime] = useState({
    hours: '12',
    minutes: '00',
    seconds: '00',
    meridiem: 'AM',
  });

  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [primaryColor, setPrimaryColor] = useState('#80f6ff');
  const [secondaryColor, setSecondaryColor] = useState('#fffb2c');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: selectedTimezone };
      const currentDate = new Date().toLocaleString('en-US', options);
      const date = new Date(currentDate);

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let meridiem = hours < 12 ? 'AM' : 'PM';

      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      const hoursStr = hours < 10 ? '0' + hours : String(hours);
      const minutesStr = minutes < 10 ? '0' + minutes : String(minutes);
      const secondsStr = seconds < 10 ? '0' + seconds : String(seconds);

      setTime({ hours: hoursStr, minutes: minutesStr, seconds: secondsStr, meridiem });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [selectedTimezone]);

  return (
    <div className={`afk-clock afk-clock--${theme} ${isPreview ? 'afk-clock--preview' : ''}`}>
      <div
        className="afk-clock__wrapper"
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
        } as React.CSSProperties}
      >
        <div className="afk-clock__display">
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--hours">{time.hours}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--minutes">{time.minutes}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--seconds">{time.seconds}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--meridiem">{time.meridiem}</span>
          </div>
        </div>

        {!isPreview && (
          <div className="afk-clock__controls">
            <div className="afk-clock__timezone-selector">
              <label htmlFor="afk-clock-timezone">Timezone:</label>
              <select
                id="afk-clock-timezone"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="afk-clock__color-pickers">
              <div className="afk-clock__color-picker">
                <label htmlFor="afk-clock-primary-color">Primary Color:</label>
                <input
                  type="color"
                  id="afk-clock-primary-color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
              <div className="afk-clock__color-picker">
                <label htmlFor="afk-clock-secondary-color">Secondary Color:</label>
                <input
                  type="color"
                  id="afk-clock-secondary-color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AFKClock;

