// Get form and table elements
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const tableBody = document.getElementById("studentTableBody");

let editIndex = null; // Track if editing
let students = JSON.parse(localStorage.getItem("students")) || [];

// Load students from localStorage
window.onload = function () {
  renderTable();
};

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate input
  const name = nameInput.value.trim();
  const studentId = studentIdInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  if (!name || !studentId || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert("Student ID must be numbers only.");
    return;
  }

  if (!/^\d{10}$/.test(contact)) {
    alert("Contact must be a valid 10-digit number.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email address.");
    return;
  }

  const student = { name, studentId, email, contact };

  if (editIndex === null) {
    students.push(student); // Add new
  } else {
    students[editIndex] = student; // Update existing
    editIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
});

// Render Table
function renderTable() {
  tableBody.innerHTML = "";

  if (students.length > 5) {
    document.getElementById("studentListContainer").style.maxHeight = "300px";
    document.getElementById("studentListContainer").style.overflowY = "auto";
  }

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Edit function
function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  studentIdInput.value = student.studentId;
  emailInput.value = student.email;
  contactInput.value = student.contact;
  editIndex = index;
}

// Delete function
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}
// Get DOM elements
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const tableBody = document.getElementById("studentTableBody");

let editIndex = null; // To track which record is being edited
let students = JSON.parse(localStorage.getItem("students")) || [];

// Load saved student records on page load
window.onload = function () {
  renderTable();
};

// Form submission logic
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get and trim input values
  const name = nameInput.value.trim();
  const studentId = studentIdInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  // Field validations
  if (!name || !studentId || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert("Student ID must be numeric.");
    return;
  }

  if (!/^\d{10}$/.test(contact)) {
    alert("Contact must be a valid 10-digit number.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email format.");
    return;
  }

  const student = { name, studentId, email, contact };

  if (editIndex === null) {
    students.push(student); // Add new student
  } else {
    students[editIndex] = student; // Update existing student
    editIndex = null;
  }

  // Save to localStorage and refresh UI
  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
});

// Render the student table
function renderTable() {
  tableBody.innerHTML = "";

  // Enable vertical scrollbar if needed
  if (students.length > 5) {
    document.getElementById("studentListContainer").style.maxHeight = "300px";
    document.getElementById("studentListContainer").style.overflowY = "auto";
  }

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Edit existing student
function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  studentIdInput.value = student.studentId;
  emailInput.value = student.email;
  contactInput.value = student.contact;
  editIndex = index;
}

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}
