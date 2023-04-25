from pydantic import BaseModel
from repository.patients import PatientRepository
from fastapi import HTTPException


class PatientBase(BaseModel):
    fullname: str
    dob: str
    gender: str
    address: str
    email: str


class PatientRegister(PatientBase):
    uploaded_image_url: list


class PatientService:
    def __init__(self, repository: PatientRepository) -> None:
        self._repository = repository

    def get_patients(self, doctor_username: str):
        return self._repository.get_patients(doctor_username)

    def register_patient(self, doctor_username: str, patient: PatientRegister):
        return self._repository.add_patient(doctor_username, patient.dict())
