import { useState } from "react";
import { Container } from "../components/container/Container";
import AutoComplete from "../components/Autocomplete/Autocomplete";
import { ModelDailog } from "../components/ModelPopup/modelpopup";

export const Home = () => {

    //state for selected city
    const [selectCityOption, setselectCityOption] = useState({});
    //state for airports in selected city
    const [nearbyAiport, setnearbyAiport] = useState([]);
    //state for selected airport
    const [selAirport, selSelAirport] = useState({});
    //state for selected airport arrivals
    const [arrivals, setArrivals] = useState([]);
    //state for open/close of dailog
    const [showDailog, setShowDailog] = useState(false);

    const searchAirport = async () => {
        console.log(JSON.stringify(nearbyAiport));
        console.log(JSON.stringify(selectCityOption));
        let airlabsURL = new URL('https://airlabs.co/api/v9/nearby');
        airlabsURL.searchParams.set('lat', selectCityOption.lat);
        airlabsURL.searchParams.set('lng', selectCityOption.lng);
        airlabsURL.searchParams.set('distance', 30);
        airlabsURL.searchParams.set('api_key', 'df50f1d0-6ff7-4d2a-9b63-427e4ddaa583');
        const resp = await fetch(airlabsURL);
        const data = await resp.json();
        setnearbyAiport([...data.response.airports]);
    }

    const isModelClosed = () => {
        setShowDailog(false);
    }

    const updateArrival = async (e) => {
        let opt = JSON.parse(e.target.dataset.airport);
        selSelAirport({...opt});
        await getAirportSchedules(opt.iata_code);
        setShowDailog(true);
    }

    const getAirportSchedules = async (iata_code) => {
        let airlabsURL = new URL('https://airlabs.co/api/v9/schedules');
        airlabsURL.searchParams.set('dep_iata', iata_code);
        airlabsURL.searchParams.set('api_key', 'df50f1d0-6ff7-4d2a-9b63-427e4ddaa583');
        const resp = await fetch(airlabsURL);
        const data = await resp.json();
        setArrivals([...data.response]);
    }

    return (
        <Container>
            <div className="px-5 py-10 rounded-lg bg-slate-200 w-fit m-auto">
                <AutoComplete
                    setselectCityOption={setselectCityOption}
                    searchAirport={searchAirport}>
                </AutoComplete>
            </div>
            <div className="grid gap-3 mt-4 box-border px-6 mx-auto grid-cols-1 sm:grid-cols-3 justify-center content-center">
                {
                    nearbyAiport && nearbyAiport.length > 0 && (
                        nearbyAiport.map((dt, i) => (

                            <div key={i} className="flex flex-col min-w-0 border box-border border-slate-200 p-5 relative ali" style={{ minHeight: '1px' }}>
                                <img className="block mt-0 mb-3 mx-auto align-middle overflow-clip" src="airport-terminal.jpg" alt="aiport"></img>
                                <div className="flex mt-2 items-center">
                                    <h1 className="font-bold text-base sm:text-xl">{dt.name}</h1>
                                    <span className="text-sm ml-2">{selectCityOption.city_code}/{dt.icao_code}</span>
                                </div>
                                <span className="text-sm mt-3">Approx {dt.distance} KM</span>
                                <button data-airport={JSON.stringify(dt)} onClick={updateArrival} className="text-sm mt-3">DETAILS</button>
                            </div>

                        ))
                    )
                }
            </div>
            {
                showDailog && (
                    <ModelDailog isOpen={showDailog} isModelClosed={isModelClosed} arrivals={arrivals} />
                )
            }

        </Container>
    );
};