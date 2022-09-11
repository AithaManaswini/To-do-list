//selectors
const todotask=document.querySelector('.todo-task');
const todobutton=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');
const filteroption=document.querySelector('.filter-todos');
const scorecard=document.querySelector("header-container");

//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todobutton.addEventListener("click",addtodoitem);
todolist.addEventListener('click',deletecheck);
filteroption.addEventListener('change',filtertodo);

//functions

function addtodoitem(event){
    //prevents natural behaviour
    event.preventDefault();

    //create Todo Div 
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo=document.createElement("li");
    newTodo.innerText=todotask.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add to do item to local storage
    saveLocaltodos(todotask.value);

    //completed button
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);

    //trash button

    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    //append to list
    todolist.appendChild(todoDiv);

    //clear input
    todotask.value="";
}

function deletecheck(e){

    const item=e.target; /* find out which element is clicked on the div,tick or del */
    //delete
    if(item.classList[0]=="trash-btn"){
        //to get parent element of item
        const todo=item.parentElement;
        todo.classList.add("fall");
        //remove from local storage
        removelocaltodos(todo);
       //wait till transition ends and then remove
        todo.addEventListener('transitionend',function(){
             todo.remove();
        })
    }

    //check mark
    if(item.classList[0]=="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        removelocaltodos(todo);
        /*let score=0;
        if(localStorage.getItem('score')==null){
            score=0;
        }
        else{
            score=localStorage.getItem('score');
            
        }
        score+=1;
        console.log(score);
        localStorage.setItem("score",score);
        const todoscore=document.createElement("div");
        todoscore.classList.add("todoscore");
        todoscore.innerText=score;
        scorecard.appendChild(todoscore);*/
        
    }
}
 
function filtertodo(e){
    const todos=todolist.childNodes; //access all the childnodes of todolist
    todos.forEach(function(todo){
        console.log(e.target.value);
        switch(e.target.value){
            case "All":
                todo.style.display='flex';
                break;
            case "Completed":
                if(todo.classList.contains("completed")){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none'
                }
                break;
            case "Uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none'
                }
                break;

        }
    });
  
}

function saveLocaltodos(todo){
    let todos;
    //check if already local storage exists
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    } 
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    //here we get all previous tasks and display them
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    } 
    todos.forEach(function(todo){
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo=document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

    
        //completed button
        const completedbutton=document.createElement('button');
        completedbutton.innerHTML='<i class="fas fa-check"></i>';
        completedbutton.classList.add("complete-btn");
        todoDiv.appendChild(completedbutton);

        //trash button

        const trashbutton=document.createElement('button');
        trashbutton.innerHTML='<i class="fas fa-trash"></i>';
        trashbutton.classList.add("trash-btn");
        todoDiv.appendChild(trashbutton);

        //append to list
        todolist.appendChild(todoDiv);

    })
}

//remove from local storage
function removelocaltodos(todo){
    let todos=JSON.parse(localStorage.getItem("todos"));
    const todelete=todo.children[0].innerText;
    const indexx=todos.indexOf(todelete);
    todos.splice(indexx,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    //splice removes/adds element at given index

}

f