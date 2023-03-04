from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

class Spacecraft(BaseModel):
    id: int
    name: str


spacecrafts = [
    {"id": 1, "name": "Crew Dragon"},
    {"id": 2, "name": "Starliner"},
    {"id": 3, "name": "Falcon 9"},
    {"id": 4, "name": "Falcon Heavy"},
    {"id": 5, "name": "Dragon"}
]

@router.get("/api/spacecrafts", tags=["Spacecrafts"], response_model=list[Spacecraft])
def get_spacecrafts():
    return spacecrafts


@router.get("/api/spacecrafts/{spacecraft_id}", tags=["Spacecrafts"], response_model=Spacecraft)
def get_spacecraft(spacecraft_id: int, show_id: str | None = Query("Default", min_length=2, max_length=50)):
    for spacecraft in spacecrafts:
        if spacecraft["id"] == spacecraft_id:
            if show_id != "Default":
                return {"name": spacecraft["name"]}
            return spacecraft

 
@router.post("/api/spacecrafts", tags=["Spacecrafts"], response_model=Spacecraft)
def add_spacecraft(spacecraft: Spacecraft):
    print(spacecraft)
    spacecrafts.append(spacecraft)
    return spacecraft
