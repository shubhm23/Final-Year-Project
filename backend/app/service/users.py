from pydantic import BaseModel
from repository.users import UserRepository
import jwt
from fastapi import HTTPException

JWT_SECRET = "123"


class UserBase(BaseModel):
    username: str


class UserRegister(UserBase):
    password: str
    email: str
    fullname: str


class UserLogin(UserBase):
    password: str


class User(UserBase):
    email: str
    fullname: str

class Token(BaseModel):
    token: str


class UserService:
    def __init__(self, repository: UserRepository) -> None:
        self._repository = repository

    def get_user(self, username: str):
        return self._repository.get_user(username)

    def add_user(self, user: UserRegister):
        return self._repository.add_user(user.dict())

    def authenticate_user(self, user: UserLogin):
        user_info = user.dict()
        return self._repository.authenticate_user(
            username=user_info["username"], password=user_info["password"]
        )

    def create_token(self, user):
        token = jwt.encode(user, JWT_SECRET)
        return dict(access_token=token, token_type="bearer")

    def decode_token(self, token):
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
