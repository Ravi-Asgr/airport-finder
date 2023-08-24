import { useState } from "react";
import { Container } from "../components/container/Container";
import { FlightBox } from "../components/FlightBox/flightbox";
import { ClockLoader } from "react-spinners";

export const Flights = () => {

    /*State to save origin airport name*/
    const [originAP, setOriginAP] = useState("");
    /*State to save origin airport object*/
    const [originAPObj, setOriginAPObj] = useState({});
    /*State to save destination airport name*/
    const [destinationAP, setDestinationAP] = useState("");
    /*State to save destination airport object*/
    const [destinationAPObj, setDestinationAPObj] = useState({});
    /*State to save origin airport suggesations*/
    const [originSuggestions, setOriginSuggestions] = useState([]);
    /*State to save destination airport suggesations*/
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    /*State to toggle Suggesations visibility*/
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    /*State to toggle spinner visibility
      0 - do not show, 1 - show in origin airport TB, 2 - show in destination airport TB
    */
    const [isApiCalled, setApiCalled] = useState(0);
    /*State to show Suggesations for Origin or Destination Input*/
    const [showSuggesation, setShowSuggesation] = useState('0');
    /*State to show flights between origin-destination airports*/
    const [flights, setFlights] = useState([]);
    /*State to toggle spinner in page*/
    const [showSpinner, setShowSpinner] = useState(false);

    const updateFromAP = async (e) => {
        const airportName = e.target.value.toLowerCase();
        setOriginAP(airportName);
        if (airportName.length > 2 && airportName.length % 3 === 0) {
            setApiCalled(1);
            const resp = await fetch('https://slim-data-harverster.onrender.com/airlabs/getairport?name=' + airportName);
            const data = await resp.json();
            setOriginSuggestions([...data])
            setSuggestionsActive(true);
            setShowSuggesation('1');
        } else {
            setSuggestionsActive(false);
        }
        setApiCalled(0);
    }

    const updateToAP = async (e) => {
        const airportName = e.target.value.toLowerCase();
        setDestinationAP(airportName);
        if (airportName.length > 2 && airportName.length % 3 === 0) {
            setApiCalled(2);
            const resp = await fetch('https://slim-data-harverster.onrender.com/airlabs/getairport?name=' + airportName);
            const data = await resp.json();
            setDestinationSuggestions([...data]);
            setSuggestionsActive(true);
            setShowSuggesation('2');
        } else {
            setSuggestionsActive(false);
        }
        setApiCalled(0);
    }

    const updateSelectedAP = async (e) => {
        let typeChoice = e.target.dataset.aptype;
        let opt = JSON.parse(e.target.dataset.airport);
        if (typeChoice === 'origin') {
            setOriginAP(e.target.innerText);
            setOriginAPObj({ ...opt })
        } else {
            setDestinationAP(e.target.innerText);
            setDestinationAPObj({ ...opt })
        }
        setSuggestionsActive(false);
        setShowSuggesation('0');
    }

    const searchFlights = async () => {
        setShowSpinner(true);
        setFlights([]);
        let airlabsURL = new URL('https://airlabs.co/api/v9/routes');
        airlabsURL.searchParams.set('dep_iata', originAPObj.iata);
        airlabsURL.searchParams.set('arr_iata', destinationAPObj.iata);
        airlabsURL.searchParams.set('api_key', 'df50f1d0-6ff7-4d2a-9b63-427e4ddaa583');
        const resp = await fetch(airlabsURL);
        const data = await resp.json();
        const formatFlights = await formatFlightData(data);
        setFlights([...formatFlights]);
        setShowSpinner(false);
    }

    const formatFlightData = async(data) => {
        let dataResp = data.response;
        let formatResp = [];
        dataResp.map(ent => {
            let fltData = {};
            fltData.schedule = ent.dep_time + '-' + ent.arr_time;
            fltData.iata = ent.dep_iata + '->' + ent.arr_iata;
            fltData.flightNo = ent.flight_iata;
            let {hrs, min} = toHoursMinutes(ent.duration);
            fltData.duration = hrs+'h '+min+'m';
            fltData.arrTerminal = ent.arr_terminals ? 'Arr.Ter ' + ent.arr_terminals.toString() : '';
            fltData.depTerminal = ent.dep_terminals ? 'Dep.Ter ' + ent.dep_terminals.toString() : '';
            fltData.days = ent.days;
            formatResp.push(fltData);
        } );
        return formatResp;
    }

    function toHoursMinutes(minutes) {
        let hrs = Math.floor(minutes/60);
        let min = minutes%60;
        return {hrs, min};
    }

    const Suggestions = ({ apSuggesations, apType }) => {
        return (
            
            <ul className="z-10 absolute px-2 text-sm sm:text-base bg-white sm:">
                {apSuggesations.map((suggestion, index) => {
                    return (
                        <li className="cursor-pointer"
                            //className={index === suggestionIndex ? "active" : ""}
                            key={index}
                            onClick={updateSelectedAP}
                            data-aptype={apType}
                            data-airport={JSON.stringify(suggestion)}>
                            {suggestion.display}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr] p-3 gap-4 w-full m-auto">
                <div>
                    <input className={`pl-3 sm:mx-2 rounded-md md:rounded-lg border md:border-2 border-gray-300 outline-0 sm:h-11 w-full sm:w-60
                        ${isApiCalled === 1 ? 'bg-[url("load.gif")] bg-no-repeat bg-contain bg-right' : ''}`}
                        type="text" placeholder={"Flying from airport/city"} value={originAP} onChange={updateFromAP}>
                    </input>
                    {
                        suggestionsActive && showSuggesation === '1'
                        && <Suggestions apSuggesations={originSuggestions} apType={'origin'} />
                    }
                </div>
                <div>
                    <input className={`pl-3 sm:mx-2 rounded-md md:rounded-lg border md:border-2 border-gray-300 outline-0 sm:h-11 w-full sm:w-60
                        ${isApiCalled === 2 ? 'bg-[url("load.gif")] bg-no-repeat bg-contain bg-right' : ''}`}
                        type="text" placeholder={"Flying to airport/city"} value={destinationAP} onChange={updateToAP}>
                    </input>
                    {
                        suggestionsActive && showSuggesation === '2'
                        && <Suggestions apSuggesations={destinationSuggestions} apType={'dest'} />
                    }
                </div>
                <button className="bg-slate-500 hover:bg-slate-700 text-white text-sm sm:text-base sm:font-bold py-1 px-2 rounded"
                    onClick={searchFlights}>
                    Search
                </button>
            </div>
        
            <div className="grid grid-cols-1 justify-items-center gap-4 mt-2 text-sm sm:text-base">
                <ClockLoader loading={showSpinner} color={"#123abc"} />
                <FlightBox flightData={flights} />
            </div>

        </Container >
    );
};