import React from "react";

function Header({ isLoggedIn, email, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          🚀 GodFreelanceAAAA
        </div>
        <div className="header-actions">
          {isLoggedIn && (
            <>
              <div className="user-info">
                ✓ {email}
              </div>
              <button className="btn-danger btn-small" onClick={onLogout}>
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
