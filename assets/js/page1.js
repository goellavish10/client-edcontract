const courseList = [];
sessionStorage.setItem("courseList", JSON.stringify(courseList));
function addNewCourse(el) {
  const courseName = el.id;
  console.log(courseName);

  const courseObj = {
    courseName: el.innerHTML,
    courseID: el.id
  };

  const courseList = JSON.parse(sessionStorage.getItem("courseList"));

  const isPresent = courseList.find((element) => {
    return element.courseID === el.id ? true : false;
  });

  if (isPresent) {
    alert("Course Already added");
    return;
  }

  sessionStorage.setItem(
    "courseList",
    JSON.stringify([...courseList, courseObj])
  );

  renderNewCourse(courseObj, courseList.length);

  document.getElementById("dropdownBottom").classList.remove("block");
  document.getElementById("dropdownBottom").classList.add("hidden");
  document.getElementById("dropdownBottomButton").click();
}

function renderNewCourse(courseObj, length) {
  const html = `
    <div class="inline-flex items-stretch rounded-md border bg-white" id="${courseObj.courseID}__">
    <p
      class="rounded-l-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
    >
      ${courseObj.courseName}
    </p>

    <div class="relative">
      <button
        type="button"
        class="inline-flex h-full items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        onclick="deleteCourse('${courseObj.courseID}')"
        id="${courseObj.courseID} + "_"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="16.000000pt"
          height="16.000000pt"
          viewBox="0 0 48.000000 48.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M94 379 c-3 -6 22 -39 57 -75 l63 -64 -62 -63 c-49 -49 -60 -65 -50 -75 10 -10 26 1 75 50 l63 62 63 -62 c49 -49 65 -60 75 -50 10 10 -1 26 -50 75 l-62 63 64 65 c51 51 62 67 52 77 -10 10 -26 -1 -77 -52 l-65 -64 -63 62 c-66 65 -72 69 -83 51z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
    `;

  const selectedCoursesDiv = document.getElementById("coursesSelected");
  if (selectedCoursesDiv.classList.contains("text-red")) {
    selectedCoursesDiv.classList.remove("text-red");
  }
  if (length === 0) {
    selectedCoursesDiv.innerHTML = "";
  }
  selectedCoursesDiv.innerHTML += html;
}

function deleteCourse(courseId) {
  const courseList = JSON.parse(sessionStorage.getItem("courseList"));

  const updatedCourseList = courseList.filter((element) => {
    return element.courseID !== courseId ? true : false;
  });

  sessionStorage.setItem("courseList", JSON.stringify(updatedCourseList));

  const courseDiv = document.getElementById(courseId + "__");
  courseDiv.remove();
}

function submitAccessToken() {
  let accessToken = document.getElementById("accessToken").value;
  if (accessToken === "") {
    alert("Please enter access token");
    return;
  }

  const accessTokenBtn = document.getElementById("accessTokenBtn");
  accessTokenBtn.innerHTML = "Loading...";
  accessTokenBtn.disabled = true;

  alert("DEMO SUBMSISSION");
  document.getElementById("accessToken").value = "";
  accessTokenBtn.innerHTML = "Submit";
  accessTokenBtn.disabled = false;
}

function createAccount() {
  console.log(sessionStorage.getItem("courseList"));
  if (JSON.parse(sessionStorage.getItem("courseList")).length === 0) {
    const selectedCoursesDiv = document.getElementById("coursesSelected");
    selectedCoursesDiv.classList.add("text-red-500");
    selectedCoursesDiv.innerHTML = "Please select atleast one course";
    return;
  }

  const selectedCoursesDiv = document.getElementById("coursesSelected");
  selectedCoursesDiv.innerHTML = "API integration pending";
}

function redirectHome() {
  window.location = "/";
}

async function checkAuth() {
  // make a get request to localhost 8000 /api/auth/check/page1 to check if the useer is authorized
  // if not authorized redirect to home page
  const response = await fetch("http://localhost:8000/api/auth/check/page1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    credentials: "include"
  });
  const data = await response.json();
  if (data.success === false && data.redirect === true) {
    window.location = `/${data.msg}.html`;
  } else if (data.success === false) {
    window.location = "/";
  }

  return;
}
