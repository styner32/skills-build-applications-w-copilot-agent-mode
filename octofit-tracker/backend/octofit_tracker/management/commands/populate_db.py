from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for OctoFit Tracker - Mergington High School students'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users - Mergington High School students
        users = [
            User(_id=ObjectId(), username='paul_octo', email='paul.octo@mergington.edu', password='pauloctopassword'),
            User(_id=ObjectId(), username='jessica_cat', email='jessica.cat@mergington.edu', password='jessicacatpassword'),
            User(_id=ObjectId(), username='alex_runner', email='alex.runner@mergington.edu', password='alexrunnerpassword'),
            User(_id=ObjectId(), username='sam_swimmer', email='sam.swimmer@mergington.edu', password='samswimmerpassword'),
            User(_id=ObjectId(), username='taylor_cyclist', email='taylor.cyclist@mergington.edu', password='taylorcyclistpassword'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        blue_team = Team(_id=ObjectId(), name='Mergington Blue Sharks')
        blue_team.save()
        
        gold_team = Team(_id=ObjectId(), name='Mergington Gold Eagles')
        gold_team.save()

        # Create activities
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Running', duration=timedelta(minutes=45)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(_id=ObjectId(), user=users[3], activity_type='Swimming', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[4], activity_type='Cycling', duration=timedelta(hours=2)),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[2], score=150),  # alex_runner - highest score
            Leaderboard(_id=ObjectId(), user=users[4], score=140),  # taylor_cyclist  
            Leaderboard(_id=ObjectId(), user=users[1], score=120),  # jessica_cat
            Leaderboard(_id=ObjectId(), user=users[0], score=100),  # paul_octo
            Leaderboard(_id=ObjectId(), user=users[3], score=90),   # sam_swimmer
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(_id=ObjectId(), name='Beginner Running Plan', description='Perfect for students new to running - start with walk/jog intervals'),
            Workout(_id=ObjectId(), name='Cycling Endurance', description='Build stamina with progressive cycling workouts'),
            Workout(_id=ObjectId(), name='Swimming Technique', description='Focus on proper form and breathing techniques'),
            Workout(_id=ObjectId(), name='Bodyweight Strength', description='No equipment needed - perfect for home workouts'),
            Workout(_id=ObjectId(), name='HIIT Challenge', description='High-intensity interval training for advanced students'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the OctoFit database with Mergington High School test data.'))
