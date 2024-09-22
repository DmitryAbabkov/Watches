import React, {useState} from 'react';
import Clock from "./Clock.tsx";

const Form = () => {
    const [stateName, setStateName] = useState('');
    const [stateTime, setStateTime] = useState('');
    const [entries, setEntries] = useState([]);
    const sub = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEntries(prev => [...prev, {name: stateName, time: stateTime}]);
        setStateName('');
        setStateTime('');
    }

   const changeName:React.ChangeEventHandler<HTMLInputElement> = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStateName(e.target.value);
    }

    const changeTime:React.ChangeEventHandler<HTMLInputElement> = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStateTime(e.target.value);
    }

    return (
        <div className='form__add'>
            <form action="" className="form" onSubmit={sub}>
                <label htmlFor="" className="label label__name">Название
                    <input onChange={changeName} value={stateName} type="text" className="input input__name"/>
                </label>
                <label htmlFor="" className="label label__time">Временная зона
                    <input onChange={changeTime} type="text" value={stateTime} className="input input__time"/>
                </label>
                <button className="btn__add">Добавить</button>
            </form>
            <div className='list__clock'>
            <Clock entries={entries} />
            </div>
        </div>
    )
}

export default Form;
