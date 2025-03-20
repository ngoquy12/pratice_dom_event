const students = [
  {
    id: 1,
    studentName: "David",
    gender: 0,
    dateBirth: "20/12/2002",
    email: "david@gmail.com",
    address: "London",
  },
  {
    id: 2,
    studentName: "Alice",
    gender: 2,
    dateBirth: "15/05/2001",
    email: "alice@gmail.com",
    address: "New York",
  },
  {
    id: 3,
    studentName: "Bob",
    gender: 0,
    dateBirth: "10/08/2000",
    email: "bob@gmail.com",
    address: "Sydney",
  },
  {
    id: 4,
    studentName: "Emma",
    gender: 1,
    dateBirth: "25/03/2003",
    email: "emma@gmail.com",
    address: "Paris",
  },
  {
    id: 5,
    studentName: "Charlie",
    gender: 2,
    dateBirth: "12/11/2004",
    email: "charlie@gmail.com",
    address: "Berlin",
  },
  {
    id: 6,
    studentName: "Sophia",
    gender: 1,
    dateBirth: "05/07/1999",
    email: "sophia@gmail.com",
    address: "Tokyo",
  },
  {
    id: 7,
    studentName: "Jack",
    gender: 0,
    dateBirth: "30/09/2002",
    email: "jack@gmail.com",
    address: "Toronto",
  },
  {
    id: 8,
    studentName: "Olivia",
    gender: 1,
    dateBirth: "18/06/2000",
    email: "olivia@gmail.com",
    address: "Los Angeles",
  },
  {
    id: 9,
    studentName: "William",
    gender: 0,
    dateBirth: "03/02/1998",
    email: "william@gmail.com",
    address: "Singapore",
  },
  {
    id: 10,
    studentName: "Mia",
    gender: 1,
    dateBirth: "09/04/2003",
    email: "mia@gmail.com",
    address: "Seoul",
  },
];

// Phạm vi truy xuất cac phần tử trong DOM
const tbodyElement = document.querySelector("#tbody");
const formElement = document.querySelector("#form");
const btnShowFormElement = document.querySelector("#btnShowForm");
const btnCloseElement = document.querySelector("#btnClose");

function renderData() {
  const htmls = students.map((student, index) => {
    return `
            <tr>
              <td>${index + 1}</td>
              <td>${student.studentName}</td>
              <td>${
                student.gender === 0
                  ? "Male"
                  : student.gender === 1
                  ? "Female"
                  : "Other"
              }</td>
              <td>${student.dateBirth}</td>
              <td>${student.email}</td>
              <td>${student.address}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button onclick="handleDelete(${index})">Delete</button>
              </td>
            </tr>
        `;
  });

  // Chuyển đổi mảng thành chuỗi
  const convertArrayToString = htmls.join("");

  // Append chuỗi HTML vào trong DOM
  tbodyElement.innerHTML = convertArrayToString;
}

// Hàm xóa sinh viên theo id
function handleDelete(index) {
  const confrimDelete = confirm(
    "Bạn có chắc chắn muốn xóa sinh viên này không?"
  );

  if (confrimDelete) {
    // Tiến hành xóa
    students.splice(index, 1);

    // Gọi hàm renderData để cập nhật lại dữ liệu mới nhất
    renderData();
  }
}

const handleAddStudent = () => {
  // Lấy dữ liệu từ Form
  // Validate dữ liệu
  // Thêm dữ liệu vào mảng
  // Đóng Form
  // Reder lại dữ liệu  mới nhất cho giao diện
};

// Hàm mở form
function handleShowForm() {
  formElement.style.display = "block";
}

// Hàm đóng form
function handleCloseForm() {
  formElement.style.display = "none";
}

// Mở form quản lý sinh viên
btnShowFormElement.addEventListener("click", handleShowForm);

// Đóng form khi click vào nút Close
btnCloseElement.addEventListener("click", handleCloseForm);

renderData();
