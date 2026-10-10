import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './app/AppContext';
import { AppRouter } from './app/router';

export default function App(): JSX.Element {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProvider>
  );
}
