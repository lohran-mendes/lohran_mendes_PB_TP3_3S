import "./Sidebar.css";
import calendarIcon from "../../assets/icons/calendar.svg?raw";
import gearIcon from "../../assets/icons/gear.svg?raw";
import graduationHatIcon from "../../assets/icons/graduation-hat.svg?raw";
import logoutIcon from "../../assets/icons/logout.svg?raw";
import bookIcon from "../../assets/icons/book.svg?raw";
import searchIcon from "../../assets/icons/search.svg?raw";

export function Sidebar() {
  return (
    <div className="sidebar-component">
      <h2>LearnFlix</h2>
      <ul>
        <li>
          <a href="">
            <span
              className="sidebar-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: graduationHatIcon }}
            />
            My courses
          </a>
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
              dangerouslySetInnerHTML={{ __html: searchIcon }}
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
