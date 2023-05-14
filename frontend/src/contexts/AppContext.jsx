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

	const resetData = () => {
		setTimestamps(null);
		setFunds(null);
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
