import React, { useState, useEffect } from "react";
import { Button, Label, Textarea, TextInput, Alert } from "flowbite-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../../features/user/userSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { addProjectAsync } from "../../features/project/projectSlice";

function DashProjects() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
    user: [],
    status: "66615447f6ad8ae9824701cf", // Set status directly in the initial state
  });
  const [success, setSuccess] = useState("");

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
      user: selectedUsers,
    }));
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await dispatch(getUsersAsync()).unwrap();
        if (result) {
          setUsers(
            result.users.map((user) => ({
              value: user._id,
              label: user.username,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.role === "admin") {
      fetchUsers();
    }
  }, [currentUser, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProjectAsync(formData))
      .unwrap()
      .then((response) => {
        console.log("Project added successfully", response);
        setSuccess("Project added successfully");
        setFormData({
          projectName: "",
          projectDesc: "",
          user: [],
          status: "66615447f6ad8ae9824701cf",
        });
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  };

  return (
    <div className="max-w-lg my-6 mx-auto p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Add New Project
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </Label>
          <TextInput
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={setData}
            type="text"
            placeholder="Enter Project Name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="projectDesc"
            className="block text-sm font-medium text-gray-700"
          >
            Project Description
          </Label>
          <Textarea
            id="projectDesc"
            name="projectDesc"
            value={formData.projectDesc}
            onChange={setData}
            placeholder="Enter Project description..."
            required
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="users"
            className="block text-sm font-medium text-gray-700"
          >
            Select Project Managers
          </Label>
          <Select
            id="users"
            name="users"
            value={users.filter((user) => formData.user.includes(user.value))}
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
            Add Project
          </Button>
        </div>
      </form>

      {success && (
        <Alert color="success" className="mt-5">
          {success}
        </Alert>
      )}
    </div>
  );
}

export default DashProjects;
