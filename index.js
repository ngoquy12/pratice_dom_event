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

// elements = 10
// page 1: 0, 5
// page 2: 6, 10

// Phạm vi truy xuất cac phần tử trong DOM
const tbodyElement = document.querySelector("#tbody");
const formElement = document.querySelector("#form");
const btnShowFormElement = document.querySelector("#btnShowForm");
const btnCloseElement = document.querySelector("#btnClose");
const btnPagesElement = document.querySelector("#btnPages");
const btnPrevElement = document.querySelector("#btnPrev");
const btnNextElement = document.querySelector("#btnNext");

// Tạo các biến toàn cục
let curentPage = 1;
const totalPerpage = 3;

// Tổng số trang
const totalPage = Math.ceil(students.length / totalPerpage);

// Hàm render danh sách các nút
const renderPages = () => {
  // Clear kết quả của lần render trước đấy
  btnPagesElement.textContent = "";

  // Hiển thị ra từng nút
  for (let i = 1; i <= totalPage; i++) {
    // Tạo từng button
    const btnElement = document.createElement("button");

    // Gán tiêu đề cho button
    btnElement.textContent = i;

    // Kiểm tra button nào đang được active
    if (curentPage === i) {
      btnElement.classList.add("btn-active");
    }

    // Disable đi nút prev khi trang hiện tại là 1
    if (curentPage === 1) {
      document.querySelector("#btnPrev").setAttribute("disabled", "disabled");
    } else {
      document.querySelector("#btnPrev").removeAttribute("disabled");
    }

    // Disable đi nút next khi trang hiện tại = với tổng số trang
    if (curentPage === totalPage) {
      document.querySelector("#btnNext").setAttribute("disabled", "disabled");
    } else {
      document.querySelector("#btnNext").removeAttribute("disabled");
    }

    // Lắng nghe sự kiện khi click vào từng nút
    btnElement.addEventListener("click", function () {
      // Gán lại vị trí của button
      curentPage = i;

      renderPages();

      // Gọi hàm renderData để cập nhật lại giao diện
      renderData();
    });

    // Gán từng button vào id btnPages
    btnPagesElement.appendChild(btnElement);
  }
};

// Lắng nghe sự kiện click vào nút next
btnNextElement.addEventListener("click", function () {
  // Xác định điều kiện dừng khi tăng hiện tại lên 1
  if (curentPage < totalPage) {
    curentPage++;

    renderPages();

    // Gọi hàm renderData để cập nhật lại giao diện
    renderData();
  }
});

// Lắng nghe sự kiện click vào nút prev
btnPrevElement.addEventListener("click", function () {
  // Xác định điều kiện dừng khi giảm hiện tại lên 1
  if (curentPage > 1) {
    curentPage--;

    renderPages();

    // Gọi hàm renderData để cập nhật lại giao diện
    renderData();
  }
});

renderPages();

// Hàm định dạng thời gian
function formatDate(time) {
  const today = new Date(time);

  //   Lấy ra ngày
  let day = today.getDate();
  if (day > 0 && day < 10) day = `0${day}`;

  //   Lấy ra tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) month = `0${month}`;

  //   Lấy ra năm
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

function renderData() {
  // Vị trí bắt đầu lấy
  const getStartIndex = (curentPage - 1) * totalPerpage;

  // Vị trí kết thúc
  const getEndIndex = totalPerpage * curentPage;

  // Lấy ra khoảng vị trí của các phần tử trong mảng
  const studentSlices = students.slice(getStartIndex, getEndIndex);

  const htmls = studentSlices.map((student, index) => {
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

// Hàm làm rỗng tất cả các giá trị trong input
function handleReseForm() {
  document.querySelector("#studentName").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#dateBirth").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#address").value = "";
}

const handleAddStudent = () => {
  // Lấy dữ liệu từ Form
  const studentNameValue = document.querySelector("#studentName").value;
  const gendervalue = document.querySelector("#gender").value;
  const dateBirthvalue = document.querySelector("#dateBirth").value;
  const emailvalue = document.querySelector("#email").value;
  const addressvalue = document.querySelector("#address").value;
  // Validate dữ liệu
  // Thêm dữ liệu vào mảng
  const newStudent = {
    id: Math.ceil(Math.random() * 10000),
    studentName: studentNameValue,
    gender: +gendervalue,
    dateBirth: formatDate(dateBirthvalue),
    email: emailvalue,
    address: addressvalue,
  };

  students.push(newStudent);

  // Đóng Form
  handleCloseForm();

  //   Reset form
  handleReseForm();

  // Reder lại dữ liệu  mới nhất cho giao diện
  renderData();
};

// Gọi sự kiện Submit form
formElement.addEventListener("submit", function (event) {
  // Ngăn chặn sự kiện load lại trang
  event.preventDefault();

  handleAddStudent();
});

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
