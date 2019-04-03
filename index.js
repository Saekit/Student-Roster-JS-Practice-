/*  json-server --watch db.json --port 3001 */
document.addEventListener("DOMContentLoaded", function(){
  getStudents();
  form();
  removeStudent();
})
function getStudents(){
  fetch("http://localhost:3001/students")
  .then(res=>res.json())
  .then(list => {
    list.forEach((student)=>loadStudent(student))
  })
}

function loadStudent(student){
  let li = document.createElement("li")
  li.innerHTML = `${student.first_name} ${student.last_name}`
  let list = document.querySelector(".student-list")
  li.dataset.id = student.id
  list.append(li)
}

function form(){
  let formDiv = document.querySelector(".form-div")
  let form = document.createElement("form")
  form.className = "form"
  form.innerHTML = `First name: <input type="text" placeholder="First name" name="fname" class="fname" />
  <br/>
  Last name: <input type="text" placeholder="Last name" name="lname" class="lname"/>
  <br/>
  <input type="submit" value="Submit" />`
  formDiv.append(form)
  let fname = document.querySelector(".fname")
  let lname = document.querySelector(".lname")
  form.addEventListener("submit", e => (addStudent(e, fname, lname)))
}

function addStudent(e, fname, lname){
  e.preventDefault()

  fetch("http://localhost:3001/students", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "first_name": fname.value,
      "last_name": lname.value
    })
  }).then(res=>res.json())
    .then(student => console.log(student))
}

function removeStudent() {
  let list = document.querySelector(".student-list")

  list.addEventListener("click", e => {
    e.preventDefault()
    let id = e.target.dataset.id
    console.log(e.target)
    fetch(`http://localhost:3001/students/${id}`, {
      method: "DELETE"
    })
  }).then(e.target.remove())
}
