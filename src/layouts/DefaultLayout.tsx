import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div>
      Test
      <Outlet />
    </div>
  );
};

export { DefaultLayout };
