import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import JobsList from "./components/JobsList";
import UserProfile from "./components/UserProfile";

function App() {
  const [jobs, setJobs] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    checkAuth();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://my-project-backend1.onrender.com/jobs"
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  };

  const register = async () => {
    if (!email || !password) {
      alert("Заполните все поля");
      return;
    }

    try {
      const response = await fetch(
        "https://my-project-backend1.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Ошибка регистрации");
    }
  };

  const login = async () => {
    if (!email || !password) {
      alert("Заполните все поля");
      return;
    }

    try {
      const response = await fetch(
        "https://my-project-backend1.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert("Вход выполнен успешно!");
      } else {
        alert(data.message || "Ошибка входа");
      }
    } catch (error) {
      alert("Ошибка входа");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} email={email} onLogout={logout} />

      <main className="container">
        <h2 className="home-subtitle">ПРИВЕТ</h2>

        {isLoggedIn ? (
          <UserProfile email={email} onLogout={logout} />
        ) : (
          <AuthForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRegister={register}
            onLogin={login}
          />
        )}

        <JobsList jobs={jobs} loading={loading} />
      </main>

      <footer className="footer">
        <p>&copy; 2026 GodFreelance. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;
