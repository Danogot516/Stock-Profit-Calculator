import './App.css';
import { AppProvider } from '../../contexts/AppContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import BoxRenderer from '../BoxRenderer';

const queryClient = new QueryClient();

const App = () => {
	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<BoxRenderer />
			</QueryClientProvider>
		</AppProvider>
	);
};

export default App;
