import React, { useState, useEffect } from 'react';
import './Data.scss';
import Audio from '../Audio/Audio.jsx';

const Data = ({ data }) => {
    const [showInputFile, setShowInputFile] = useState(false);
    const [showInputOSCAddress, setShowInputOSCAddress] = useState(false);
    const [oscAddress, setOscAddress] = useState('');
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [indexAddress, setIndexAddress] = useState();

    const showAudioSettings = () => {
        setShowInputFile(!showInputFile);
    }

    const showOSCSettings = () => {
        setShowInputOSCAddress(!showInputOSCAddress);
    }

    const addEditOSCAddress = (e) => {
        e.preventDefault();

        if (!alreadyAdded) {
            const addressData = {
                'address': oscAddress,
                'value': data.value
            };

            electron.IpcApi.sendMessage('addAddress', addressData);
            electron.IpcApi.getMessage('addAddress', (data) => {
                setIndexAddress(data);
                setAlreadyAdded(true);
            });
        } else {
            const addressData = {
                'address': oscAddress,
                'value': data.value,
                'index': indexAddress
            };

            electron.IpcApi.sendMessage('editAddress', addressData);
        }
    }

    useEffect(() => {
        const addressData = {
            'address': oscAddress,
            'value': data.value,
            'index': indexAddress
        };

        electron.IpcApi.sendMessage('updateOSCValue', addressData);
    }, [data.value]);

    return (
        <article className='data'>
            <div className="data-holder">
                <h3>{data.name}</h3>
                <p>{data.value}</p>
            </div>
            <div className="data-buttons">
                <button className='button-primary' onClick={showAudioSettings}>Setup sound</button>
                <button className='button-secondary' onClick={showOSCSettings}>OSC Settings</button>
            </div>
            <div className="input-file-data" style={{ display: showInputFile ? 'block' : 'none' }}>
                <Audio value={data.value} />
            </div>
            <form className="input-osc-data" style={{ display: showInputOSCAddress ? 'flex' : 'none' }} onSubmit={addEditOSCAddress}>
                <div className="input-group">
                    <label>OSC Address</label>
                    <input type="text" placeholder='/oscaddress' required={true} value={oscAddress} onChange={(e) => setOscAddress(e.target.value)} />
                </div>
                <button type='submit' className='button-primary'>Set Address</button>
            </form>
        </article>
    );
}

export default Data;