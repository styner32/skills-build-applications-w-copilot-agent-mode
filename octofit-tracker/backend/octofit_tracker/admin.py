from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Admin interface for User model."""
    list_display = ('username', 'email')
    search_fields = ('username', 'email')
    ordering = ('username',)
    readonly_fields = ('_id',)
    
    fieldsets = (
        ('User Information', {
            'fields': ('username', 'email', 'password')
        }),
        ('MongoDB ID', {
            'fields': ('_id',),
            'classes': ('collapse',)
        })
    )


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    """Admin interface for Team model."""
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)
    readonly_fields = ('_id',)
    
    fieldsets = (
        ('Team Information', {
            'fields': ('name',)
        }),
        ('MongoDB ID', {
            'fields': ('_id',),
            'classes': ('collapse',)
        })
    )


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    """Admin interface for Activity model."""
    list_display = ('user', 'activity_type', 'duration', 'date_created')
    list_filter = ('activity_type', 'date_created')
    search_fields = ('user__username', 'activity_type')
    ordering = ('-date_created',)
    readonly_fields = ('_id', 'date_created')
    
    fieldsets = (
        ('Activity Information', {
            'fields': ('user', 'activity_type', 'duration')
        }),
        ('Timestamps', {
            'fields': ('date_created',),
            'classes': ('collapse',)
        }),
        ('MongoDB ID', {
            'fields': ('_id',),
            'classes': ('collapse',)
        })
    )


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    """Admin interface for Leaderboard model."""
    list_display = ('user', 'score')
    search_fields = ('user__username',)
    ordering = ('-score',)
    readonly_fields = ('_id',)
    
    fieldsets = (
        ('Leaderboard Information', {
            'fields': ('user', 'score')
        }),
        ('MongoDB ID', {
            'fields': ('_id',),
            'classes': ('collapse',)
        })
    )


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    """Admin interface for Workout model."""
    list_display = ('name',)
    search_fields = ('name', 'description')
    ordering = ('name',)
    readonly_fields = ('_id',)
    
    fieldsets = (
        ('Workout Information', {
            'fields': ('name', 'description')
        }),
        ('MongoDB ID', {
            'fields': ('_id',),
            'classes': ('collapse',)
        })
    )


# Customize the admin site header and title
admin.site.site_header = "OctoFit Tracker Admin"
admin.site.site_title = "OctoFit Admin Portal"
admin.site.index_title = "Welcome to OctoFit Tracker Administration"
