import "./Header.css";

import searchIcon from "../../assets/icons/search.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import chatIcon from "../../assets/icons/chat.svg";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const shouldShowBackButton = pathname !== "/";
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="header-component">
      <button
        className="hamburger-btn"
        onClick={onMenuClick}
        aria-label="Abrir menu"
        type="button"
      >
        <span className="hamburger-icon" />
      </button>
      {shouldShowBackButton && (
        <Link to="/" className="back-link">
          <img src={arrowLeftIcon} alt="icone de voltar" width={20} />
          Back
        </Link>
      )}
      <div className="header-right">
        <div className="search-input-wrapper">
          <img
            src={searchIcon}
            alt=""
            width={20}
            className="search-icon"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar cursos"
          />
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
