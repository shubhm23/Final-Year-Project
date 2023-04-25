from botocore.exceptions import ClientError
from boto3.resources.base import ServiceResource
from fastapi import HTTPException
from passlib import hash
from uuid import uuid4
from crypto import encrypt_image, decrypt_image


class PatientRepository:
    def __init__(self, db: ServiceResource) -> None:
        self._db = db

    def get_patients(self, doctor_username: str):
        try:
            table = self._db.Table("PatientInformation")
            response = table.get_item(Key={"doctor_username": doctor_username})
            return response.get("Item")
        except ClientError as e:
            raise ValueError(e.response["Error"]["Message"])

    def add_patient(self, doctor_username: str, patient: dict):
        table = self._db.Table("PatientInformation")
        response = table.put_item(
            Item={
                "id": str(uuid4()),
                "doctor_username": doctor_username,
                "fullname": patient["fullname"],
                "dob": patient["dob"],
                "gender": patient["gender"],
                "address": patient["address"],
                "uploaded_image": encrypt_image(patient["uploaded_image_url"]),
                "scanned_image": "",
            }
        )
        return response
