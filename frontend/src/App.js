import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from './shared/context/auth-context';
import Threads from './threads/pages/Threads';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';
import './App.css';

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
			<Switch>
				<Route path="/topics" exact>
					<Topics />
				</Route>
				<Route path="/topics/:id" exact>
					<Threads />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Redirect to="/topics" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/topics" exact>
					<Topics />
				</Route>
				<Route path="/topics/:id" exact>
					<Threads />
				</Route>
				<Route path="/auth">
					<Authenticate />
				</Route>
				<Redirect to="/topics" />
			</Switch>
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
				<Router>
					<MainNavigation />
					<main>
						{routes}
					</main>
				</Router>
			</QueryClientProvider>
		</AuthContext.Provider>
	);
}


export default App;
