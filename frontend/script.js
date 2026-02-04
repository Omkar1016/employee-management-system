const API_URL = "http://127.0.0.1:8000/employees/";

// Cache DOM elements (IMPORTANT)
const empIdInput = document.getElementById("empId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");

// Load employees on page load
window.onload = loadEmployees;

// ================= READ =================
function loadEmployees() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("employeeTable");
      table.innerHTML = "";

      data.forEach(emp => {
        table.innerHTML += `
          <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
              <button class="edit"
                onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}', ${emp.salary})">
                Edit
              </button>
              <button class="delete" onclick="deleteEmployee(${emp.id})">
                Delete
              </button>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Load error:", err));
}

// ================= CREATE =================
function addEmployee() {
  if (
    !nameInput.value ||
    !emailInput.value ||
    !departmentInput.value ||
    !salaryInput.value
  ) {
    alert("All fields are required");
    return;
  }

  const employee = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    department: departmentInput.value.trim(),
    salary: parseInt(salaryInput.value, 10)
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Failed to create employee");
        return;
      }
      resetForm();
      loadEmployees();
    })
    .catch(err => console.error("Create error:", err));
}

// ================= UPDATE =================
function updateEmployee() {
  const id = empIdInput.value;

  if (!id) {
    alert("Select an employee to update");
    return;
  }

  if (!nameInput.value || !departmentInput.value || !salaryInput.value) {
    alert("Name, Department and Salary are required");
    return;
  }

  const employee = {
    name: nameInput.value.trim(),
    department: departmentInput.value.trim(),
    salary: parseInt(salaryInput.value, 10)
  };

  fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(async res => {
      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Update failed");
        return;
      }
      resetForm();
      loadEmployees();
    })
    .catch(err => console.error("Update error:", err));
}

// ================= DELETE =================
function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;

  fetch(`${API_URL}${id}`, {
    method: "DELETE"
  })
    .then(() => loadEmployees())
    .catch(err => console.error("Delete error:", err));
}

// ================= EDIT =================
function editEmployee(id, name, email, department, salary) {
  empIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
  departmentInput.value = department;
  salaryInput.value = salary;
}

// ================= RESET =================
function resetForm() {
  empIdInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  departmentInput.value = "";
  salaryInput.value = "";
}
