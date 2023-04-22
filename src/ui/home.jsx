import React, { useEffect, useState } from 'react';

const Home = () => {
    const [serialPorts, setSerialPorts] = useState([]);
    const [therePort, setTherePort] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        electron.IpcApi.sendMessage('ports', "serialPorts");
        electron.IpcApi.getMessage('ports', (data) => {
            setSerialPorts(data);
        });
    }, []);

    const selectPort3 = () => {
        electron.IpcApi.sendMessage('selectPort', "COM3");
        electron.IpcApi.getMessage('selectPort', (data) => {
            console.log(data);
            setTherePort(true);
        });
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (therePort) {
                electron.IpcApi.sendMessage('getData', "data");
                electron.IpcApi.getMessage('getData', (data) => {
                    setData(data);
                });
            }
        }, 500);
        return () => {
            clearInterval(intervalId);
        };
    });

    return (
        <section className='home'>
            Serial Ports:
            {serialPorts.map((data) => {
                return <p key={data.path}>{data.friendlyName}</p>
            })}

            <button onClick={selectPort3}>Connect</button>

            <h4>Data:</h4>
            <p>{data}</p>
        </section>
    );
}

export default Home;