let tasks =[];
let taskList = document.getElementById("taskList");

function updateTask(){
    let count = document.querySelectorAll("#taskList li").length;
    let countTask = document.getElementById("countTask");
    countTask.innerText = count;
}

function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(taskText){
    let li = document.createElement("li");
    li.innerText = taskText;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Xoa";
    deleteBtn.onclick = () =>{
        li.remove();
        tasks = tasks.filter(
            task => task !== taskText);
        saveTask();
        updateTask();
    }
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function addTask(){
    let inputTask = document.getElementById("inputTask");
    let inputValue = inputTask.value;
    if(inputValue == ""){
        alert("Hay nhap noi dung!");
        return;
    }
    createTask(inputValue);
    tasks.push(inputValue);
    saveTask();
    inputTask.value = "";
    updateTask(); 
}

document.addEventListener(
    "keydown", (event) =>{
        if(event.key === "Enter"){
            addTask();
        }
    }
)

let savedTask = JSON.parse(
    localStorage.getItem("tasks")
)
if(savedTask){
    tasks = savedTask;
    for(let i=0; i < tasks.length; i++){
        createTask(tasks[i]);
    }
    updateTask();
}