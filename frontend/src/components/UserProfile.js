import React from "react";

function UserProfile({ email, onLogout }) {
  return (
    <div className="profile-card">
      <h3>Ваш профиль</h3>
      <div className="profile-email">{email}</div>
      <button className="btn-danger" onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default UserProfile;
