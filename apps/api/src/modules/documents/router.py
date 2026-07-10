from fastapi import APIRouter, UploadFile, File
from typing import List

from .service import (
    save_uploaded_file,
    get_documents,
    get_document,
)

from .schemas import (
    UploadResponse,
    DocumentListItem,
    DocumentDetail,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    return save_uploaded_file(file)


@router.get("", response_model=List[DocumentListItem])
async def list_documents():
    return get_documents()


@router.get("/{document_id}", response_model=DocumentDetail)
async def get_document_by_id(document_id: str):
    return get_document(document_id)