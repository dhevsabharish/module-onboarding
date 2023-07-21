import "./topbar.css";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Module Onboarding</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
