import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from domain.db import initialize_db
from service.users import UserService
from repository.users import UserRepository
from router.users import UserRouter

app = FastAPI()

origins = {"http://localhost", "http://localhost:3000"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = initialize_db()

users_repository = UserRepository(db)
users_domain = UserService(users_repository)
users_router = UserRouter(users_domain)

app.include_router(users_router.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
