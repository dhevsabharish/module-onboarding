import "./sidebar.css";
import TableViewIcon from "@mui/icons-material/TableView";
import FeedIcon from "@mui/icons-material/Feed";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={() => navigate("/")}>
              <TableViewIcon className="sidebarIcon" />
              My Modules
            </li>
            <li className="sidebarListItem" onClick={() => navigate("/form")}>
              <FeedIcon className="sidebarIcon" />
              Add New Module
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
