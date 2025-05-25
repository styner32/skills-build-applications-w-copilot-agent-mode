import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://glowing-dollop-7p644jpq6hqqq-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><h2>Loading workouts...</h2></div>;
  if (error) return <div className="container mt-4"><h2>Error: {error}</h2></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">💪 Workout Plans</h1>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div key={workout._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {workout.name.toLowerCase().includes('running') && '🏃‍♂️ '}
                    {workout.name.toLowerCase().includes('cycling') && '🚴‍♂️ '}
                    {workout.name.toLowerCase().includes('swimming') && '🏊‍♂️ '}
                    {workout.name.toLowerCase().includes('strength') && '💪 '}
                    {workout.name.toLowerCase().includes('hiit') && '🔥 '}
                    {workout.name}
                  </h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {workout.name.toLowerCase().includes('beginner') && '⭐ Beginner Level'}
                      {workout.name.toLowerCase().includes('endurance') && '⭐⭐ Intermediate Level'}
                      {workout.name.toLowerCase().includes('challenge') && '⭐⭐⭐ Advanced Level'}
                      {!workout.name.toLowerCase().includes('beginner') && 
                       !workout.name.toLowerCase().includes('endurance') && 
                       !workout.name.toLowerCase().includes('challenge') && '⭐⭐ All Levels'}
                    </small>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-sm">
                    Start Workout
                  </button>
                  <button className="btn btn-outline-secondary btn-sm ms-2">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h4>No workouts available</h4>
              <p>Workout plans will appear here once they are created.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
