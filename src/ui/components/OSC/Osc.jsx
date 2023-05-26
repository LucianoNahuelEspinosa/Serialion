import React, { useState } from "react";
import './Osc.scss';

const OSC = () => {
    const [youAddClient, setYouAddClient] = useState(false);
    const [oscIPAddress, setOscIPAddress] = useState('');
    const [oscPort, setOscPort] = useState('');
    const [clients, setClients] = useState([]);

    const showAddClient = () => {
        setYouAddClient(!youAddClient);
    }

    const addClient = (e) => {
        e.preventDefault();
        const clientData = {
            'ip': oscIPAddress,
            'port': oscPort
        };

        electron.IpcApi.sendMessage('addClient', clientData);
        electron.IpcApi.getMessage('addClient', (data) => {
            setClients(data);

            setYouAddClient(false);
            setOscIPAddress('');
            setOscPort('');
        });
    }

    const removeClient = (e, index) => {
        e.preventDefault();
        electron.IpcApi.sendMessage('removeClient', index);
        electron.IpcApi.getMessage('removeClient', (data) => {
            setClients(data);
        });
    }

    return (
        <div className="osc-settings">
            <h2>OSC</h2>
            <button className='button-primary' onClick={showAddClient}>Add Client</button>

            <form className="add-client" style={{ display: youAddClient ? 'block' : 'none' }} onSubmit={addClient}>
                <div className="input-group">
                    <label>IP Address</label>
                    <input type="text" placeholder="127.0.0.1" required={true} value={oscIPAddress} onChange={(e) => setOscIPAddress(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Port</label>
                    <input type="number" placeholder="3333" required={true} min={2} max={65535} value={oscPort} onChange={(e) => setOscPort(e.target.value)} />
                </div>
                <div className="buttons-holder">
                    <button type="submit" className='button-primary'>Add New Client</button>
                    <button className='button-secondary' onClick={showAddClient}>Cancel</button>
                </div>
            </form>

            <div className="osc-clients-holder">
                {clients.map((c, index) => {
                    return (
                        <article key={index} className="osc-client-card">
                            <p><strong>IP Address:</strong> {c.ip}</p>
                            <p><strong>Port:</strong> {c.port}</p>
                            <button className='button-primary' onClick={(e) => removeClient(e, index)}>Delete</button>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default OSC;