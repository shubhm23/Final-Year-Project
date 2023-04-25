from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource
from fastapi import HTTPException
from passlib import hash


class UserRepository:
    def __init__(self, db: ServiceResource) -> None:
        self._db = db

    def get_user(self, username: str):
        try:
            table = self._db.Table("Users")
            response = table.get_item(Key={"username": username})
            return response.get("Item")
        except ClientError as e:
            raise ValueError(e.response["Error"]["Message"])

    def add_user(self, user: dict):
        table = self._db.Table("Users")
        check = self.get_user(username=user["username"])
        if check:
            raise HTTPException(status_code=401, detail="User Alread exists!!!")
        response = table.put_item(
            Item={
                "username": user["username"],
                "password": hash.bcrypt.hash(user["password"]),
                "fullname": user["fullname"],
                "email": user["email"],
            }
        )
        return response

    def authenticate_user(self, username: str, password: str):
        table = self._db.Table("Users")
        user = self.get_user(username=username)
        if not user:
            raise HTTPException(status_code=402, detail="User doesn't exists!!!")

        if not hash.bcrypt.verify(password, user["password"]):
            raise HTTPException(status_code=403, detail="Invalid Username or Password")

        return user
