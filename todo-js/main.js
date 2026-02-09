const STORAGE_KEY = "todo-js-items-v1";

const defaultTodos = [
  {
    id: "1",
    title: "Renew Passport",
    description: "Check expiration date",
    selected: true,
    expanded: true,
  },
  {
    id: "2",
    title: "Book Flight Tickets",
    description: "Compare prices for TPE -> NRT",
    selected: false,
    expanded: false,
  },
];

const titleInput = document.getElementById("todo-title-input");
const descriptionInput = document.getElementById("todo-description-input");
const todoListEl = document.getElementById("todo-list");

let todos = loadTodos();
renderTodos();

titleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (descriptionInput.value.trim()) {
      handleAddTodo();
    } else {
      descriptionInput.focus();
    }
  }
});

descriptionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddTodo();
  }
});

todoListEl.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".todo-delete-btn");
  if (deleteBtn) {
    const itemEl = deleteBtn.closest(".todo-item");
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
    return;
  }

  const checkboxBtn = event.target.closest(".todo-checkbox");
  if (checkboxBtn) {
    const itemEl = checkboxBtn.closest(".todo-item");
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    todos = todos.map((t) =>
      t.id === id
        ? {
            ...t,
            selected: !t.selected,
          }
        : t
    );
    saveTodos();
    renderTodos();
    return;
  }

  const itemEl = event.target.closest(".todo-item");
  if (!itemEl) return;
  const id = itemEl.dataset.id;
  todos = todos.map((t) =>
    t.id === id
      ? {
          ...t,
          expanded: !t.expanded,
        }
      : t
  );
  saveTodos();
  renderTodos();
});

function handleAddTodo() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    titleInput.focus();
    return;
  }

  const newTodo = {
    id: String(Date.now()),
    title,
    description,
    selected: false,
    expanded: false,
  };

  todos = [...todos, newTodo];
  saveTodos();
  renderTodos();

  titleInput.value = "";
  descriptionInput.value = "";
  titleInput.focus();
}

function loadTodos() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [...defaultTodos];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...defaultTodos];
    }
    return parsed.map((item, index) => ({
      id: String(item.id ?? Date.now() + index),
      title: String(item.title ?? "").trim() || "Untitled",
      description: String(item.description ?? ""),
      selected: Boolean(item.selected),
      expanded: Boolean(item.expanded),
    }));
  } catch (error) {
    console.warn("讀取本機資料發生錯誤，改用預設資料。", error);
    return [...defaultTodos];
  }
}

function saveTodos() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn("儲存至本機時發生錯誤。", error);
  }
}

function renderTodos() {
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const itemEl = document.createElement("li");
    itemEl.className = "todo-item";
    if (todo.selected) {
      itemEl.classList.add("todo-item--selected");
    }
    if (todo.expanded) {
      itemEl.classList.add("todo-item--expanded");
    }
    itemEl.dataset.id = todo.id;

    const rowEl = document.createElement("div");
    rowEl.className = "todo-row";

    const checkboxBtn = document.createElement("button");
    checkboxBtn.className = "todo-checkbox";
    checkboxBtn.type = "button";
    checkboxBtn.setAttribute("aria-label", "選取這個待辦項目");

    const checkboxInner = document.createElement("span");
    checkboxInner.className = "todo-checkbox-icon";
    checkboxBtn.appendChild(checkboxInner);

    const textsEl = document.createElement("div");
    textsEl.className = "todo-texts";

    const titleEl = document.createElement("div");
    titleEl.className = "todo-title";
    titleEl.textContent = todo.title;

    textsEl.appendChild(titleEl);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("aria-label", "刪除這個待辦項目");

    rowEl.appendChild(checkboxBtn);
    rowEl.appendChild(textsEl);
    rowEl.appendChild(deleteBtn);

    const descriptionEl = document.createElement("div");
    descriptionEl.className = "todo-description";
    descriptionEl.textContent = todo.description || "（沒有描述內容）";

    itemEl.appendChild(rowEl);
    itemEl.appendChild(descriptionEl);

    todoListEl.appendChild(itemEl);
  });
}

