from pydantic import BaseModel


class UploadResponse(BaseModel):
    id: str
    filename: str
    status: str

class DocumentListItem(BaseModel):
    id: str
    title: str
    summary: str
    owner: str
    date: str

class DocumentDetail(BaseModel):
    id: str
    title: str
    summary: str
    owner: str
    date: str
    transcript: str
    tags: list[str]    