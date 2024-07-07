import { Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { getUserProjectAsync } from "../../features/project/projectSlice";
import TaskModel from "../../utils/TaskModel";

function DashboardComp() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await dispatch(getUserProjectAsync()).unwrap();
        if (result) {
          setProject(result);
        }
      } catch (error) {
        setError(error.message || "Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleShowTask = (projectId) => {
    setProjectId(projectId);
    setShowModel(true);
  };

  return (
    <>
      <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <h1 className="flex my-3 tracking-wide font-serif font-semibold text-xl text-gray-500 hover:text-gray-900">
          All Project List
        </h1>
        {project?.length > 0 ? (
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Project Name</Table.HeadCell>
              <Table.HeadCell>Project Desc</Table.HeadCell>
              <Table.HeadCell>Project Start Date</Table.HeadCell>
              <Table.HeadCell>Project End Date</Table.HeadCell>
              <Table.HeadCell>Project Due Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border-t">
              {project.map((project) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project._id}>
                  <Table.Cell>{project.projectName}</Table.Cell>
                  <Table.Cell>{project.projectDesc}</Table.Cell>
                  <Table.Cell>{project.projectStartDate}</Table.Cell>
                  <Table.Cell>{project.projectEndDate}</Table.Cell>
                  <Table.Cell>{project.projectDueDate}</Table.Cell>
                  <Table.Cell>{project.status}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleShowTask(project._id)}>
                      Show Task
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>You have no projects yet!</p>
        )}
        <TaskModel onClose={() => setShowModel(false)} show={showModel} projectId={projectId} />
      </div>
    </>
  );
}

export default DashboardComp;
