import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://glowing-dollop-7p644jpq6hqqq-8000.app.github.dev/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><h2>Loading teams...</h2></div>;
  if (error) return <div className="container mt-4"><h2>Error: {error}</h2></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🏫 Mergington High School Teams</h1>
      <div className="row">
        {teams.length > 0 ? (
          teams.map(team => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {team.name.includes('Blue') && '🔵 '}
                    {team.name.includes('Gold') && '🟡 '}
                    {team.name}
                  </h5>
                  <p className="card-text">
                    Team ID: <code>{team._id}</code>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {team.name.includes('Sharks') && '🦈 Sharks Team'}
                      {team.name.includes('Eagles') && '🦅 Eagles Team'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h4>No teams found</h4>
              <p>Teams will appear here once they are created.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
