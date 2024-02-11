#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request,session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from config import bcrypt
from models import db, User, StaffManagement, Restaurant, Reservation, RatingReview

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

migrate = Migrate(app, db)

db.init_app(app)

api=Api(app)

class Index(Resource):

    def get(self):
        all_res=Restaurant.query.all()
        restaurants=[restaurant.to_dict() for restaurant in  all_res]
        return make_response(jsonify(restaurants),200)

class Signup(Resource):
    def post(self):
        data = request.get_json()
        user_or_staff=data['user_or_staff']
        if user_or_staff == 'user':
            try:
                # Hash the password
                password_hash = bcrypt.generate_password_hash(data['_password_hash']).decode('utf-8')

                # Create a new User object
                new_user = User(
                    name=data['name'],
                    phone_number=data['phone_number'],
                    email=data['email'],
                    _password_hash=password_hash
                )

                # Add the new user to the database session
                db.session.add(new_user)
                db.session.commit()

                # Set the user_id in session
                session["user_id"] = new_user.id

                # Return success response with user data
                return make_response(jsonify(new_user.to_dict()), 201)
            except ValueError as ve:
                error_message = f"ValueError: {ve}"
                print(error_message)
                return make_response(jsonify({'error': error_message}), 400)
            except Exception as e:
                error_message = f"An error occurred: {e}"
                print(error_message)
                return make_response(jsonify({'error': error_message}), 500)

        if user_or_staff == 'staff':
            try:
                # Hash the password
                password_hash = bcrypt.generate_password_hash(data['_password_hash']).decode('utf-8')

                # Create a new StaffManagement object
                new_staff = StaffManagement(
                    name=data['name'],
                    role=data['role'],
                    phone_number=data['phone_number'],
                    email=data['email'],
                    _password_hash=password_hash
                )

                # Add the new staff to the database session
                db.session.add(new_staff)
                db.session.commit()
                session["staff_id"] = new_staff.id

                return make_response(jsonify(new_staff.to_dict()), 201)
            except ValueError as ve:
                error_message = f"ValueError: {ve}"
                print(error_message)
                return make_response(jsonify({'error': error_message}), 400)
            except Exception as e:
                error_message = f"An error occurred: {e}"
                print(error_message)
                return make_response(jsonify({'error': error_message}), 500)
        
class Login(Resource):
    def post(self):

        data = request.get_json()

        user_or_staff=data.get("user_or_staff")
        name  = data.get("name")
        password =  data.get("password")

        if user_or_staff == "user":
            user = User.query.filter(User.name==name).first()

            if user and user.authenticate(password):
                session["user_id"] = user.id
                response = {
                    "id": user.id,
                    "name": user.name,
                    "phone_number":user.phone_number,
                    "email":user.email
                    }

                return response
        if user_or_staff == "staff":
            staff = StaffManagement.query.filter(StaffManagement.name==name).first()

            if staff and staff.authenticate(password):
                session["staff_id"] = staff.id
                response = {
                        "id": staff.id,
                        "name": staff.name,
                        "role":staff.role,
                        "phone_number":staff.phone_number,
                        "email":staff.email
                        }

                return response
        return {"error": "Invalid username or password or user/staff info."}, 401

class CheckSession(Resource):
    
    def get(self):
        user_id = session.get("user_id")
        staff_id = session.get("staff_id")

        if user_id:
            user = User.query.get(user_id)
            if user:
                response = {
                    "id": user.id,
                    "user": user.name
                }
                return response
            else:
                return {"error": "User not found"}, 404
        
        elif staff_id:
            staff = StaffManagement.query.get(staff_id)
            if staff:
                response = {
                    "id": staff.id,
                    "name": staff.name
                }
                return response
            else:
                return {"error": "Staff member not found"}, 404
        
        else:
            return {"error": "Session information missing"}, 401

        
class Logout(Resource):
    
    def delete(self):
        if session["user_id"]:
            session["user_id"] =  None

            return {}, 204
        if session["staff_id"]:
            session["staff_id"] =  None

            return {}, 204
        
        return {"error": "Unauthorized"}, 401

class Restaurants(Resource):
    def get(self):
        all_res=Restaurant.query.all()
        restaurants=[restaurant.to_dict() for restaurant in  all_res]
        return make_response(jsonify(restaurants),200)
    
    def post(self):
        data=request.get_json()

        new_restaurant=Restaurant(
            name=data['name'],
            address=data['address'],
            image=data['image'],
            details=data['details'],
            tables=data['tables']
        )

        try:
            db.session.add(new_restaurant)
            db.session.commit()
            return make_response(jsonify(new_restaurant.to_dict()), 201)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

        
class RestaurantsByID(Resource):
    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            resp = {"error": "Restaurant not found"}
            return resp

        return make_response(jsonify(restaurant.to_dict()), 200)
    def put(self, id):
        data = request.get_json()
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return make_response(jsonify({'error': 'Restaurant not found'}), 404)

        try:
            restaurant.name = data.get('name', restaurant.name)
            restaurant.address = data.get('address', restaurant.address)
            restaurant.image = data.get('image', restaurant.image)
            restaurant.details = data.get('details', restaurant.details)
            restaurant.tables = data.get('tables', restaurant.tables)
            db.session.commit()
            return make_response(jsonify(restaurant.to_dict()), 200)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)


    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            resp = {"error": "Restaurant not found"}
            return resp

        try:
            db.session.delete(restaurant)
            db.session.commit()
            return make_response('Deleted restaurant successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting restaurant', 500)


