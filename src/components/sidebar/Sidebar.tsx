import "./sidebar.css";
import TableViewIcon from '@mui/icons-material/TableView';
import FeedIcon from '@mui/icons-material/Feed';

export default function Sidebar({ currentPage, handlePageChange }) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${currentPage === "myModules" && "active"}`}
              onClick={() => handlePageChange("myModules")}
            >
              <TableViewIcon className="sidebarIcon" />
              My Modules
            </li>
            <li
              className={`sidebarListItem ${currentPage === "addModule" && "active"}`}
              onClick={() => handlePageChange("addModule")}
            >
              <FeedIcon className="sidebarIcon" />
              Add New Module
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
