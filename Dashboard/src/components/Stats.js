import { useEffect, useState, useRef } from 'react'

const Stats = () => {
    const [event, setEvent] = useState([])

    useEffect(() => {
        fetch('http://34.220.1.135/processing/stats')
        .then(res => res.json())
        .then(res => { 
            setEvent(res) 
        })
    }, [])

    return (
        <div className="stats">
            <h2>Latest Statistics</h2>
            <div>
                <p>Max Buy Price: {event.max_buy_price}</p>
                <p>Number of Buys: {event.num_buys}</p>
                <p>Max Sell Price: {event.max_sell_price}</p>
                <p>Number of Sells: {event.num_sells}</p>
                <p>Last Updated: {event.max_buy_price}</p>
            </div>
        </div>
    )   
}

export default Stats
