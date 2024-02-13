# Restaurant Management System

This project is a Restaurant Management System developed in Python using Flask framework and SQLAlchemy for database management and React on the front end and a RESTful API.

## Features


- **User Signup/Login:** Users can create an account or log in to an existing one.
- **Restaurant Listings:** Users can view a list of restaurants available for review.
- **Per Restaurant Details:** Users can view details of each restaurant, including reviews and ratings.
- **Submit Reviews:** Logged-in users can submit reviews and ratings for restaurants.
- **User Profile:** Users can view their profile information and their submitted reviews.


## Usage

- Once the application is running, you can access it through your web browser.
- Create user accounts, staff accounts, and manage restaurants through the provided interface.

## Endpoints

- **GET /users**: Retrieves all users.
- **GET /users/<user_id>**: Retrieves a specific user by ID.
- **POST /users**: Creates a new user.
- **PUT /users/<user_id>**: Updates an existing user by ID.
- **DELETE /users/<user_id>**: Deletes a user by ID.

- **GET /staff**: Retrieves all staff members.
- **GET /staff/<staff_id>**: Retrieves a specific staff member by ID.
- **POST /staff**: Creates a new staff member.
- **PUT /staff/<staff_id>**: Updates an existing staff member by ID.
- **DELETE /staff/<staff_id>**: Deletes a staff member by ID.

- **GET /restaurants**: Retrieves all restaurants.
- **GET /restaurants/<restaurant_id>**: Retrieves a specific restaurant by ID.
- **POST /restaurants**: Creates a new restaurant.
- **PUT /restaurants/<restaurant_id>**: Updates an existing restaurant by ID.
- **DELETE /restaurants/<restaurant_id>**: Deletes a restaurant by ID.

- **GET /reviews**: Retrieves all reviews.
- **GET /reviews/<review_id>**: Retrieves a specific review by ID.
- **POST /reviews**: Creates a new review.
- **PUT /reviews/<review_id>**: Updates an existing review by ID.
- **DELETE /reviews/<review_id>**: Deletes a review by ID.



