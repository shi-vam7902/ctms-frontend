import { Table, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { updateTaskStatusAsync } from "../features/project/projectSlice";
import { getUserTasksAsync } from "../features/user/userSlice";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await dispatch(
          getUserTasksAsync({ userId: currentUser._id })
        ).unwrap();
        if (result) {
          setTasks(result);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTasks();
  }, [currentUser, dispatch]);

  const handleTaskStatusChange = (e, taskId) => {
    const newTaskStatus = e.target.value;
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, taskStatus: newTaskStatus } : task
    );
    setTasks(updatedTasks);
    dispatch(updateTaskStatusAsync({ taskId, taskStatus: newTaskStatus }));
  };

  const blue = "text-blue-700";
  const green = "text-green-700";
  const red = "text-red-500";
  const yellow = "text-yellow-500";

  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="flex my-3  tracking-wide font-serif font-semibold text-xl text-gray-500 hover:text-gray-900">
        Your Task List
      </h1>
      {tasks?.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Task Name</Table.HeadCell>
            <Table.HeadCell>Task Desc</Table.HeadCell>
            <Table.HeadCell>Project Name</Table.HeadCell>
            <Table.HeadCell>Report To</Table.HeadCell>
            <Table.HeadCell>Asigned To</Table.HeadCell>
            <Table.HeadCell>Task Status</Table.HeadCell>
            <Table.HeadCell>Task Start Date</Table.HeadCell>
            <Table.HeadCell>Task Due Date</Table.HeadCell>
          </Table.Head>
          {tasks.map((task) => (
            <Table.Body className="divide-y border-t" key={task._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{task.taskName}</Table.Cell>
                <Table.Cell>{task.taskDesc}</Table.Cell>
                <Table.Cell>{task.project}</Table.Cell>
                <Table.Cell>{task.reportTo}</Table.Cell>
                <Table.Cell>{task.assignedTo}</Table.Cell>
                <Table.Cell>
                  <Select
                    color
                    name="taskStatus"
                    value={task.taskStatus}
                    onChange={(e) => handleTaskStatusChange(e, task._id)}
                    className={`${
                      task.taskStatus === "pending"
                        ? blue
                        : task.taskStatus === "completed"
                        ? green
                        : task.taskStatus === "tobereviwed"
                        ? yellow
                        : task.taskStatus === "NotStarted"
                        ? red
                        : ""
                    } outline-none border-0 w-[9rem] font-semibold rounded-lg`}
                  >
                    <option value="pending" className="text-blue-700">
                      pending
                    </option>
                    <option value="completed" className="text-green-700">
                      completed
                    </option>
                    <option value="tobereviwed" className="text-yellow-500">
                      tobereviwed
                    </option>
                    <option value="NotStarted" className="text-red-500">
                      NotStarted
                    </option>
                  </Select>
                </Table.Cell>
                <Table.Cell>{task.taskStartDate}</Table.Cell>
                <Table.Cell>{task.taskDueDate}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>You have no tasks yet!</p>
      )}
    </div>
  );
}

export default Home;
