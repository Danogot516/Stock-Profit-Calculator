import './App.css';
import { AppProvider } from '../../contexts/AppContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}></QueryClientProvider>
		</AppProvider>
	);
}

export default App;
