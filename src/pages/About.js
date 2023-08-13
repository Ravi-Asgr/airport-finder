import { Link } from "react-router-dom";
import { Container } from "../components/container/Container";

export const About = () => {
    return (
        <Container>
            <div className="grid grid-cols-1 p-10 justify-items-center">
                <h1 className="text-sm sm:text-base font-bold">React applicaton for Airport Search</h1>
                <a href="https://github.com/Ravi-Asgr/airport-finder" className="bg-black px-2 md:px-3 py-2 md:py-3 mt-5 text-lg text-white text-center w-fit">
                    <img className="w-5 inline mr-2" src="github-mark-white.svg" alt="Your SVG" />
                    <span>Visit Repo</span>
                </a>
                <h1 className="text-xs mt-20">2023 © All rights reserved</h1>
            </div>
        </Container>
    );
};