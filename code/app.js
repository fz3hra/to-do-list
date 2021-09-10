const headerDiv = document.querySelector(".header");
const changeValueP = document.querySelector(".changeValue");
const inputId = document.getElementById('inputText');
const deleteDiv = document.querySelector(".delete");
const toDoTaskDiv = document.querySelector(".toDoTask");
const filterDiv = document.querySelector(".filterToDo");
const filterAllP = document.querySelector(".all");
const filterActiveP = document.querySelector(".active");
const filterCompleteP = document.querySelector(".complete");
const filterClear = document.querySelector(".clearCompleted");


// toggling button from night to morning

function toggleBtn(toggle)
{
    // headerDiv.classList.toggle("styling");
    
    toggle.classList.toggle("fa-sun")

    console.log("pressing")
}

// adding task
inputText.addEventListener("keyup", (event)=>
{
    // when enter is press, thne text should change in p tag.

    if (event.keyCode === 13)
    {
        changetext();
        // toSave();
        inputId.value = "";
        
    }
    
})

function changetext(event)
{
    //prevent form from submitting
    // event.preventDefault();

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    //creating p
    const p = document.createElement("p")
    p.innerText = inputId.value;
    p.classList.add('changeValue');
    taskDiv.appendChild(p);
    //adding todotasks to local storage
    saveLocalTodos(inputId.value)
    //completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = `<i class="fas fa-check"></i>`;
    completeButton.classList.add("complete");
    taskDiv.appendChild(completeButton);

    //creating trash button
    const trash = document.createElement('button');
    trash.innerHTML = `<i class="fas fa-trash"></i>`;
    trash.classList.add("delete");
    taskDiv.appendChild(trash);

    //clear completed task
    const compTaskButton = document.createElement("button");

    //appending new div to ouur alrady created div todotask
    toDoTaskDiv.appendChild(taskDiv);

    compTaskButton.innerHTML = "";
}


// deleting text added to toDoList. 
// $(document).ready(function(){
//     $(".fa-trash").click(function(){
//         $(".task p").remove();
//     })
// })
toDoTaskDiv.addEventListener('click', deleteCheck);

function deleteCheck(e)
{
    const item = e.target;
    
    if(item.classList[0] === 'delete')
    {
        const taskDelete = item.parentElement;
        removeLocalTodos(item)
        taskDelete.remove();
    }
}

// click on circle to say task has been completed

toDoTaskDiv.addEventListener('click', completeCheck);

function completeCheck(e)
{
    const checkItem = e.target;

    if(checkItem.classList[0] === 'complete')
    {
        const task = checkItem.parentElement;
        task.classList.toggle("completed");
    }
}



//show  number of items not yet completed.

const toDoTaskId = document.getElementById("toDoTask");
toDoTaskId.style.display = "block"

filterDiv.addEventListener('click', filterTask);
//show all items
function filterTask(e)
{
    if(e.target === filterAllP)
    {
        // document.getElementById("toDoTask").style.display = "block";
        document.querySelectorAll(".task").forEach(todo => {
            todo.style.display = "block"
        })
    }
    //show only active items

    else if (e.target === filterActiveP)
    {
        document.querySelectorAll(".completed").forEach(todo => {
            todo.style.display = "none"
        })
        console.log("working")
    }
    //clear button

    else if (e.target === filterClear)
    {
        document.querySelectorAll(".task").forEach(todo => {
            todo.remove();
        })
    }
    //show completed items

    else
    {
        document.querySelectorAll(".task").forEach(todo => {
            todo.style.display = "block"
            if(!todo.classList.contains("completed"))
            {
                todo.style.display = "none";
            }
        })
    }
}



function saveLocalTodos(todo)
{
    //check to see if we arleady have todos
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = []

    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getTodos);

function getTodos()
{
    //check to see if we arleady have todos
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = []
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        //creating p
        const p = document.createElement("p")
        p.innerText = todo;
        p.classList.add('changeValue');
        taskDiv.appendChild(p);
        
        //completed button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = `<i class="fas fa-check"></i>`;
        completeButton.classList.add("complete");
        taskDiv.appendChild(completeButton);

        //creating trash button
        const trash = document.createElement('button');
        trash.innerHTML = `<i class="fas fa-trash"></i>`;
        trash.classList.add("delete");
        taskDiv.appendChild(trash);

        //clear completed task
        const compTaskButton = document.createElement("button");

        //appending new div to ouur alrady created div todotask
        toDoTaskDiv.appendChild(taskDiv);
    })
}

function removeLocalTodos(todo)
{
    let todos;
    if (localStorage.getItem('todos') === null)
    {
        todos = []
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    // console.log(todo.children[0].innerText);
    console.log("working")
}