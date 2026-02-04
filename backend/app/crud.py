from sqlalchemy.orm import Session
from app import models, schemas

def create_employee(db: Session, emp: schemas.EmployeeCreate):
    employee = models.Employee(**emp.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_employees(db: Session):
    return db.query(models.Employee).all()

def update_employee(db: Session, emp_id: int, emp: schemas.EmployeeUpdate):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if employee:
        employee.name = emp.name
        employee.department = emp.department
        employee.salary = emp.salary
        db.commit()
    return employee

def delete_employee(db: Session, emp_id: int):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if employee:
        db.delete(employee)
        db.commit()
    return employee
