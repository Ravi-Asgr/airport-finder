import { useRef, useEffect, useState } from "react";

export const ModelDailog = ({ isOpen, isModelClosed, schedules, scheduleType }) => {

    const modelRef = useRef(null);
    const [isModelOpen, setModelIsOpen] = useState(isOpen);

    const closeModel = () => {
        setModelIsOpen(false);
        isModelClosed();
    }

    useEffect(() => {
        setModelIsOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modelElement = modelRef.current;
        if (modelElement && isModelOpen) {
            modelElement.showModal();
        } else if (modelElement && !isModelOpen) {
            modelElement.close();
            setModelIsOpen(false);
        }
    }, [isModelOpen]);

    return (
        <dialog ref={modelRef}>
            <div className="grid grid-cols-[2.5fr_0.5fr] items-center justify-items-center gap-2 py-2 border-b-2">
                <div className="flex gap-3 justify-center items-center">
                    <h1 className="font-bold text-lg">{scheduleType === 'A' ? 'Arrivals' : 'Departures'}</h1>
                    <img className="w-5 h-5" alt='schedule' src={scheduleType === 'A' ? 'arrivals.png' : 'departure.png'} />
                </div>
                <button className="font-bold text-lg ml-12 border px-2 border-slate-500" onClick={closeModel}>X</button>
            </div>
            <div className="max-w-2xl mx-auto">

                <div className="flex flex-col">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            {/* <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-all" className="sr-only">checkbox</label>
                                                </div>
                                            </th> */}
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Flight
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                {scheduleType === 'A' ? 'Arr Date & Time' : 'Dep Date & Time'}
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                {scheduleType === 'A' ? 'Origin' : 'Destination'}
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Delay (min)
                                            </th>
                                            {/* <th scope="col" class="p-4">
                                                <span class="sr-only">Edit</span>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {
                                            schedules && schedules.length > 0 && (
                                                schedules.map((dt, i) => (
                                                    <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        {/* <td className="p-4 w-4">
                                                            <div className="flex items-center">
                                                                <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label for="checkbox-table-1" className="sr-only">checkbox</label>
                                                            </div>
                                                        </td> */}
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.flight_icao}</td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{scheduleType === 'A' ? delayFormat(dt.arr_time,dt.arr_actual) : delayFormat(dt.dep_time,dt.dep_actual)}</td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.arr_iata}</td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{dt.status === 'active' ? 'en-route' : dt.status}</td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.delayed === null ? '-' : dt.delayed}</td>
                                                        {/* <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                            <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                        </td> */}
                                                    </tr>
                                                ))
                                            )     
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );

    function delayFormat(planTime, actTime) {
        if (planTime === actTime || actTime === undefined) {
            return <span>{planTime}</span>;
        }
        else if (planTime === null || planTime === undefined) {
            return <span>-</span>;
        }
        else {
            let actimeArr = actTime.split(' ');
            let pltimeArr = planTime.split(' ');
            return ( 
                <>
                <span>{actimeArr[0]}</span>
                <span className="line-through mx-1">{actimeArr[1]}</span>
                <span>{pltimeArr[1]}</span> 
                </>
                );
        }
    }
}