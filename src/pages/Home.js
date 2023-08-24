import { useState } from "react";
import { Container } from "../components/container/Container";
import AutoComplete from "../components/Autocomplete/Autocomplete";
import { ModelDailog } from "../components/ModelPopup/modelpopup";
import { ClockLoader } from "react-spinners";

export const Home = () => {

    //state for selected city
    const [selectCityOption, setselectCityOption] = useState({});
    //state for airports in selected city
    const [nearbyAiport, setnearbyAiport] = useState([]);
    //state for selected airport
    const [selAirport, selSelAirport] = useState({});
    //state for selected airport arrivals
    const [schedules, setSchedules] = useState([]);
    //state for open/close of dailog
    const [showDailog, setShowDailog] = useState(false);
    //state for choosen schedule type - Arrival (A) or Departures (D)
    const [scheduleType, setScheduleType] = useState('');
    /*State to toggle spinner in page*/
    const [showSpinner, setShowSpinner] = useState(false);

    const searchAirport = async () => {
        setShowSpinner(true);
        setnearbyAiport([]);
        let airlabsURL = new URL('https://airlabs.co/api/v9/nearby');
        airlabsURL.searchParams.set('lat', selectCityOption.lat);
        airlabsURL.searchParams.set('lng', selectCityOption.lng);
        airlabsURL.searchParams.set('distance', 30);
        airlabsURL.searchParams.set('api_key', 'df50f1d0-6ff7-4d2a-9b63-427e4ddaa583');
        const resp = await fetch(airlabsURL);
        const data = await resp.json();
        setShowSpinner(false);
        setnearbyAiport([...data.response.airports]);
    }

    const isModelClosed = () => {
        setShowDailog(false);
    }

    const showSchedule = async (e) => {
        let opt = JSON.parse(e.target.dataset.airport);
        let sch = e.target.dataset.schedule;
        selSelAirport({...opt});
        setScheduleType(sch);
        await getAirportSchedules(opt.iata_code, sch);
        setShowDailog(true);
    }

    const getAirportSchedules = async (iata_code, sch) => {
        let airlabsURL = new URL('https://airlabs.co/api/v9/schedules');

        if (sch === 'A') {
            airlabsURL.searchParams.set('arr_iata', iata_code);
        } else {
            airlabsURL.searchParams.set('dep_iata', iata_code);
        }
        airlabsURL.searchParams.set('api_key', 'df50f1d0-6ff7-4d2a-9b63-427e4ddaa583');
        const resp = await fetch(airlabsURL);
        const data = await resp.json();
        setSchedules([...data.response]);
    }

    return (
        <Container>
            <div className="px-5 py-10 rounded-lg bg-slate-200 w-fit m-auto">
                <AutoComplete
                    setselectCityOption={setselectCityOption}
                    searchAirport={searchAirport}>
                </AutoComplete>
            </div>
            <div className=" mt-3 justify-center flex">
                <ClockLoader loading={showSpinner} color={"#123abc"} />
            </div>
            <div className="grid gap-3 mt-4 box-border px-6 mx-auto grid-cols-1 sm:grid-cols-3 justify-center content-center">
                {
                    nearbyAiport && nearbyAiport.length > 0 && (
                        nearbyAiport.map((dt, i) => (

                            <div key={i} className=" flex-col min-w-0 border box-border border-slate-200 p-5 relative ali" style={{ minHeight: '1px' }}>
                                <img className="block mt-0 mb-3 mx-auto align-middle overflow-clip" src="airport-terminal.jpg" alt="aiport"></img>
                                <div className="flex mt-2 items-center">
                                    <h1 className="font-bold text-base sm:text-xl">{dt.name}</h1>
                                    <span className="text-sm ml-2">{selectCityOption.city_code}/{dt.icao_code}</span>
                                </div>
                                <span className="text-sm mt-3">Approx {dt.distance} KM</span>
                                <div className="flex items-center justify-center gap-4">
                                    <button data-airport={JSON.stringify(dt)} data-schedule={'A'} onClick={showSchedule} className="bg-slate-500 hover:bg-slate-700 text-white text-sm sm:text-base sm:font-bold py-1 px-2 rounded mt-3">Arrivals</button>
                                    <button data-airport={JSON.stringify(dt)} data-schedule={'D'} onClick={showSchedule} className="bg-slate-500 hover:bg-slate-700 text-white text-sm sm:text-base sm:font-bold py-1 px-2 rounded mt-3">Departures</button>
                                </div>
                            </div>

                        ))
                    )
                }
            </div>
            {
                showDailog && (
                    <ModelDailog isOpen={showDailog} isModelClosed={isModelClosed} schedules={schedules} scheduleType={scheduleType} />
                )
            }
            
        </Container>
    );
};