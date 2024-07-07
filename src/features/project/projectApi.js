export const addProject = async (formData) => {
  try {
    const response = await fetch("/server/projects/project/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("addProject data:", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Post Creation failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Post Creation failed. Please try again later."
    );
  }
};

export const getAllProject = async () => {
  try {
    const response = await fetch("/server/projects/project", {
      method: "GET",
    });

    const data = await response.json();
    console.log("projectApi data", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Get Project failed.");
    }

    return { data };
  } catch (error) {
    throw new Error(
      error.message || "Get Project failed. Please try again later."
    );
  }
};

export const getPosts = async (newFilter) => {
  let queryString = "";

  for (let key in newFilter) {
    if (Array.isArray(newFilter[key])) {
      newFilter[key].forEach((value) => {
        queryString += `${key}=${value}&`;
      });
    } else {
      queryString += `${key}=${newFilter[key]}&`;
    }
  }

  console.log("queryString: " + queryString);
  try {
    const response = await fetch(`/server/posts?${queryString}`, {
      method: "GET",
    });

    const data = await response.json();
    // console.log("postApi getpost data: ", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Post fetch failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Post fetch failed. Please try again later."
    );
  }
};

export const addTasks = async (formData) => {
  try {
    const response = await fetch("/server/tasks/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("projectApi addTask data: " + data.data);

    if (!response.ok) {
      throw new Error(data.data.message || "Add Task failed.");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Add Task failed. Please try again later."
    );
  }
};

export const getAllTask = async () => {
  try {
    const response = await fetch("/server/tasks/task", {
      method: "GET",
    });

    const data = await response.json();
    console.log("projectApi data", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Get All Task failed.");
    }

    return { data };
  } catch (error) {
    throw new Error(
      error.message || "Get All Task failed. Please try again later."
    );
  }
};

export const updateTaskStatus = async (taskId, taskStatus) => {
  try {
    const response = await fetch(`/server/tasks/tasks/${taskId}/updateStatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskStatus }),
    });

    const data = await response.json();
    console.log("projectApi data", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "update task staus failed.");
    }

    return { data };
  } catch (error) {
    throw new Error(
      error.message || "update Task status failed. Please try again later."
    );
  }
};

export const getUserProject = async () => {
  try {
    const response = await fetch("/server/projects/user/project", {
      method: "GET",
    });

    const data = await response.json();
    console.log("projectApi data", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Get All Task failed.");
    }

    return { data };
  } catch (error) {
    throw new Error(
      error.message || "Get All Task failed. Please try again later."
    );
  }
};

export const getTaskByProjectId = async (projectId) => {
  try {
    const response = await fetch(`/server/tasks/task/${projectId}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log("projectApi data", data);

    if (!response.ok) {
      const errorMessage =
        data.errors && data.errors.length > 0
          ? data.errors.join(", ")
          : data.message;
      throw new Error(errorMessage || "Get Task by project id failed.");
    }

    return  data ;
  } catch (error) {
    throw new Error(
      error.message || "Get Task by project id failed. Please try again later."
    );
  }
};
