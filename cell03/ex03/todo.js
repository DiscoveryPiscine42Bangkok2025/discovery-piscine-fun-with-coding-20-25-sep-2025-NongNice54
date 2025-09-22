function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [k, v] = c.split("=");
    if (k === name) return decodeURIComponent(v);
  }
  return "";
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll(".todo").forEach(t => todos.push(t.textContent));
  setCookie("todos", JSON.stringify(todos), 7);
}

function loadTodos() {
  const data = getCookie("todos");
  if (data) {
    JSON.parse(data).forEach(todo => addTodo(todo));
  }
}

function addTodo(text) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  div.onclick = () => {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  };
  document.getElementById("ft_list").appendChild(div);
  saveTodos();
}

document.getElementById("newBtn").addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim());
  }
});

window.onload = loadTodos;

