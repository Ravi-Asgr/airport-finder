export const FlightBox = ({ flightData }) => {
    return (
        <>
            {
                flightData && flightData.length > 0 && (
                    flightData.map((flight, i) => {
                        return (
                            <div key={i} className="grid grid-cols-[1fr_1.25fr_0.75fr] rounded-2xl border gap-2 sm:gap-10 p-1 sm:p-3 mt-2 bg-slate-50 w-full">
                                <div className="grid grid-cols-1 w-fit">
                                    <span>{flight.schedule}</span>
                                    <span>{flight.iata}</span>
                                    <span>{flight.flightNo}</span>
                                </div>
                                <div className="grid grid-cols-1 w-fit">
                                    <span>{flight.duration}</span>
                                    <span>{flight.depTerminal}</span>
                                    <span>{flight.arrTerminal}</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-fit">
                                    {
                                        flight.days.map((day, id) => {
                                            return (
                                                <span key={id} className="border rounded-2xl w-fit h-fit p-1 bg-slate-400">{day}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                )
            }

        </>
    )
}