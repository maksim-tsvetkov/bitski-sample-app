import { Bitski } from 'bitski';
import React, { useEffect } from 'react';

const Callback: React.FC = () => {
  useEffect(() => {
    Bitski.callback();
  }, []);

  return <>Callback</>;
};

export default Callback;
