from fastapi import APIRouter, HTTPException

from service.patients import PatientRegister, PatientService


class PatientRouter:
    def __init__(self, patients_service: PatientService) -> None:
        self._patients_service = patients_service

    @property
    def router(self):
        api_router = APIRouter(prefix="/patient", tags=["patients"])

        @api_router.get("/get-patients")
        def get_patients(doctor_username: str):
            return self._patients_service.get_patients(doctor_username)

        @api_router.post("/register")
        def add_user(doctor_username: str, patient: PatientRegister):
            return self._patients_service.register_patient(doctor_username, patient)

        return api_router
