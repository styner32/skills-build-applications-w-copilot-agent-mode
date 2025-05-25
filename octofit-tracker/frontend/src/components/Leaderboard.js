import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://glowing-dollop-7p644jpq6hqqq-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        return response.json();
      })
      .then(data => {
        // Sort by score in descending order
        const sortedData = data.sort((a, b) => b.score - a.score);
        setLeaderboard(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><h2>Loading leaderboard...</h2></div>;
  if (error) return <div className="container mt-4"><h2>Error: {error}</h2></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🏆 OctoFit Leaderboard</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry._id} className={index < 3 ? 'table-warning' : ''}>
                    <td>
                      <strong>#{index + 1}</strong>
                    </td>
                    <td>{entry.user}</td>
                    <td>
                      <span className="badge bg-primary">{entry.score}</span>
                    </td>
                    <td>
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && '🏃‍♂️'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No leaderboard data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
