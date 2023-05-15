import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({
	timestamps: null,
	setTimestamps: () => {},
	funds: null,
	isDarkTheme: '',
	toggleIsDarkTheme: () => {},
});

const AppProvider = ({ children }) => {
	const [timestamps, setTimestamps] = useState(null);
	const [funds, setFunds] = useState(null);
	const [isDarkTheme, setIsDarkTheme] = useState(
		window.matchMedia('(prefers-color-scheme:dark)').matches
	);

	const resetData = () => {
		setTimestamps(null);
		setFunds(null);
	};

	const toggleIsDarkTheme = () => {
		setIsDarkTheme(prev => !prev);
	};

	return (
		<AppContext.Provider
			value={{
				timestamps,
				isDarkTheme,
				funds,
				setTimestamps,
				setFunds,
				resetData,
				toggleIsDarkTheme,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
