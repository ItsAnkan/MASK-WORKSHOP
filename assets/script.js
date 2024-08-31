let todoList = [];

const addTodoButton = document.getElementById("add-todo");

function toggleBurger() {
	document.getElementById('burger').classList.toggle('open');
}

async function addTodo() {
	const text = document.getElementById('input').value;
	if (text === '') return alert('No text given');
	document.getElementById('input').value = '';
	const res = await fetch('http://localhost:6969/create-task', {
		method : 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text })
	});
	if (res.ok) {
		todoList.push(await res.json())
	}
	render();
}

async function toggleTodo(id) {
	const res = await fetch('http://localhost:6969/update-task', {
		method : 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ _id: id })
	});
	if (res.ok) {
		todoList = todoList.map(item => item._id === id ? {...item, checked: !item.checked} : item);
	}
	render();
}

async function deleteTodo(id) {
	const res = await fetch('http://localhost:6969/delete-task', {
		method : 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ _id: id })
	});
	if (res.ok) {
		todoList = todoList.filter(item => item._id !== id);
	}
	render();
}

function render() {
	const container = document.getElementById("list-container");
	container.innerHTML = '';
	if (todoList.length === 0) {
		container.innerHTML = '<p style="font-size: 1.2rem; color: #A27B5C; font-weight: 500">No tasks</p>';
		return;
	}
	todoList.forEach(todo => {
		const item = document.createElement('div');
		item.className = todo.checked ? 'item checked' : 'item';
		item.innerHTML = `
			<p>${todo.text}</p>
			<div class="buttons">
				<button onclick="toggleTodo('${todo._id}')"><img src="/assets/img/${todo.checked ? "checked" : "check"}.png" alt="Mark as Checked" width="30px"></button>
				<button onclick="deleteTodo('${todo._id}')"><img src="/assets/img/delete.png" alt="Delete" width="30px"></button>
			</div>
		`;
		container.appendChild(item);
	});
}

const getTasks = async () => {
	const todoData = await fetch('http://localhost:6969/get-tasks', {
		method : 'GET',
	});

	todoList = await todoData.json();
	render();
}

getTasks();


window.onload = () => render();