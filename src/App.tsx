import React from 'react';
import AppRouter from './presentation/router';

function App() {

  if (process.env.NODE_ENV === "development") {
    localStorage.clear();
  }

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
