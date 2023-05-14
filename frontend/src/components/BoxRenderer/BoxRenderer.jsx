import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Form from '../Form';
import Prices from '../Prices';
import Box from '../Box/Box';

const BoxRenderer = () => {
	const { timestamps } = useContext(AppContext);

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
