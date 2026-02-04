from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    name: str
    email: str
    department: str
    salary: int

class EmployeeUpdate(BaseModel):
    name: str
    department: str
    salary: int

class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True

