import React, { useEffect, useState } from 'react';

const Home = () => {
    const [m, setM] = useState();

    useEffect(() => {
        electron.IpcApi.sendMessage('hello', "Finally!");
        electron.IpcApi.getMessage('hello', (data) => {
            setM(data);
        });

    }, []);

    return(
        <section className='home'>
            Hola {m}
        </section>
    );
}

export default Home;