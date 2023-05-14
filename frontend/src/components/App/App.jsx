import './App.css';
import { AppProvider } from '../../contexts/AppContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import BoxRenderer from '../BoxRenderer';

const queryClient = new QueryClient();

const App = () => {
	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				{/* <h1>Stock Profit Calculator</h1> */}

				<BoxRenderer />
			</QueryClientProvider>
		</AppProvider>
	);
};

export default App;
