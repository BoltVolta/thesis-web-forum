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
import Reports from './reports/pages/Reports';
import ReportedPosts from './reports/pages/ReportedPosts';

const queryClient = new QueryClient();

let logoutTimer;

function App() {
	const [token, setToken] = useState(false);
	const [userId, setuser] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

	const login = useCallback((uid, token, admin, expirationDate) => {
		setToken(token);
		setuser(uid);
		setAdmin(admin);
		//current date + 1h
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token,
				admin: admin,
				expiration: tokenExpirationDate.toISOString()
			})
		)
	}, []);
	const logout = useCallback(() => {
		setToken(null);
		setuser(null);
		setAdmin(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token &&
			new Date(storedData.expiration) > new Date() //if greater, the expiration is in the future
		) {
			login(storedData.userId, storedData.token, storedData.admin, new Date(storedData.expiration));
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
	/*
				<Route path="/admin" element={<Reports />} />
				<Route path="/admin/:id/" element={<ReportedPosts />} />
	*/

	if (token && admin === 1) {
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
