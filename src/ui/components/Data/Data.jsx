import React, { useState } from 'react';
import './Data.scss';

const Data = ({ data }) => {
    const [showInputFile, setShowInputFile] = useState(false);
    const [file, setFile] = useState(null);

    const showAudioSettings = () => {
        setShowInputFile(!showInputFile);
    }

    const handleOnChangeInputFile = (e) => {
        console.log(e.target.files[0].path);
        setFile(e.target.files[0].path);
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
                <input type="file" onChange={handleOnChangeInputFile}/>

                <audio src={file} style={{ display: file !== null ? 'block' : 'none' }} controls={true} loop={true}></audio>
            </div>
        </article>
    );
}

export default Data;