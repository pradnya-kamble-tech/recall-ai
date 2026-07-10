import os
import uuid
import shutil
from fastapi import UploadFile

from .schemas import UploadResponse

UPLOAD_DIR = "uploads"


def save_uploaded_file(file: UploadFile) -> UploadResponse:
    # Create uploads folder if it doesn't exist
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Generate unique id
    memory_id = str(uuid.uuid4())

    # Keep original extension
    extension = os.path.splitext(file.filename)[1]

    filename = f"{memory_id}{extension}"

    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return UploadResponse(
        id=memory_id,
        filename=filename,
        status="uploaded"
    )


def get_documents():
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    documents = []

    for filename in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, filename)

        if not os.path.isfile(file_path):
            continue

        memory_id = os.path.splitext(filename)[0]

        documents.append(
            {
                "id": memory_id,
                "title": filename,
                "summary": "Uploaded PDF document",
                "owner": "You",
                "date": "Today",
            }
        )

    return documents


def get_document(document_id: str):
    documents = get_documents()

    for doc in documents:
        if doc["id"] == document_id:
            return {
                **doc,
                "transcript": "This is the transcript of the uploaded document.",
                "tags": ["PDF", "Document", "RecallAI"],
            }

    return None