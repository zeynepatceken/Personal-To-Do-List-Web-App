// Sayfa tamamen yüklendiğinde daha önce kaydedilen görevleri yükle
document.addEventListener('DOMContentLoaded', loadTasks);

// "Add Task" butonuna tıklandığında yeni görev ekleme
const addTaskButton = document.getElementById('add-task');
addTaskButton.addEventListener('click', addTask);

// Görev ekleme fonksiyonu
function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim(); // Boşlukları temizle

  // Boş bir görev eklenmesini önle
  if (taskText === '') {
    alert('Lütfen bir görev girin.');
    return;
  }

  // Yeni bir görev elementi oluştur
  const li = document.createElement('li');
  li.textContent = taskText;

  // Silme butonunu ekle
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Sil';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', deleteTask);

  // Silme butonunu görev öğesine ekle
  li.appendChild(deleteButton);

  // Görev tamamlandığında üzerine tıklayarak işaretleme
  li.addEventListener('click', function(e) {
    if (e.target !== deleteButton) { // Eğer silme butonuna değilse
      li.classList.toggle('completed');
    }
  });

  // Görev listesini al ve görevi ekle
  const taskList = document.getElementById('task-list');
  taskList.appendChild(li);

  // Görevi localStorage'a kaydet
  saveTask(taskText);

  // Giriş alanını temizle
  taskInput.value = '';
}

// Görev silme fonksiyonu
function deleteTask(e) {
  const taskItem = e.target.parentElement; // Butonun ebeveyni (görev elementi)
  const taskText = taskItem.firstChild.textContent.trim(); // Görev metnini al

  // Görevi DOM'dan sil
  taskItem.remove();

  // Görevi localStorage'dan sil
  removeTaskFromStorage(taskText);
}

// Görevleri localStorage'a kaydetme
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// localStorage'dan görevleri yükleme
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Sil';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(deleteButton);

    li.addEventListener('click', function(e) {
      if (e.target !== deleteButton) {
        li.classList.toggle('completed');
      }
    });

    const taskList = document.getElementById('task-list');
    taskList.appendChild(li);
  });
}

// Görevi localStorage'dan silme
function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
