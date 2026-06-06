import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Weather from './Components/Weather'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}

export default App
