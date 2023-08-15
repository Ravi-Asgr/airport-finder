import { useState } from "react";
import { Container } from "../components/container/Container";
import AutoComplete from "../components/Autocomplete/Autocomplete";

export const Home = () => {

    //state for selected airport
    const [selectCityOption, setselectCityOption] = useState({});
    const [nearbyAiport, setnearbyAiport] = useState([]);

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
                                <h1 className="font-bold text-base sm:text-xl mt-2">{dt.name}</h1>
                                <span className="font-bold text-sm mt-3">{selectCityOption.city_code}/{dt.icao_code}</span>
                                <span className="text-sm mt-3">DETAILS</span>
                            </div>

                        ))
                    )
                }
            </div>


        </Container>
    );
};