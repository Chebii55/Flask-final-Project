from faker import Faker
from app import app, db  # Replace 'your_application' with the name of your application package
from models import  User, StaffManagement, Restaurant,Reservation, RatingReview
import random

fake = Faker()

def make_users():
   
    User.query.delete()

    for _ in range(50):
        name = fake.name()
        phone_number = fake.phone_number()[:10]
        email = fake.email()
        user = User(name=name, phone_number=phone_number, email=email)
        user.password_hash = user.name + 'password'
        db.session.add(user)

    db.session.commit()

def make_staff_management():
    roles=['Admin','Staff']
    StaffManagement.query.delete()
    for _ in range(5):
        name = fake.name()
        role = random.choice(roles)
        phone_number = fake.phone_number()[:10]
        email = fake.email()
        staff = StaffManagement(name=name, role=role , phone_number=phone_number, email=email)
        staff.password_hash = staff.name + 'password'
        db.session.add(staff)
    db.session.commit()


def make_restaurants():
    Restaurant.query.delete()
    images=["https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1670984935550-5ce2e220977a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D","https://media.cnn.com/api/v1/images/stellar/prod/191223114547-mott-32-marina-bay-sands-32-dining-room-1.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280","https://parispropertygroup.com/data/uploads/2022/01/bambini-avenue-president-wilson-75016-paris-600x355.webp"]
    for i in range(5):
        name = fake.company()
        address = fake.address()
        image = images[i]
        details = fake.text()
        restaurant = Restaurant(name=name, address=address, image=image, details=details, tables = 50)
        db.session.add(restaurant)
    db.session.commit()

def make_reservations():
    Reservation.query.delete()

    users = User.query.all()
    restaurants = Restaurant.query.all()

    for user in users:
        restaurant = fake.random_element(restaurants)
        
        reservation = Reservation(user=user, restaurant=restaurant)
        db.session.add(reservation)

    db.session.commit()

def make_rating_reviews():
    RatingReview.query.delete()

    users = User.query.all()
    restaurants = Restaurant.query.all()

    for user in users:
        restaurant = fake.random_element(restaurants)
        rating = random.randint(1, 5)
        
        review = fake.text()

        rating_review = RatingReview(user=user, restaurant=restaurant, rating=rating, review=review)
        db.session.add(rating_review)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_restaurants()
        make_staff_management()
        make_reservations()
        make_rating_reviews()
