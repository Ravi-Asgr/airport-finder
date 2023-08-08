import { Link,NavLink } from "react-router-dom";

export const Content = () => {
    return (
        <>
            <header className="p-3 text-center">
                <Link className="mr-4 py-1 px-3 text-base" to="/">Home</Link>
                <NavLink className="mr-4 py-1 px-3 text-base" to="/about">About</NavLink>
                <Link className="mr-4 py-1 px-3 text-base" to="/likes">Likes (0)</Link>
            </header>
        </>
    );
};