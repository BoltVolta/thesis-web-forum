import { useState, useCallback, useEffect, Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from './shared/context/auth-context';
import Threads from './threads/pages/Threads';
import Authenticate from './users/pages/Authenticate';
import NavComponent from './shared/components/navigation/NavComponent';
import Topics from './topics/pages/Topics';
import './App.css';
import SearchTopics from './topics/components/SearchTopics';

const queryClient = new QueryClient();

let logoutTimer;

function App() {
	const [token, setToken] = useState(false);
	const [userId, setuser] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setuser(uid);
		//current date + 1h
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token,
				expiration: tokenExpirationDate.toISOString()
			})
		)
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setuser(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token &&
			new Date(storedData.expiration) > new Date() //if greater, the expiration is in the future
		) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	let routes;

	if (token) {
		routes = (
			<Routes>
				<Route path="/" element={<Topics />} />
				<Route path="/:id/:name" element={<Threads />} />
				<Route path="/search/:name" element={<SearchTopics />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/" element={<Topics />} />
				<Route path="/:id/:name" element={<Threads />} />
				<Route path="/search/:name" element={<SearchTopics />} />
				<Route path="/auth" element={<Authenticate />} />
			</Routes>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout
			}}
		>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<NavComponent />
					<main>
						{routes}
					</main>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthContext.Provider>
	);
}


export default App;
