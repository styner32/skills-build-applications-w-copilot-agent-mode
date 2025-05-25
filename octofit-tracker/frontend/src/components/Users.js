import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://glowing-dollop-7p644jpq6hqqq-8000.app.github.dev/api/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><h2>Loading users...</h2></div>;
  if (error) return <div className="container mt-4"><h2>Error: {error}</h2></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">👥 Mergington High School Students</h1>
      <div className="row">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {user.username.includes('octo') && '🐙 '}
                    {user.username.includes('cat') && '🐱 '}
                    {user.username.includes('runner') && '🏃‍♂️ '}
                    {user.username.includes('swimmer') && '🏊‍♂️ '}
                    {user.username.includes('cyclist') && '🚴‍♂️ '}
                    {user.username}
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">ID: {user._id}</small>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    {user.email.includes('@mergington.edu') ? 
                      '✅ Verified Student' : 
                      '❓ Unknown Status'
                    }
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h4>No users found</h4>
              <p>Student profiles will appear here once they are registered.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
