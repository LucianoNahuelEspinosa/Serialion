import React, { useEffect, useState } from 'react';

const Home = () => {
    const [serialPorts, setSerialPorts] = useState([]);

    useEffect(() => {
        electron.IpcApi.sendMessage('ports', "serialPorts");
        electron.IpcApi.getMessage('ports', (data) => {
            setSerialPorts(data);
        });

    }, []);

    return (
        <section className='home'>
            Serial Ports: 
            {serialPorts.map((data) => {
                return <p key={data.path}>{data.friendlyName}</p>
            })}
        </section>
    );
}

export default Home;