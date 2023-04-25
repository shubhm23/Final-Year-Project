from fastapi import APIRouter, HTTPException

from service.users import UserRegister, UserLogin, User, UserService, Token


class UserRouter:
    def __init__(self, users_service: UserService) -> None:
        self._users_service = users_service

    @property
    def router(self):
        api_router = APIRouter(prefix="/user", tags=["users"])

        @api_router.get("/")
        def index():
            return "hello"

        @api_router.post("/register")
        def add_user(user: UserRegister):
            user = self._users_service.add_user(user)
            return self._users_service.create_token(user)

        @api_router.post("/login")
        def login_user(user: UserLogin):
            user = self._users_service.authenticate_user(user)
            return self._users_service.create_token(user)

        @api_router.post("/me")
        def get_current_user(token: Token):
            return self._users_service.decode_token(token.token)

        return api_router
