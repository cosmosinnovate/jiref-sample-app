import React from 'react';
import spinner from './spinners.gif';

export default () => {
  return (            
    <div>
    <img
      src={spinner}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </div>
    );
};
