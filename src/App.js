import React, { useState } from 'react';

const allAlerts = [
  {
    "id": "6049dbd2-45bc-4e34-9ea2-c82ced0279f1",
    "alert_type": "Unsafe driving",
    "vehicle_id": "cc70a7e5-8397-4914-bbbb-4d6bb521ec67",
    "driver_friendly_name": "Ramesh",
    "vehicle_friendly_name": "KA12A3456",
    "timestamp": "2023-03-01T04:25:45.424Z"
  },
  {
    "id": "5149dbd2-45bc-4e34-9ea2-c82ced0279f1",
    "alert_type": "Distracted driver",
    "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
    "driver_friendly_name": "Suresh",
    "vehicle_friendly_name": "MH12A3456",
    "timestamp": "2023-03-01T04:24:45.424Z"
  },
  // Add more alerts as needed
];

const AlertApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayedAlerts, setDisplayedAlerts] = useState([]);

  const searchAlerts = () => {
    // Filter out empty search terms
    if (!searchTerm) {
      setDisplayedAlerts([]);
      return;
    }

    // Prepare regular expression for case-insensitive search
    const regex = new RegExp(searchTerm, 'i');
    const vehicleregex=new RegExp(vehicleNumber, 'i');
    // Filter based on search criteria
    const filteredAlerts = allAlerts.filter(alert => {
      let matchFound = false;

      // Match free text search
      if (searchTerm !== ' ')
        matchFound ||= alert.alert_type.match(regex) || alert.vehicle_friendly_name.match(regex) || (alert.driver_friendly_name.match(regex));

      // Match vehicle number search (exact)
      if (vehicleNumber) matchFound ||= alert.vehicle_friendly_name.match(vehicleregex);

      // Match date range search
      if (startDate && endDate) {
        const alertTime = new Date(alert.timestamp);
        matchFound ||= startDate <= alertTime && endDate >= alertTime;
      }

      return matchFound;
    });

    // Update displayed alerts
    setDisplayedAlerts(filteredAlerts);
    setSearchTerm("");
    setVehicleNumber("");
  };

  return (
    <div>
      <h1>Alert App</h1>

      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Free text search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by vehicle number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <div style={{ marginLeft: '10px' }}>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={searchAlerts} style={{ marginLeft: '10px' }}>Search</button>
      </div>

      {displayedAlerts.length > 0 && (
        <div>
          <h2>Alerts</h2>
          <hr />
          {displayedAlerts.map((alert, index) => (
            <div key={alert.id}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <p style={{ fontWeight: 'bold', marginRight: '5px' }}>{alert.alert_type}</p>
                <p style={{ fontWeight: 'bold' }}>• {new Date(alert.timestamp).toLocaleString()}</p>
              </div>
             
              <p><b>Driver</b>:{alert.driver_friendly_name}{"/"} {alert.vehicle_friendly_name}</p>
          
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertApp;