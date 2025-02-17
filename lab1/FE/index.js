function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const submitButton = document.querySelector('button[type="submit"].btn-primary');
submitButton.addEventListener("click", createEmployee);

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener("click", function(event){
  if (event.target.classList.contains('btn-danger')){
    deleteEmployee(event)
  }
});

// TODO
function createEmployee (){
  // get data from input field
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const data = {id,name};

  // send data to BE
  fetch(`http://localhost:3000/api/v1/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
    // call fetchEmployees
      fetchEmployees(); 
    })
    .catch(error => console.error(error))
}

// TODO
function deleteEmployee (event){
  // get id
  const id = event.target.parentElement.parentElement.cells[0].textContent;

  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
    // call fetchEmployees
      fetchEmployees(); 
    })
    .catch(error => console.error(error))
}

fetchEmployees()
