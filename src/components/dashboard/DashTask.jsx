import React, { useState, useEffect } from "react";
import { Button, Label, Textarea, TextInput, Alert } from "flowbite-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../../features/user/userSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  getAllProjectsAsync,
  addTaskAsync,
} from "../../features/project/projectSlice";

function DashTask() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    taskName: "",
    taskDesc: "",
    assignedTo: [], // Set status directly in the initial state
    project: "", //id
    reportTo: currentUser._id,
    taskStatus: "pending",
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUsersAndProjects = async () => {
      try {
        const usersResult = await dispatch(getUsersAsync()).unwrap();
        const projectsResult = await dispatch(getAllProjectsAsync()).unwrap();
        console.log("projects", projectsResult);
        if (usersResult && projectsResult) {
          setUsers(
            usersResult.users.map((user) => ({
              value: user._id,
              label: user.username,
            }))
          );
          setProjects(
            projectsResult.map((project) => ({
              value: project._id,
              label: project.projectName,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.role === "admin") {
      fetchUsersAndProjects();
    }
  }, [currentUser, dispatch]);

  const setData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUserChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      assignedTo: selectedUsers,
    }));
  };

  const handleProjectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      project: selectedOption.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      taskStatus: "pending",
    }; // Ensure taskStatus is included
    dispatch(addTaskAsync(updatedFormData))
      .unwrap()
      .then((response) => {
        if (response.message === "Task Already Exists") {
          setError("Task Already Exists");
          } else {
          console.log("Task added successfully", response);
          setSuccess("Task added successfully")
          setFormData({
            taskName: "",
            taskDesc: "",
            assignedTo: [],
            project: "",
            taskStatus: "pending", // Reset taskStatus in the form data
          });
        }
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="max-w-lg my-6 mx-auto p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Add Project Task
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-700"
          >
            Task Name
          </Label>
          <TextInput
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={setData}
            type="text"
            placeholder="Enter Task Name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="taskDesc"
            className="block text-sm font-medium text-gray-700"
          >
            Task Description
          </Label>
          <Textarea
            id="taskDesc"
            name="taskDesc"
            value={formData.taskDesc}
            onChange={setData}
            placeholder="Enter Task Description..."
            required
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="project"
            className="block text-sm font-medium text-gray-700"
          >
            Select Project:
          </Label>
          <Select
            id="project"
            name="project"
            value={projects.find((p) => p.value === formData.project)}
            onChange={handleProjectChange}
            options={projects}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-700"
          >
            Task Assign To:
          </Label>
          <Select
            id="assignedTo"
            name="assignedTo"
            value={users.filter((u) => formData.assignedTo.includes(u.value))}
            onChange={handleUserChange}
            options={users}
            isMulti
            className="mt-1 block w-full"
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            gradientDuoTone="cyanToBlue"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
          >
            Add Tasks
          </Button>
        </div>
      </form>
      {success && (
        <Alert color="success" className="mt-5">
          {success}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default DashTask;
