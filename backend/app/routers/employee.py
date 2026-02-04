from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.EmployeeResponse)
def create(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, emp)

@router.get("/")
def read(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@router.put("/{emp_id}")
def update(emp_id: int, emp: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    employee = crud.update_employee(db, emp_id, emp)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.delete("/{emp_id}")
def delete(emp_id: int, db: Session = Depends(get_db)):
    employee = crud.delete_employee(db, emp_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Deleted successfully"}
