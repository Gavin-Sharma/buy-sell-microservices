import { useState } from 'react';

const Dashboard = () => {
  const [statuses, setStatuses] = useState({});

  const fetchStatuses = () => {
    fetch('http://52.39.252.17/health')
      .then(response => response.json())
      .then(data => {
        setStatuses(data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="dashboard">
        <h2>Statuses:</h2>
        <button onClick={fetchStatuses}>Check Statuses</button>
        <ul>
          <li>Receiver: {statuses.receiver}</li>
          <li>Storage: {statuses.storage}</li>
          <li>Processing: {statuses.processing}</li>
        </ul>
    </div>
  );
};

export default Dashboard;