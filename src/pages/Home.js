import { useState } from "react";
import { Container } from "../components/container/Container";
import AutoComplete from "../components/Autocomplete/Autocomplete";

export const Home = () => {

    //state for selected airport
    const [selectCityOption, setselectCityOption] = useState({});

    const searchAirport = () => {
        console.log(JSON.stringify(selectCityOption));

    }

    return (
        <Container>
            <div className="px-5 py-10 rounded-lg bg-slate-200 w-fit m-auto">
                <AutoComplete
                    setselectCityOption={setselectCityOption}
                    searchAirport={searchAirport}>
                </AutoComplete>
            </div>
            <main>
                <div className="grid grid-flow-col-2 sm:grid-cols-3 mt-5 gap-3">
                    <div className="flex flex-col border border-slate-100">
                        <h1 className="font-bold text-xl">HAL Bangalore Airport</h1>
                        <span className="text-sm">BLR/VOBG</span>
                    </div>
                    <div className="flex flex-col border border-slate-100">
                        <h1 className="font-bold text-xl">Yelahanka Airforce Base</h1>
                        <span className="text-sm">BLR/VOBG</span>
                    </div>
                    <div className="flex flex-col border border-slate-100">
                        <h1 className="font-bold text-xl">Kempegowda International Airport</h1>
                        <span className="text-sm">BLR/VOBG</span>
                    </div>
                </div>
            </main>
        </Container>
    );
};