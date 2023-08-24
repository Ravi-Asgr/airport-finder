import { useState } from "react";

const AutoComplete = ({ setselectCityOption, searchAirport }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState("");
    //toggle spinner visibility
    const [isApiCalled, setApiCalled] = useState(false);

    const handleChange = async (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        if (query.length > 2 && query.length % 3 === 0) {
            setApiCalled(true);
            const resp = await fetch('https://slim-data-harverster.onrender.com/airlabs/getcity?name=' + query);
            const data = await resp.json();
            const filterSuggestions = data.map(
                (suggestion) => suggestion
                    //suggestion.city_country
            );
            setSuggestions(filterSuggestions);
            setSuggestionsActive(true);
        } else {
            setSuggestionsActive(false);
        }
        setApiCalled(false);
    };

    const handleClick = (e) => {
        setSuggestions([]);
        //e.target.dataset.selectcity;
        setValue(e.target.innerText);
        setSuggestionsActive(false);
        let opt = JSON.parse(e.target.dataset.selectcity);
        setselectCityOption({...opt});
    };

    const handleKeyDown = (e) => {
        // UP ARROW
        if (e.keyCode === 38) {
            if (suggestionIndex === 0) {
                return;
            }
            setSuggestionIndex(suggestionIndex - 1);
        }
        // DOWN ARROW
        else if (e.keyCode === 40) {
            if (suggestionIndex - 1 === suggestions.length) {
                return;
            }
            setSuggestionIndex(suggestionIndex + 1);
        }
        // ENTER
        else if (e.keyCode === 13) {
            setValue(suggestions[suggestionIndex]);
            setSuggestionIndex(0);
            setSuggestionsActive(false);
        }
    };

    const Suggestions = () => {
        return (
            <ul className="z-10 absolute text-sm p-2 sm:text-base bg-white">
                {suggestions.map((suggestion, index) => {
                    return (
                        <li className="cursor-pointer"
                            //className={index === suggestionIndex ? "active" : ""}
                            key={index}
                            onClick={handleClick}
                            data-lat={suggestion.lat}
                            data-lng={suggestion.lng}
                            data-selectcity={JSON.stringify(suggestion)}
                        >
                            {suggestion.city_country}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
        <div className="">
            <input className={`pl-5 rounded-md md:rounded-lg border md:border-2 border-gray-300 outline-0 sm:h-11 sm:w-96 
             ${isApiCalled ? 'bg-[url("load.gif")] bg-no-repeat bg-contain bg-right' : '' }`} 
             //style={{backgroundImage: "url("+"load.gif"+")", backgroundRepeat:'no-repeat', backgroundSize:'contain', 
             //backgroundPosition:"right"}}
                type="text" placeholder={"Start typing city"}
                value={value} onChange={handleChange} onKeyDown={handleKeyDown}>
            </input>
            <a className="bg-black ml-3 sm:ml-5 px-1 sm:p-2 text-lg text-white text-center cursor-pointer w-fit"
                onClick={searchAirport}>
                Search
            </a>
        </div>
        {suggestionsActive && <Suggestions />}
        </>
    );

};

export default AutoComplete;