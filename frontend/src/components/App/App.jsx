import './App.css';
import { AppProvider } from '../../contexts/AppContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import BoxRenderer from '../BoxRenderer';
import SwitchTheme from '../SwitchTheme';

const queryClient = new QueryClient();

const App = () => {
	return (
		<AppProvider>
			<QueryClientProvider client={queryClient}>
				<SwitchTheme />

				<BoxRenderer />
			</QueryClientProvider>
		</AppProvider>
	);
};

export default App;
