import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [statuses, setStatuses] = useState({});
  const [stats, setStats] = useState({});

  const fetchStatuses = () => {
    fetch('http://52.39.252.17/health')
      .then(response => response.json())
      .then(data => {
        setStatuses(data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetch('http://52.39.252.17/processing/stats')
      .then(response => response.json())
      .then(data => {
        setStats(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <h2>Latest Statistics</h2>
        <ul>
          <li>Max Buy Price: {stats.max_buy_price}</li>
          <li>Number of Buys: {stats.num_buys}</li>
          <li>Max Sell Price: {stats.max_sell_price}</li>
          <li>Number of Sells: {stats.num_sells}</li>
          <li>Last Updated: {stats.last_updated}</li>
        </ul>

        <h2>Statuses:</h2>
        <button onClick={fetchStatuses}>Check Statuses</button>
        <ul>
          <li>Receiver: {statuses.receiver}</li>
          <li>Storage: {statuses.storage}</li>
          <li>Processing: {statuses.processing}</li>
        </ul>
      </div>
      
    </div>
  );
};

export default Dashboard;