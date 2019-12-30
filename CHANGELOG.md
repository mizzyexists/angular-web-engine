# CHANGELOG

## Version 1

### 1.0.3
- Added Toast Notifications
- Removed Old Notifications
- Added permissions to blog editing
- Fixed password form issue where it was not posting value from the form

### 1.0.2
- Added data to Dashboard. (Blog posts and settings)
- Made certain menu items only visible based of logged in user's permissions

### 1.0.1
- Fixed issue with logout where username was not removed from nav-bar
- Improved how JWT expires and removes the token from local storage
- Updated auth service to check permissions more efficiently

### 1.0.0
- Created login system
- Created permissions based admin system
    - Pages check permissions before loading
- Created blogging system that pulls posts from MySQL DB
- Created settings values that are stored in MySQL DB
- Created user list area with edit and password change functions
- Added placeholder navigation
- Added Dashboard area
