import styles from "./LoginRegister.module.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "./Auth";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHander = (e) => {
    e.preventDefault();
    if ((username == "") | (password == "")) {
      return;
    } else {
      axios
        .post("http://0.0.0.0:8000/user/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data.access_token, "response.data.access_token");
          if (response.data.access_token) {
            setToken(response.data.access_token);
            navigate("/home/patient-list");
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };
  return (
    <div className={styles.FormContainer}>
      <form className={styles.Form} onSubmit={submitHander}>
        <h1>Login</h1>
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHander = (e) => {
    e.preventDefault();
    if (
      (username == "") |
      (password == "") |
      (email == "") |
      (fullname == "")
    ) {
      return;
    } else {
      axios
        .post("http://0.0.0.0:8000/user/register", {
          username: username,
          password: password,
          fullname: fullname,
          email: email,
        })
        .then((response) => {
          console.log(response.data.access_token, "response.data.access_token");
          if (response.data.access_token) {
            setToken(response.data.access_token);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };

  return (
    <div className={styles.FormContainer}>
      <form className={styles.Form} onSubmit={submitHander}>
        <h1>Register</h1>
        <div>
          <input
            type="text"
            placeholder="Fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

const LoginRegister = () => {
  return (
    <div>
      <div className={styles.LoginRegisterPage}>
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default LoginRegister;
