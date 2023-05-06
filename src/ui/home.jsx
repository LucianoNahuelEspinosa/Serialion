import React, { useEffect, useState } from 'react';
import './home.scss';

const Home = () => {
    const [serialPorts, setSerialPorts] = useState([]);
    const [therePort, setTherePort] = useState(false);
    const [data, setData] = useState([]);

    const [selectValueInput, setSelectValueInput] = useState('');

    const getPorts = () => {
        electron.IpcApi.sendMessage('ports', "serialPorts");
        electron.IpcApi.getMessage('ports', (data) => {
            setSerialPorts(data);
        });
    }

    const selectPort = (e) => {
        e.preventDefault();

        electron.IpcApi.sendMessage('selectPort', selectValueInput);
        electron.IpcApi.getMessage('selectPort', (data) => {
            console.log(data);
            setTherePort(true);
        });
    }

    const processData = (d) => {
        const splitData = d.split(':');
        const obj = {'name': splitData[0], 'value': splitData[1]};
        setData([obj]);
    }

    // Functions when the app has been started
    useEffect(() => {
        getPorts();
    }, []);

    // Functions for get data from Serial Ports selected
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (therePort) {
                electron.IpcApi.sendMessage('getData', "data");
                electron.IpcApi.getMessage('getData', (data) => {
                    processData(data);
                });
            }
        }, 500);
        return () => {
            clearInterval(intervalId);
        };
    });

    return (
        <section className='home'>
            <div className="container">
                <h1>Serialion</h1>

                <form onSubmit={selectPort}>
                    <label htmlFor="ports">Serial Ports</label>
                    <select name="ports" id="ports" required={true} value={selectValueInput} onChange={(e) => setSelectValueInput(e.target.value)}>
                        <option value="" disabled={true}>Select...</option>
                        {serialPorts.map((data) => {
                            return <option key={data.path} value={data.path}>{data.friendlyName}</option>
                        })}
                    </select>

                    <div className="buttons-form">
                        <button type="submit" className='button-primary'>Connect</button>
                        <button type="reset" className='button-secondary' onClick={getPorts}>Refresh</button>
                    </div>
                </form>

                <div className='serial-data'>
                    <h2>Data</h2>
                    
                    {data.map((d) => {
                        return(
                            <div key={d.name}>
                                <p>{d.name}</p>
                                <h3>{d.value}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Home;