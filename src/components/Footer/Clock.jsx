import React, { useCallback, useEffect, useState } from 'react';

const Clock = ({ timezone = 'Europe/Kyiv' }) => {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const getKievDate = useCallback(() => {
    const now = new Date();
    const kievTime = new Date(
      now.toLocaleString('en-US', { timeZone: timezone })
    );
    setTime({
      h: kievTime.getHours().toString().padStart(2, '0'),
      m: kievTime.getMinutes().toString().padStart(2, '0'),
      s: kievTime.getSeconds().toString().padStart(2, '0'),
    });
  }, [timezone]);

  useEffect(() => {
    const interval = setInterval(getKievDate, 1000);
    return () => clearInterval(interval);
  }, [getKievDate]);

  return (
    <div>
      <span data-animation>{time?.h?.[0]}</span>
      <span data-animation>{time?.h?.[1]}</span>
      <span data-animation>:</span>
      <span data-animation>{time?.m?.[0]}</span>
      <span data-animation>{time?.m?.[1]}</span>
      <span data-animation>:</span>
      <span data-animation>{time?.s?.[0]}</span>
      <span data-animation>{time?.s?.[1]}</span>
    </div>
  );
};

export default Clock;
