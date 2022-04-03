import React from "react";

export const AuthPage = () => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    transform: "translateY(0)",
                  }}
                >
                  Email
                </label>
                <input
                  placeholder="Введите email"
                  id="email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    transform: "translateY(0)",
                  }}
                >
                  Password
                </label>
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
            >
              Войти
            </button>
            <button className="btn grey lighten-1 black-text">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
