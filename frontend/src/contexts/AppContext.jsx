import { createContext, useState } from 'react';

const AppContext = createContext({
	timestamps: { start: 0, end: 0 },
	setTimestamps: newTimestamps => {},
	isDarkTheme: '',
	setIsDarkTheme: isDarkTheme => {},
});

const AppProvider = ({ children }) => {
	const [timestamps, setTimestamps] = useState({});
	const [isDarkTheme, setIsDarkTheme] = useState(
		window.matchMedia('(prefers-color-scheme:dark)').matches
	);

	return (
		<AppContext.Provider
			value={{ timestamps, isDarkTheme, setTimestamps, setIsDarkTheme }}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
