import './Layout.css'
import Header from "./Header.jsx";
import {NavLink, Outlet} from "react-router-dom";

function Layout( ) {
	return (
		<div className={"app-shell"}>
			<div className={"app-container"}>
				<Header></Header>
				<nav className="top-nav panel">
					<NavLink to={"/"}
					         className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}
					         end>Dashboard</NavLink>
					<NavLink to={"/analytics"}
					         className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}
					>Analytics</NavLink>
				</nav>

				<Outlet></Outlet>
			</div>
		</div>
	)
}

export default Layout;
