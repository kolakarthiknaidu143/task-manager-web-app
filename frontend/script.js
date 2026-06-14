console.log("Script Working");

// ================= REGISTER =================

const registerForm =
  document.getElementById(
    "registerForm"
  );

if (registerForm) {
  registerForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const name =
        document.getElementById(
          "name"
        ).value;

      const email =
        document.getElementById(
          "email"
        ).value;

      const password =
        document.getElementById(
          "password"
        ).value;

      try {
        const response =
          await fetch(
            "https://task-manager-backend-tb08.onrender.com/api/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify({
                  name,
                  email,
                  password,
                }),
            }
          );

        const data =
          await response.json();

        alert(data.message);

        if (
          response.ok
        ) {
          window.location.href =
            "login.html";
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
}

// ================= LOGIN =================

const loginForm =
  document.getElementById(
    "loginForm"
  );

if (loginForm) {
  loginForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const email =
        document.getElementById(
          "email"
        ).value;

      const password =
        document.getElementById(
          "password"
        ).value;

      try {
        const response =
          await fetch(
            "https://task-manager-backend-tb08.onrender.com/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify({
                  email,
                  password,
                }),
            }
          );

        const data =
          await response.json();

        if (
          data.token
        ) {
          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          alert(
            "Login successful"
          );

          window.location.href =
            "dashboard.html";
        } else {
          alert(
            data.message
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
}

// ================= ADD TASK =================

const taskForm =
  document.getElementById(
    "taskForm"
  );

if (taskForm) {
  taskForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const title =
        document.getElementById(
          "title"
        ).value;

      const description =
        document.getElementById(
          "description"
        ).value;

      const dueDate =
        document.getElementById(
          "dueDate"
        ).value;

      const priority =
        document.getElementById(
          "priority"
        ).value;

      const token =
        localStorage.getItem(
          "token"
        );

      try {
        const response =
          await fetch(
            "https://task-manager-backend-tb08.onrender.com/api/tasks",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                Authorization:
                  `Bearer ${token}`,
              },
              body:
                JSON.stringify({
                  title,
                  description,
                  dueDate,
                  priority,
                }),
            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        taskForm.reset();

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    }
  );
}

// ================= FETCH TASKS =================

const taskList =
  document.getElementById(
    "taskList"
  );

async function fetchTasks() {
  if (!taskList)
    return;

  const token =
    localStorage.getItem(
      "token"
    );

  try {
    const response =
      await fetch(
        "https://task-manager-backend-tb08.onrender.com/api/tasks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const tasks =
      await response.json();

    taskList.innerHTML =
      "";

    // Stats
    document.getElementById(
      "totalTasks"
    ).innerText =
      tasks.length;

    document.getElementById(
      "completedTasks"
    ).innerText =
      tasks.filter(
        (task) =>
          task.status ===
          "Completed"
      ).length;

    document.getElementById(
      "pendingTasks"
    ).innerText =
      tasks.filter(
        (task) =>
          task.status !==
          "Completed"
      ).length;

    // Empty state
    if (
      tasks.length ===
      0
    ) {
      taskList.innerHTML = `
      <div class="empty-state">
      🚀 No tasks yet.
      Add your first task!
      </div>
      `;
      return;
    }

    // Show tasks
    tasks.forEach(
      (task) => {
        taskList.innerHTML += `
        <div class="task-card">

        <h4>
        ${task.title}
        </h4>

        <p>
        ${task.description}
        </p>

        <p>
        📅 Due:
        ${new Date(
          task.dueDate
        ).toLocaleDateString()}
        </p>

        <p>
        🔥 Priority:
        <span class="
        priority-${task.priority.toLowerCase()}
        ">
        ${task.priority}
        </span>
        </p>

        <p>
        📌 Status:
        <span class="
        ${
          task.status ===
          "Completed"
            ? "completed"
            : "pending"
        }
        ">
        ${task.status}
        </span>
        </p>

        <div class="task-actions">

        <button
        class="complete-btn"
        onclick="completeTask('${task._id}')"
        >
        Complete
        </button>

        <button
        class="edit-btn"
        onclick="editTask(
        '${task._id}',
        '${task.title}',
        '${task.description}',
        '${task.priority}',
        '${task.dueDate}'
        )"
        >
        Edit
        </button>

        <button
        class="delete-btn"
        onclick="deleteTask('${task._id}')"
        >
        Delete
        </button>

        </div>

        </div>
        `;
      }
    );

    // Search task
    const searchInput =
      document.getElementById(
        "searchTask"
      );

    if (
      searchInput
    ) {
      searchInput.addEventListener(
        "input",
        () => {
          const value =
            searchInput.value.toLowerCase();

          const cards =
            document.querySelectorAll(
              ".task-card"
            );

          cards.forEach(
            (card) => {
              const text =
                card.innerText.toLowerCase();

              card.style.display =
                text.includes(
                  value
                )
                  ? "block"
                  : "none";
            }
          );
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

fetchTasks();

// ================= COMPLETE TASK =================

async function completeTask(
  id
) {
  const token =
    localStorage.getItem(
      "token"
    );

  await fetch(
    `https://task-manager-backend-tb08.onrender.com/api/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body:
        JSON.stringify({
          status:
            "Completed",
        }),
    }
  );

  fetchTasks();
}

// ================= EDIT TASK =================

async function editTask(
  id,
  oldTitle,
  oldDescription,
  oldPriority,
  oldDueDate
) {
  const title =
    prompt(
      "Edit Title",
      oldTitle
    );

  const description =
    prompt(
      "Edit Description",
      oldDescription
    );

  const priority =
    prompt(
      "Priority (Low/Medium/High)",
      oldPriority
    );

  const dueDate =
    prompt(
      "Due Date (YYYY-MM-DD)",
      oldDueDate.split(
        "T"
      )[0]
    );

  if (
    !title ||
    !description
  )
    return;

  const token =
    localStorage.getItem(
      "token"
    );

  await fetch(
    `https://task-manager-backend-tb08.onrender.com/api/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body:
        JSON.stringify({
          title,
          description,
          priority,
          dueDate,
        }),
    }
  );

  fetchTasks();
}

// ================= DELETE TASK =================

async function deleteTask(
  id
) {
  const token =
    localStorage.getItem(
      "token"
    );

  await fetch(
    `https://task-manager-backend-tb08.onrender.com/api/tasks/${id}`,
    {
      method:
        "DELETE",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  fetchTasks();
}

// ================= LOGOUT =================

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

if (logoutBtn) {
  logoutBtn.addEventListener(
    "click",
    () => {
      localStorage.clear();

      window.location.href =
        "login.html";
    }
  );
}

// ================= WELCOME USER =================

const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

const welcomeText =
  document.getElementById(
    "welcomeText"
  );

if (
  user &&
  welcomeText
) {
  welcomeText.innerText =
    `Welcome, ${user.name} 👋`;
}