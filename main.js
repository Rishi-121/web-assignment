const form = document.getElementById("form");

let employeeId = document.getElementById("eid");
let employeeName = document.getElementById("ename");
let email = document.getElementById("email");
let department = document.getElementById("dept");

form.addEventListener("submit", function () {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  const formData = handleFormData();

  const employeeData = {
    employeeId: formData["employeeId"],
    employeeName: formData["employeeName"],
    email: formData["email"],
    department: formData["department"],
  };

  employees.push(employeeData);
  localStorage.setItem("employees", JSON.stringify(employees));

  $("#exampleModal").modal("hide");
});

function handleFormData() {
  return {
    employeeId: employeeId.value,
    employeeName: employeeName.value,
    email: email.value,
    department: department.value,
  };
}

function setTableData() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  const tbody = document
    .getElementById("employeeTable")
    .getElementsByTagName("tbody")[0];

  for (let i in employees) {
    let newRow = tbody.insertRow(tbody.length);

    let cell2 = newRow.insertCell(0);
    cell2.innerHTML = employees[i].employeeId;

    let cell3 = newRow.insertCell(1);
    cell3.innerHTML = employees[i].employeeName;

    let cell4 = newRow.insertCell(2);
    cell4.innerHTML = employees[i].email;

    let cell5 = newRow.insertCell(3);
    cell5.innerHTML = employees[i].department;

    let cell6 = newRow.insertCell(4);
    cell6.innerHTML = `
        <div class="btn-group">
            <button class="btn btn-info" onclick="editAction(${i});">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button class="btn btn-danger" onclick="deleteAction(${i});">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    `;
  }
}

setTableData();

function editAction(i) {
  $("#exampleModal").modal("show");

  let employees = JSON.parse(localStorage.getItem("employees"));

  let employee = employees.filter((item, index) => {
    if (index === i) return item;
  });

  employeeId.value = employee[0]["employeeId"];
  employeeName.value = employee[0]["employeeName"];
  email.value = employee[0]["email"];
  department.value = employee[0]["department"];

  form.addEventListener("submit", function () {
    const formData = handleFormData();

    employee[0]["employeeId"] = formData["employeeId"];
    employee[0]["employeeName"] = formData["employeeName"];
    employee[0]["email"] = formData["email"];
    employee[0]["department"] = formData["department"];

    localStorage.setItem("employees", JSON.stringify(employees));

    $("#exampleModal").modal("hide");
  });
}

// This event is fired immediately when the hide instance method has been called.
$("#exampleModal").on("hidden.bs.modal", function () {
  employeeId.value = "";
  employeeName.value = "";
  email.value = "";
  department.value = "";
});

function deleteAction(i) {
  let employees = JSON.parse(localStorage.getItem("employees"));

  employees = employees.filter((item, index) => {
    if (index !== i) return item;
  });

  localStorage.setItem("employees", JSON.stringify(employees));

  window.location.reload();
}
