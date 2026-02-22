import "./Header.css";

import searchIcon from "../../assets/icons/search.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import chatIcon from "../../assets/icons/chat.svg";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";

export function Header() {
  return (
    <header className="header-component">
      <a href="#" className="back-link">
        <img src={arrowLeftIcon} alt="ícone de voltar" width={20} />
        Back
      </a>
      <div className="header-right">
        <div className="search-input-wrapper">
          <img
            src={searchIcon}
            alt=""
            width={20}
            className="search-icon"
            aria-hidden="true"
          />
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="container-icon">
          <img
            src={chatIcon}
            alt="ícone de chat"
            width={20}
            className="chat-icon"
            aria-hidden="true"
          />
        </div>
        <div className="container-icon">
          <img
            src={notificationIcon}
            alt="ícone de notificação"
            width={20}
            className="notification-icon"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
