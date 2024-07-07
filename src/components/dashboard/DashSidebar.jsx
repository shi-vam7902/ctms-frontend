import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, signOutAsync } from "../../features/auth/authSlice";

export default function DashSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const resultAction = await dispatch(signOutAsync());
      if (signOutAsync.fulfilled.match(resultAction)) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {/* dashboard */}
          {currentUser && currentUser?.role==="admin" && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          {/* profile */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser?.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {/* projects */}
          {currentUser?.role==="admin" && (
            <Link to="/dashboard?tab=projects">
              <Sidebar.Item
                active={tab === "projects"}
                icon={HiDocumentText}
                as="div"
              >
                Assign Projects
              </Sidebar.Item>
            </Link>
          )}

           {/* project task */}
           {currentUser?.role==="admin" && (
            <Link to="/dashboard?tab=tasks">
              <Sidebar.Item
                active={tab === "tasks"}
                icon={HiDocumentText}
                as="div"
              >
                Assign Tasks
              </Sidebar.Item>
            </Link>
          )}

          {/* users and comments */}
          {currentUser?.role==="admin" && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}

          {/* sign-out */}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
