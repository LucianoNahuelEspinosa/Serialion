import React, { useState } from 'react';
import './Data.scss';
import Audio from '../Audio/Audio.jsx';

const Data = ({ data }) => {
    const [showInputFile, setShowInputFile] = useState(false);

    const showAudioSettings = () => {
        setShowInputFile(!showInputFile);
    }

    return (
        <article className='data'>
            <div className="data-holder">
                <h3>{data.name}</h3>
                <p>{data.value}</p>
            </div>
            <div className="data-buttons">
                <button className='button-primary' onClick={showAudioSettings}>Setup sound</button>
                <button className='button-secondary'>OSC Settings</button>
            </div>
            <div className="input-file-data" style={{ display: showInputFile ? 'block' : 'none' }}>
                <Audio value={data.value} />
            </div>
        </article>
    );
}

export default Data;