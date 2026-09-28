import React from "react";

function AuthForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onRegister,
  onLogin,
}) {
  return (
    <div className="auth-section">
      <h2 className="auth-title">Добро пожаловать 👋</h2>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn-primary" onClick={onRegister}>
          Регистрация
        </button>
        <button className="btn-secondary" onClick={onLogin}>
          Войти
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
