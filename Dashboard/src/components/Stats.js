import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({});

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
      <div className="stats">
        <h2>Latest Statistics</h2>
        <ul>
          <li>Max Buy Price: {stats.max_buy_price}</li>
          <li>Number of Buys: {stats.num_buys}</li>
          <li>Max Sell Price: {stats.max_sell_price}</li>
          <li>Number of Sells: {stats.num_sells}</li>
          <li>Last Updated: {stats.last_updated}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;