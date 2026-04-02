import "./Sidebar.css";
import layerGroup from "../../assets/icons/layer-groups.svg?raw";
import calendarIcon from "../../assets/icons/calendar.svg?raw";
import gearIcon from "../../assets/icons/gear.svg?raw";
import graduationHatIcon from "../../assets/icons/graduation-hat.svg?raw";
import logoutIcon from "../../assets/icons/logout.svg?raw";
import bookIcon from "../../assets/icons/book.svg?raw";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const isAvailableCoursesActive = pathname === "/";
  const isMyCoursesActive = pathname === "/my-courses";
  const isSettingsActive = pathname === "/settings";

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <div className={`sidebar-component${isOpen ? " sidebar-open" : ""}`}>
      <button
        className="sidebar-close-btn"
        onClick={onClose}
        aria-label="Fechar menu"
        type="button"
      >
        &times;
      </button>
      <h2>LearnFlix</h2>
      <ul>
        <li>
          <Link
            to="/"
            className={isAvailableCoursesActive ? "is-active" : undefined}
          >
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: layerGroup }}
            />
            Available courses
          </Link>
        </li>
        <li>
          <Link
            to="/my-courses"
            className={isMyCoursesActive ? "is-active" : undefined}
          >
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: graduationHatIcon }}
            />
            My courses
          </Link>
        </li>
        <li>
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: calendarIcon }}
            />
            My calendar
          </a>
        </li>
        <li>
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: bookIcon }}
            />
            Library
          </a>
        </li>
        <li>
          <Link
            to="/settings"
            className={isSettingsActive ? "is-active" : undefined}
          >
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: gearIcon }}
            />
            Settings
          </Link>
        </li>
        <li>
          <button type="button" className="sidebar-logout-btn" onClick={logout}>
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: logoutIcon }}
            />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
