import { Link, NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className="p-5 text-center">
            <Link className="mr-4 p-3 text-base" to={`/`}>Home</Link>
            <NavLink className="mr-4 p-3 text-base" to={`/about`}>About</NavLink>
            <Link className="mr-4 p-3 text-base" to={`/about`}>Likes (0)</Link>
        </header>
    );
}