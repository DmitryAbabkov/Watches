import React, {FC, useEffect, useRef, useState} from 'react';
interface Entry {
    name: string;
    time: number;
}

interface ClockProps {
    entries: Entry[];
}

const Clock: FC<ClockProps> = ({ entries }) => {
    const [state, setState] = useState('')
    const [stateMinutes, setStateMinutes] = useState('')
    const [stateSeconds, setStateSeconds] = useState('')
    const intervalRef = useRef<number | undefined>(undefined);

    const del = (e: React.MouseEvent<HTMLDivElement>) => {
        if(typeof intervalRef.current === "number") {
            clearInterval(intervalRef.current)
            const el = e.currentTarget.parentNode as Element;
            if(el) el.remove();
        }
    }

    useEffect(() => {
        const updateTime = () => {
            const currentDateUTC: Date = new Date();
            let hours:string = String(currentDateUTC.getUTCHours()).padStart(2, '0');
            const minutes:string = String(currentDateUTC.getUTCMinutes()).padStart(2, '0');
            const seconds:string = String(currentDateUTC.getUTCSeconds()).padStart(2, '0');
            setState(`${hours}`);
            setStateMinutes(`${minutes}`)
            setStateSeconds(`${seconds}`)
        }
        updateTime();
        intervalRef.current = setInterval(updateTime, 1000);

        return () => {
            if (typeof intervalRef.current === "number") {
                clearInterval(intervalRef.current)
            }
        }

    }, [])

    return (
        <>
            {entries.map((item, key) => (
                <div key={key} className='item__clock'>
                    <div className="item__clock-top">
                        <div className="name__time">{item.name}</div>
                        <div className='time'>
                            {(+state + +item.time) % 24}:{stateMinutes}:{stateSeconds}</div>
                    </div>
                    <div onClick={del} className='close'>x</div>
                </div>
            ))}
        </>
    );
}

export default Clock;
