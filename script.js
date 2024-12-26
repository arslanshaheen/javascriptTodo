alert('kfk')

let todoListItemsArr = [];

function saveTask() {
    const TaskInput = document.getElementById('taskItems')
    if (TaskInput.value === '') {
        alert('Please write some words in the input field.');
        
    } else {

    const todoObject = {
        taskId: todoListItemsArr.length + 1,
        taskName: TaskInput.value,
    };
    /////////////
    todoListItemsArr.unshift(todoObject);
    localStorage.setItem('todoList', JSON.stringify(todoListItemsArr));
    TaskInput.value='';
   renderTasks();
    }
    
}

function sortTasks() {
    todoListItemsArr.sort((a, b) => a.taskName.localeCompare(b.taskName));
    renderTasks();
    localStorage.setItem('todoList', JSON.stringify(todoListItemsArr));
}

function renderTasks(filteredTasks = todoListItemsArr) {
document.getElementById('myUlTaskList').innerHTML = ''; 
// for (let i = 0; i < filteredTasks.length; i++) {
//         const dynamicLi = document.createElement('li');
//         dynamicLi.classList.add('task');

//         const myLabel = document.createElement('label');
//         const mypara = document.createElement('p');
//         mypara.textContent = filteredTasks[i].taskName;
//         myLabel.appendChild(mypara);
//         dynamicLi.appendChild(myLabel);

//         const myDiv = document.createElement('div');
//         myDiv.classList.add('settings');
//     //     <!-- <li class="task">
//     //     <label>
//     //         <p>name</p>
//     //     </label>
//     //     <div class="settings">
//     //         <i class="fas fa-trash" aria-hidden="true  onclick="deleteTask(this)"></i>
//     //         <i class="fas fa-pencil-square" aria-hidden="true onclick="editTask(this)"></i>
//     //     </div>
//     // </li> -->
//         // Delete 
//         const deleteIcon = document.createElement('i');
//         deleteIcon.classList.add('fa', 'fa-trash');
//         deleteIcon.setAttribute('data-task-id', filteredTasks[i].taskId); 
//         deleteIcon.addEventListener('click', deleteTask);

    
       
       
       
//         myDiv.appendChild(deleteIcon);
      
//         dynamicLi.append(myDiv);

//      document.getElementById('myUlTaskList').appendChild(dynamicLi);
//     }

filteredTasks.forEach(task => {
    const dynamicLi = document.createElement('li');
    dynamicLi.classList.add('task');

    const input = document.createElement('input');
    input.value = task.taskName;
    input.readOnly = true;  // Make input read-only initially
    dynamicLi.appendChild(input);

    const myDiv = document.createElement('div');
    myDiv.classList.add('settings');

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash");
    deleteIcon.setAttribute('data-task-id', task.taskId);
    deleteIcon.addEventListener('click', deleteTask);

    const editTaskIcon = document.createElement("i");
    editTaskIcon.classList.add("fas", "fa-pencil-square");
    editTaskIcon.setAttribute('data-task-id', task.taskId);
    editTaskIcon.addEventListener('click', () => toggleEditMode(input, task.taskId));

    myDiv.appendChild(deleteIcon);
    myDiv.appendChild(editTaskIcon);
    dynamicLi.append(myDiv);

    document.getElementById('myUlTaskList').appendChild(dynamicLi);
});
           

}


function deleteTask(event) {
    const taskId = parseInt(event.target.getAttribute('data-task-id'));
    todoListItemsArr = todoListItemsArr.filter(item => item.taskId !== taskId);
//     const taskId = event.target.getAttribute('data-task-id'); 
//   const index= todoListItemsArr.filter(items=>items.taskId===taskId)
//   todoListItemsArr.splice(index,1)
  renderTasks()
localStorage.setItem('todoList' ,JSON.stringify(todoListItemsArr))

}




   
function toggleEditMode(input, taskId) {
    if (input.readOnly) {
        input.readOnly = false;
        input.focus();

       
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { 
            input.readOnly = true;
            updateTask(taskId, input.value);
            }
        });
    } else {
    input.readOnly = true;
    const updatedTaskName = input.value;
    updateTask(taskId, updatedTaskName);
    }
    
}


function updateTask(taskId, updatedTaskName) {
  
    const taskIndex = todoListItemsArr.findIndex(task => task.taskId === taskId);
    console.log(todoListItemsArr[taskIndex])
    
    if (taskIndex !== -2) {
        todoListItemsArr[taskIndex].taskName = updatedTaskName;
        localStorage.setItem('todoList', JSON.stringify(todoListItemsArr));
        renderTasks();
    }
}


window.onload = function() {

    const savedTasks = localStorage.getItem('todoList');
    if (savedTasks) {
        todoListItemsArr = JSON.parse(savedTasks);
        renderTasks(); 
    }
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      const profilePicture = document.querySelector('.profile-picture');
      profilePicture.style.backgroundImage = `url(${savedImage})`;
    }
    removeButton();

    
}



function searchTasks() {
    const searchText = document.getElementById('searchInput').value
const filteredTasks = todoListItemsArr.filter(task => 
        task.taskName.includes(searchText) 
    );

    renderTasks(filteredTasks); 

}
function upload() {
    const fileUploadInput = document.querySelector('.file-uploader');
  
    if (!fileUploadInput.files || fileUploadInput.files.length === 0) {
      return alert('Please select a file!');
    }
  
const image = fileUploadInput.files[0];
  
 if (!image.type.includes('image')) {
      return alert('Only images are allowed!');
    }
  
    
    if (image.size > 10_000_000) {
      return alert('Maximum upload size is 10MB!');
    }
  const fileReader = new FileReader();
  
    
    fileReader.onload = (fileReaderEvent) => {
        const imageData = fileReaderEvent.target.result;
      const profilePicture = document.querySelector('.profile-picture');
  
     
      profilePicture.style.backgroundImage = `url(${imageData})`;
           
      localStorage.setItem('profileImage', imageData)
    };

    fileReader.readAsDataURL(image);

;
    
  }

  function removeButton() {
    const fileUploadInput = document.querySelector('.file-uploader');
    const profilePicture = document.querySelector('.profile-picture');
    const removeButton = document.querySelector('.remove-image');

    removeButton.addEventListener('click', () => {
        fileUploadInput.value = ''; 
        profilePicture.style.backgroundImage = ''; 
        localStorage.removeItem('profileImage'); 
        alert('Image has been removed!');
    });
}



const GITHUB_USERNAME = 'arslanshaheen'; 


function ProfilePicture() {
    const githubProfileImage = `https://github.com/${GITHUB_USERNAME}.png`;
    const profilePicture = document.getElementById('github-profile-picture');


profilePicture.src = githubProfileImage;
profilePicture.onerror = () => {
    alert('Unable to load GitHub profile picture.');
};
}

   


document.addEventListener('DOMContentLoaded', ProfilePicture);
//DOMContentLoaded ensure karta hai ke tumhara HTML completely load ho jaye.

