import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({
	timestamps: null,
	setTimestamps: newTimestamps => {},
	funds: null,
	isDarkTheme: '',
	setIsDarkTheme: isDarkTheme => {},
});

const AppProvider = ({ children }) => {
	const [timestamps, setTimestamps] = useState(null);
	const [funds, setFunds] = useState(null);
	const [isDarkTheme, setIsDarkTheme] = useState(
		window.matchMedia('(prefers-color-scheme:dark)').matches
	);

	return (
		<AppContext.Provider
			value={{
				timestamps,
				isDarkTheme,
				funds,
				setTimestamps,
				setFunds,
				setIsDarkTheme,
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
