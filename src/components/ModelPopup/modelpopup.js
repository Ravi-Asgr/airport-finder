import { useRef, useEffect, useState } from "react";

export const ModelDailog = ({ isOpen, isModelClosed, arrivals }) => {

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
                    <h1 className="font-bold text-lg">Arrivals</h1>
                    <img className="w-5 h-5" src="arrivals.png" />
                </div>
                <button className="font-bold text-lg ml-12 border px-2 border-slate-500" onClick={closeModel}>X</button>
            </div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrivals && arrivals.length > 0 && (
                            arrivals.map((dt, i) => (
                                <tr key={i}>
                                    <td>{dt.flight_icao}</td>
                                    <td>{dt.dep_time}</td>
                                    <td>{dt.arr_iata}</td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </dialog>
    );
}