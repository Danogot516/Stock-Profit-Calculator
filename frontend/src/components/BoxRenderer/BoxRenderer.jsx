import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Form from '../Form';
import Prices from '../Prices';
import Box from '../Box/Box';
import { useEffect } from 'react';

const BoxRenderer = () => {
	const { timestamps, isDarkTheme } = useContext(AppContext);

	useEffect(() => {
		if (isDarkTheme) {
			document.body.classList.add('theme-dark');
		} else {
			document.body.classList.remove('theme-dark');
		}
	}, [isDarkTheme]);

	return !timestamps ? (
		<Box>
			<Form />
		</Box>
	) : (
		<Box>
			<Prices />
		</Box>
	);
};

export default BoxRenderer;
