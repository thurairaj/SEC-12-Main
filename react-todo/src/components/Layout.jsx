import Header from "./Header.jsx";
import {NavLink, Outlet} from "react-router-dom";

function Layout( ) {
	return (
		<div className={"app-shell"}>
			<div className={"app-container"}>
				<Header></Header>
				<nav className="top-nav panel">
					<NavLink to={"/"}>Dashboard</NavLink>
					<NavLink to={"/analytics"}>Analytics</NavLink>
				</nav>

				<Outlet></Outlet>
			</div>
		</div>
	)
}

export default Layout;
