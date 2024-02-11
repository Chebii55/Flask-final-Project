from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship, validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    # serialize_rules = (- db.reservations,db.ratingreviews,)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone_number=db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #connection
    reservations=db.relationship("Reservation", back_populates= "user")
    ratingreviews = db.relationship("RatingReview", back_populates = "user")

    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if len(phone_number) != 10:
            raise ValueError("Phone number must be 10 digits long")
        return phone_number
    
    @validates('email')
    def validate_email(self, key, email):
        if not "@" in email:
            raise ValueError("Invalid email format")
        return email
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"User  is {self.name}"


class StaffManagement(db.Model,SerializerMixin):
    __tablename__='staffmanagements'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    role = db.Column(db.String)
    phone_number=db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)


    @validates('role')
    def validate_role(self, key, role):
        valid_roles = ['Admin', 'Staff']
        if role not in valid_roles:
            raise ValueError("Invalid role")
        return role

    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if len(phone_number) != 10:
            raise ValueError("Phone number must be 10 digits long")
        return phone_number
    
    @validates('email')
    def validate_email(self, key, email):
        if not "@" in email:
            raise ValueError("Invalid email format")
        return email
    
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f"This is {self.name} who is {self.role}"


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    # serialize_rules = (- db.reservations,db.ratingreviews, )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    image = db.Column(db.String)
    details = db.Column(db.String)
    tables=db.Column (db.Integer)

    #connection
    reservations = db.relationship("Reservation", back_populates = "restaurant")
    ratingreviews = db.relationship("RatingReview", back_populates = "restaurant")

    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'name': self.name,
    #         'address': self.address,
    #         'image': self.image,
    #         'details': self.details,
    #         'tables': self.tables
    #     }
    
    def __repr__(self):
        return f"{self.name} is in {self.address}"


class Reservation(db.Model, SerializerMixin):
    __tablename__='reservations'
    serialize_rules = ('-restaurant','-user', )

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    #connection
    restaurant = db.relationship("Restaurant", back_populates= "reservations")
    user=db.relationship("User", back_populates= "reservations")

    def __repr__(self):
        return f"The id is {self.id}"

class RatingReview(db.Model, SerializerMixin):
    __tablename__='ratingreviews'
    serialize_rules = ( '-restaurant','-user' ,)

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    review = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    
    #connection
    user = db.relationship("User", back_populates="ratingreviews")
    restaurant = db.relationship("Restaurant" , back_populates="ratingreviews") 

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")
        return rating
    
    def __repr__(self):
        return f"Review for rating {self.rating}: {self.review}"

