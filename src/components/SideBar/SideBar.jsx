import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="default user" />
      <p className="sidebar__username">Eddy Smith</p>
    </div>
  );
}

export default Sidebar;
