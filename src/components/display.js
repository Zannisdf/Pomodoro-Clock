import React from 'react';

export const Display = ({ timeLeft, timerType }) => {
  const minutesLeft = ('0' + Math.floor(timeLeft / 60)).slice(-2);
  const secondsLeft = ('0' + timeLeft % 60).slice(-2);
  return (
    <div id='timer-label'>
      <h1>{timerType}</h1>
      <h1 id='time-left'>{minutesLeft}:{secondsLeft}</h1>
    </div>
  )
}
