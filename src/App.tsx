import AppRouter from './presentation/router';

function App() {

  if (process.env.REACT_APP_ENV === "development") {
    localStorage.clear();
  }

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
