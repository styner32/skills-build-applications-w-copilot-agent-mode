import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="octofit-logo"
              />
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃‍♂️ Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏫 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light text-center text-muted py-3 mt-5">
          <div className="container">
            <p>&copy; 2025 OctoFit Tracker - Mergington High School Physical Education</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Home Component
function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">
            🐙 Welcome to OctoFit Tracker
          </h1>
          <p className="lead mb-4">
            Mergington High School's premier fitness tracking application
          </p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏃‍♂️ Track Activities</h5>
                  <p className="card-text">Log your daily fitness activities and monitor your progress.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 Compete</h5>
                  <p className="card-text">Check the leaderboard and compete with your classmates.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏫 Join Teams</h5>
                  <p className="card-text">Be part of the Blue Sharks or Gold Eagles teams.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">💪 Get Workouts</h5>
                  <p className="card-text">Access personalized workout plans for all fitness levels.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/activities" className="btn btn-primary btn-lg me-3">
              Start Tracking
            </Link>
            <Link to="/leaderboard" className="btn btn-outline-primary btn-lg">
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
