import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://glowing-dollop-7p644jpq6hqqq-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><h2>Loading activities...</h2></div>;
  if (error) return <div className="container mt-4"><h2>Error: {error}</h2></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Activities</h1>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map(activity => (
                  <tr key={activity._id}>
                    <td>{activity.user}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date_created ? new Date(activity.date_created).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
