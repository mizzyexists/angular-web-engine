# CHANGELOG

## Version 1

### 1.1.0 - MAJOR UPDATE
- **Added new admin panel using the Nebular System**
    - Improved navigation
    - Improved UI/UX
    - Added permission-based views to sidebar navigation
- **Blog System V2**
    - Blog posts are now edited on their own pages per post
    - Each blog post has its own ID
    - Dashboard links now go to individual blog posts
    - Admins can edit posts from 'post-view' page
    - New posts are made on 'new-post' page
    - 'No posts' message shows when there are no blog posts
    - Reduced time delay on post save redirect
    - Updating a post redirects user back to 'post-view' page
    - Updated the UI/UX of 'blog-view'
- **Media Uploading**
    - Added profile images to users
    - Keeps old image if no image is saved
    - Saved on Server side
- Blocked user editing out to only Super-Admins but Admins can view all users
- Removed console log of login data
- Side-nav compacts on button click
- Added 'Profile' pages for user information
- Added 'Edit' button on profile page
- Top-nav responsiveness
- Checked and patched all permissions and restricted areas for vulnerabilities

### 1.0.9
- Expired user tokens get refreshed and cleared on read

### 1.0.8
- Added new styling to blog page with new forms
- Updated permissions to be more specific for blog editing privileges
- Added new styling to user list

### 1.0.7c
- Added title to "Blog" page

### 1.0.7b
- Removed un-needed variables from AUTH code

### 1.0.7
- Fixed cancel button on "Register" page
- Made username when adding a blog post titlecase
- Added Footer with Build Version
- Added app name to Nav Brand

### 1.0.6b
- Fixed Nav brand Link 404 with Hash-bangs
- Added Cancel button to register page

### 1.0.6
- Fixed username in nav to always be in titlecase
- Added Hash-bangs as a temp-fix for correct production routing (Will remove later)
- Added "Add User" button to "viewusers" page
- Decreased logout/login/action delay time
- Fixed blog page button styling

### 1.0.5
- Fixed routing login/logout issue when app is in production
- Removed lingering console.log entries
- Removed unused Router imports

### 1.0.4b
- General clean-up and error correcting for compiler

### 1.0.4
- Added Users to Dashboard if logged in user is above 'User' level
- Added break to blog title on Dashboard if it exceeds 20 characters

### 1.0.3b
- Removed blog post editing buttons for "User" level

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
