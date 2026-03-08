import "./Sidebar.css";
import layerGroup from "../../assets/icons/layer-groups.svg?raw";
import calendarIcon from "../../assets/icons/calendar.svg?raw";
import gearIcon from "../../assets/icons/gear.svg?raw";
import graduationHatIcon from "../../assets/icons/graduation-hat.svg?raw";
import logoutIcon from "../../assets/icons/logout.svg?raw";
import bookIcon from "../../assets/icons/book.svg?raw";
import coursesSearchIcon from "../../assets/icons/courses.svg?raw";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const { pathname } = useLocation();
  const isAvailableCoursesActive = pathname === "/";
  const isMyCoursesActive = pathname === "/course" || pathname === "/courses";

  return (
    <div className="sidebar-component">
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
            to="/courses"
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
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: coursesSearchIcon }}
            />
            Available courses
          </a>
        </li>
        <li>
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: gearIcon }}
            />
            Settings
          </a>
        </li>
        <li>
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: logoutIcon }}
            />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
