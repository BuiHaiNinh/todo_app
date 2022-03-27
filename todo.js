const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const storage_key = "todo_app_key";
const taskList = $(".task-list");
const inputBox = $(".new-task-form input");
const addBtn = $(".new-task-form button");

inputBox.onkeyup = () => {
    let enteredValue = inputBox.value;
    //check empty input
    if (enteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
};
render();

// ADD Task
addBtn.onclick = () => {
    let enteredValue = inputBox.value;

    let getLocalStorageData = localStorage.getItem(storage_key);
    if (getLocalStorageData == null) {
        tasksArray = [];
    } else {
        tasksArray = JSON.parse(getLocalStorageData);
    }

    tasksArray.push(enteredValue);
    //save to local storage
    localStorage.setItem(storage_key, JSON.stringify(tasksArray));
    render();
    addBtn.classList.remove("active");
};

function render() {
    let getLocalStorageData = localStorage.getItem(storage_key);
    if (getLocalStorageData == null) {
        tasksArray = [];
    } else {
        tasksArray = JSON.parse(getLocalStorageData);
    }

    let newTaskList = "";
    tasksArray.forEach((task, index) => {
        newTaskList += `
            <li class="task" >
                <p>Task: ${index}</p>
                <input class="task-content-input-${index}" readonly value="${task}" />
                <div class="actions">
                    <button class="btn-edit-${index}" onclick="editTask(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
                    <button class="btn-view" onclick="viewTask(${index})">View</button>
                </div>
            </li>
        `;
    });
    taskList.innerHTML = newTaskList;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem(storage_key);
    tasksArray = JSON.parse(getLocalStorageData);
    tasksArray.splice(index,1);
    localStorage.setItem(storage_key, JSON.stringify(tasksArray));
    render()
}

function editTask(index) {
    let getLocalStorageData = localStorage.getItem(storage_key);
    tasksArray = JSON.parse(getLocalStorageData);

    // find the task need to be edited
    let editBtn = $(".btn-edit-" + index);
    let inputBox = $(".task-content-input-" + index);
    // Edit and save
    if (editBtn.innerText.toLowerCase() == "edit") {
        editBtn.innerText = "Save";
        inputBox.removeAttribute("readonly");
        inputBox.focus();
    } else {
        editBtn.innerText = "Edit";
        let enteredVal = inputBox.value;
        tasksArray[index] = enteredVal;
        localStorage.setItem(storage_key, JSON.stringify(tasksArray));
        inputBox.setAttribute("readonly", "readonly");
    }
}

function viewTask(index) {
    let inputBox = $(".task-content-input-" + index);

    alert(inputBox.value);
}