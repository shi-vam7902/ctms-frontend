import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "flowbite-react";
import { useDispatch } from "react-redux";
import { getTaskByProjectIdAsync } from "../features/project/projectSlice";
import { Spinner } from "flowbite-react";

const TaskModel = ({ show, onClose, projectId }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      const result = await dispatch(
        getTaskByProjectIdAsync(projectId)
      ).unwrap();
      console.log("TaskModel result: " + result);
      if (result) {
        setTask(result);
      }
      setLoading(false);
    };

    if (projectId) {
      fetchTask();
    }
  }, [projectId, dispatch]);

  return (
    <Modal show={show} onClose={onClose} popup size="md" className="">
      <Modal.Header />
      <h1 className="text-xl font-bold mb-4 ml-3">Task Details</h1>
      <Modal.Body>
        <div className="text-center">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Spinner size="lg" />
            </div>
          ) : task.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Task Name</Table.HeadCell>
                <Table.HeadCell>Task Desc</Table.HeadCell>
                <Table.HeadCell>Task Status</Table.HeadCell>
                <Table.HeadCell>Task Start Date</Table.HeadCell>
                <Table.HeadCell>Task Due Date</Table.HeadCell>
                <Table.HeadCell>Assigned To</Table.HeadCell>
                <Table.HeadCell>Report To</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y border-t">
                {task.map((task) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={task._id}
                  >
                    <Table.Cell>{task.taskName}</Table.Cell>
                    <Table.Cell>{task.taskDesc}</Table.Cell>
                    <Table.Cell>{task.taskStatus}</Table.Cell>
                    <Table.Cell>{task.taskStartDate}</Table.Cell>
                    <Table.Cell>{task.taskDueDate}</Table.Cell>
                    <Table.Cell>{task.assignedTo}</Table.Cell>
                    <Table.Cell>{task.reportTo}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-gray-500">You have no tasks yet!</p>
          )}
          <div className="flex justify-center gap-4 mt-4">
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModel;
