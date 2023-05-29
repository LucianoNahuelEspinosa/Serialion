import React, { useState, useRef, useEffect } from 'react';
import './Audio.scss';

const Audio = ({ value }) => {
    const audioRef = useRef();
    const [file, setFile] = useState(null);

    // Volume Functions
    const [volume, setVolume] = useState(1);
    const [volumeRange, setVolumeRange] = useState(1);
    const [volumeChecked, setVolumeChecked] = useState(false);
    const [rangeFrom, setRangeFrom] = useState(0);
    const [rangeTo, setRangeTo] = useState(1);

    useEffect(() => {
        if (volumeChecked) {
            setVolume(map_range(value, rangeFrom, rangeTo, 0, 1));
        }
    }, [value]);

    useEffect(() => {
        if (volume >= 0 && volume <= 1) {
            audioRef.current.volume = volume;
            setVolumeRange(volume);
        } else if (volume > 1) {
            audioRef.current.volume = 1;
            setVolumeRange(1);
        } else {
            audioRef.current.volume = 0;
            setVolumeRange(0);
        }
    }, [volume]);

    // Get file path
    const handleOnChangeInputFile = (e) => {
        console.log(e.target.files[0].path);
        setFile(e.target.files[0].path);
    }

    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    return (
        <div className="audio-setup">
            <input type="file" onChange={handleOnChangeInputFile} />

            <audio ref={audioRef} src={file} style={{ display: file !== null ? 'block' : 'none' }} controls={true} loop={true}></audio>

            <div className="audio-settings" style={{ display: file !== null ? 'block' : 'none' }}>
                <div className="settings-checkboxes">
                    <label><input type="checkbox" value="Volume" checked={volumeChecked} onChange={() => setVolumeChecked(!volumeChecked)}/>Volume</label>
                </div>
                <div className='volume-settings' style={{ display: volumeChecked ? 'block' : 'none' }}>
                    <div className="range-value">
                        <div className='range-input'>
                            <label>From</label>
                            <input type="number" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} />
                        </div>
                        <div className='range-input'>
                            <label>To</label>
                            <input type="number" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} />
                        </div>
                    </div>
                    <input type="range" value={volumeRange} min={0.00} max={1.00} step={0.001} readOnly={true} style={{ backgroundSize: [`${volumeRange*100}%`, '100%'] }} />
                </div>
            </div>
        </div>
    );
}

export default Audio;