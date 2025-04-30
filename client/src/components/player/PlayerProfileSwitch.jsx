import React from 'react';

const PlayerProfileSwitch = ({ profile1, profile2 }) => {
  return (
    <div>
      <h4>Profile 1</h4>
      <pre>{JSON.stringify(profile1, null, 2)}</pre>
      <h4>Profile 2</h4>
      <pre>{JSON.stringify(profile2, null, 2)}</pre>
    </div>
  );
};

export default PlayerProfileSwitch;
