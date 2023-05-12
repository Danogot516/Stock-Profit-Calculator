import './App.css';
import { AppProvider } from '../../contexts/AppContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import BoxStocks from '../BoxStocks';
import BoxPrices from '../BoxPrices';

const queryClient = new QueryClient();

const App = () => {
	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<BoxStocks />

				<BoxPrices />
			</QueryClientProvider>
		</AppProvider>
	);
};

export default App;