class Users(Resource):
    def get(self):
        all_users=User.query.all()
        users=[user.to_dict() for user in  all_users]
        return make_response(jsonify(users),200)
        

class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            resp = {"error": "User not found"}
            return resp

        return make_response(jsonify(user.to_dict()), 200)
    def put(self, id):
        # Update an existing user with the given ID
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)

        try:
            user.name = data['name']
            user.phone_number = data['phone_number']
            user.email = data['email']
            db.session.commit()
            return make_response(jsonify(user.to_dict()), 200)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)


    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            resp = {"error": "User not found"}
            return resp

        try:
            db.session.delete(user)
            db.session.commit()
            return make_response('Deleted user successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting user', 500)

class StaffManagements(Resource):
    def get(self):
        all_staff = StaffManagement.query.all()
        staff_list = [staff.to_dict() for staff in all_staff]
        return make_response(jsonify(staff_list), 200)
    

class StaffManagementByID(Resource):
    def get(self, id):
        staff = StaffManagement.query.filter_by(id=id).first()

        if not staff:
            resp = {"error": "Staff member not found"}
            return resp

        return make_response(jsonify(staff.to_dict()), 200)

    def put(self, id):
        data = request.get_json()

        staff = StaffManagement.query.filter_by(id=id).first()

        if not staff:
            return make_response(jsonify({'error': 'Staff member not found'}), 404)

        try:
            staff.name = data['name']
            staff.role = data['role']
            db.session.commit()
            return make_response(jsonify(staff.to_dict()), 200)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

    def delete(self, id):
        staff = StaffManagement.query.filter_by(id=id).first()

        if not staff:
            resp = {"error": "Staff member not found"}
            return resp

        try:
            db.session.delete(staff)
            db.session.commit()
            return make_response('Deleted staff member successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting staff member', 500)

class Reservations(Resource):
    def get(self):
        all_reservations = Reservation.query.all()
        reservations = [reservation.to_dict() for reservation in all_reservations]
        return make_response(jsonify(reservations), 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_reservation = Reservation(
                user_id=data['user_id'],
                restaurant_id=data['restaurant_id']
            )
            db.session.add(new_reservation)
            db.session.commit()
            return make_response(jsonify(new_reservation.to_dict()), 201)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

class ReservationsByID(Resource):
    def get(self, id):
        reservation = Reservation.query.get(id)
        if not reservation:
            return make_response(jsonify({'error': 'Reservation not found'}), 404)

        return make_response(jsonify(reservation.to_dict()), 200)

    def put(self, id):
        data = request.get_json()
        reservation = Reservation.query.get(id)
        if not reservation:
            return make_response(jsonify({'error': 'Reservation not found'}), 404)

        try:
            reservation.user_id = data['user_id']
            reservation.restaurant_id = data['restaurant_id']
            db.session.commit()
            return make_response(jsonify(reservation.to_dict()), 200)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

    def delete(self, id):
        reservation = Reservation.query.get(id)
        if not reservation:
            return make_response(jsonify({'error': 'Reservation not found'}), 404)

        try:
            db.session.delete(reservation)
            db.session.commit()
            return make_response('Deleted reservation successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting reservation', 500)

class RatingReviews(Resource):
    def get(self):
        all_reviews = RatingReview.query.all()
        review_list = [review.to_dict() for review in all_reviews]
        return make_response(jsonify(review_list), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_review = RatingReview(
                rating=data['rating'],
                review=data['review'],
                user_id=data['user_id'],
                restaurant_id=data['restaurant_id']
            )
            db.session.add(new_review)
            db.session.commit()
            return make_response(jsonify(new_review.to_dict()), 201)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

class RatingReviewByID(Resource):
    def get(self, id):
        review = RatingReview.query.filter_by(id=id).first()

        if not review:
            resp = {"error": "Review not found"}
            return resp

        return make_response(jsonify(review.to_dict()), 200)

    def put(self, id):
        data = request.get_json()

        review = RatingReview.query.filter_by(id=id).first()

        if not review:
            return make_response(jsonify({'error': 'Review not found'}), 404)

        try:
            review.rating = data['rating']
            review.review = data['review']
            db.session.commit()
            return make_response(jsonify(review.to_dict()), 200)
        except ValueError as ve:
            error_message = f"ValueError: {ve}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 400)
        except Exception as e:
            error_message = f"An error occurred: {e}"
            print(error_message)
            return make_response(jsonify({'error': error_message}), 500)

    def delete(self, id):
        review = RatingReview.query.filter_by(id=id).first()

        if not review:
            resp = {"error": "Review not found"}
            return resp

        try:
            db.session.delete(review)
            db.session.commit()
            return make_response('Deleted review successfully', 200)
        except Exception as e:
            print(f"An error occurred: {e}")
            return make_response('Error deleting review', 500)

api.add_resource(Index, '/')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Restaurants, '/restaurants')
api.add_resource(RestaurantsByID, '/restaurants/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(UsersByID, '/users/<int:id>')
api.add_resource(StaffManagements, '/staffmanagements')
api.add_resource(StaffManagementByID, '/staffmanagements/<int:id>')
api.add_resource(Reservations, '/reservations')
api.add_resource(ReservationsByID, '/reservations/<int:id>')
api.add_resource(RatingReviews, '/ratingreviews')
api.add_resource(RatingReviewByID, '/ratingreviews/<int:id>')
api.add_resource(Logout, '/logout', endpoint='logout')



if __name__ == '__main__':
    app.run(port=5555)