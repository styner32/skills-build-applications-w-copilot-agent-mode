from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId


class ModelTestCase(TestCase):
    """Test cases for OctoFit Tracker models."""

    def setUp(self):
        """Set up test data."""
        self.user = User.objects.create(
            username="test_user",
            email="test@mergington.edu",
            password="testpass123"
        )
        self.team = Team.objects.create(name="Test Team")
        self.workout = Workout.objects.create(
            name="Test Workout",
            description="A test workout routine"
        )

    def test_user_creation(self):
        """Test that a user can be created."""
        self.assertEqual(self.user.username, "test_user")
        self.assertEqual(self.user.email, "test@mergington.edu")
        self.assertTrue(isinstance(self.user._id, ObjectId))

    def test_team_creation(self):
        """Test that a team can be created."""
        self.assertEqual(self.team.name, "Test Team")
        self.assertTrue(isinstance(self.team._id, ObjectId))

    def test_activity_creation(self):
        """Test that an activity can be created."""
        activity = Activity.objects.create(
            user=self.user,
            activity_type="Running",
            duration=30
        )
        self.assertEqual(activity.user, self.user)
        self.assertEqual(activity.activity_type, "Running")
        self.assertEqual(activity.duration, 30)
        self.assertTrue(isinstance(activity._id, ObjectId))

    def test_leaderboard_creation(self):
        """Test that a leaderboard entry can be created."""
        leaderboard = Leaderboard.objects.create(
            user=self.user,
            score=100
        )
        self.assertEqual(leaderboard.user, self.user)
        self.assertEqual(leaderboard.score, 100)
        self.assertTrue(isinstance(leaderboard._id, ObjectId))

    def test_workout_creation(self):
        """Test that a workout can be created."""
        self.assertEqual(self.workout.name, "Test Workout")
        self.assertEqual(self.workout.description, "A test workout routine")
        self.assertTrue(isinstance(self.workout._id, ObjectId))


class APITestCase(APITestCase):
    """Test cases for OctoFit Tracker API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.user = User.objects.create(
            username="api_test_user",
            email="apitest@mergington.edu",
            password="apitest123"
        )
        self.team = Team.objects.create(name="API Test Team")

    def test_api_root(self):
        """Test that the API root endpoint returns the correct response."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_users_list(self):
        """Test that the users list endpoint works."""
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], 'api_test_user')

    def test_teams_list(self):
        """Test that the teams list endpoint works."""
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'API Test Team')

    def test_activities_list(self):
        """Test that the activities list endpoint works."""
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_list(self):
        """Test that the leaderboard list endpoint works."""
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workouts_list(self):
        """Test that the workouts list endpoint works."""
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_creation_via_api(self):
        """Test creating a user via the API."""
        data = {
            'username': 'new_user',
            'email': 'newuser@mergington.edu',
            'password': 'newpass123'
        }
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'new_user')

    def test_team_creation_via_api(self):
        """Test creating a team via the API."""
        data = {'name': 'New Team'}
        response = self.client.post('/api/teams/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'New Team')

    def test_activity_creation_via_api(self):
        """Test creating an activity via the API."""
        data = {
            'user': str(self.user._id),
            'activity_type': 'Swimming',
            'duration': 45
        }
        response = self.client.post('/api/activities/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['activity_type'], 'Swimming')

    def test_leaderboard_creation_via_api(self):
        """Test creating a leaderboard entry via the API."""
        data = {
            'user': str(self.user._id),
            'score': 150
        }
        response = self.client.post('/api/leaderboard/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['score'], 150)

    def test_workout_creation_via_api(self):
        """Test creating a workout via the API."""
        data = {
            'name': 'API Workout',
            'description': 'A workout created via API'
        }
        response = self.client.post('/api/workouts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'API Workout')


class UserModelTestCase(TestCase):
    """Specific test cases for User model."""

    def test_user_str_representation(self):
        """Test the string representation of User model."""
        user = User.objects.create(
            username="test_str",
            email="teststr@mergington.edu",
            password="test123"
        )
        self.assertEqual(str(user), "test_str")

    def test_user_email_validation(self):
        """Test user email field."""
        user = User.objects.create(
            username="email_test",
            email="emailtest@mergington.edu",
            password="test123"
        )
        self.assertIn("@mergington.edu", user.email)


class TeamModelTestCase(TestCase):
    """Specific test cases for Team model."""

    def test_team_str_representation(self):
        """Test the string representation of Team model."""
        team = Team.objects.create(name="String Test Team")
        self.assertEqual(str(team), "String Test Team")


class ActivityModelTestCase(TestCase):
    """Specific test cases for Activity model."""

    def setUp(self):
        self.user = User.objects.create(
            username="activity_user",
            email="activity@mergington.edu",
            password="test123"
        )

    def test_activity_str_representation(self):
        """Test the string representation of Activity model."""
        activity = Activity.objects.create(
            user=self.user,
            activity_type="Testing",
            duration=60
        )
        expected_str = f"{self.user.username} - Testing"
        self.assertEqual(str(activity), expected_str)


class LeaderboardModelTestCase(TestCase):
    """Specific test cases for Leaderboard model."""

    def setUp(self):
        self.user = User.objects.create(
            username="leaderboard_user",
            email="leaderboard@mergington.edu",
            password="test123"
        )

    def test_leaderboard_str_representation(self):
        """Test the string representation of Leaderboard model."""
        leaderboard = Leaderboard.objects.create(
            user=self.user,
            score=200
        )
        expected_str = f"{self.user.username}: 200"
        self.assertEqual(str(leaderboard), expected_str)


class WorkoutModelTestCase(TestCase):
    """Specific test cases for Workout model."""

    def test_workout_str_representation(self):
        """Test the string representation of Workout model."""
        workout = Workout.objects.create(
            name="Test Workout String",
            description="Test description"
        )
        self.assertEqual(str(workout), "Test Workout String")
