from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import employee

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Management System")

# ✅ CORS MUST be added BEFORE routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],   # allows OPTIONS automatically
    allow_headers=["*"],
)

# ✅ include router AFTER CORS
app.include_router(employee.router, prefix="/employees", tags=["Employees"])
