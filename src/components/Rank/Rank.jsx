import React, { useEffect, useState } from 'react';

const Rank = ({ user }) => {
  const [entries, setEntries] = useState(user.entries);

  useEffect(() => {
    setEntries(user.entries);
  }, [user.entries]);

  console.log(user.entries)


  return (
    <div>
      <div className='white f3'>
        {`${user.name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
};

export default Rank;
