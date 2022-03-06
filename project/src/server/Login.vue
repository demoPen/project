<template>
  <div class="main" ref="main">
    <div class="login-page">
      <div class="form">
        <form class="login-form" action="#">
          <input
            type="text"
            placeholder="username"
            v-model="user.name"
            autofocus
            autocomplete="off"
          />
          <input
            type="password"
            placeholder="password"
            v-model="user.password"
          />
          <button @click.prevent="submitInfo()">login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";

export default {
  name: "login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    submitInfo() {
      const { name, password } = this.user;
      if (name && password) {
        request
          .post("/login", { name, password })
          .then((res) => {
            this.$message({
              duration: 1000,
              message: `${res.data.msg}`,
              type: "success",
            });
            const data = res.data;
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              if (res.data) this.$router.replace("/server");
            }, 1000);
          })
          .catch((err) => {
            if (err) {
              Object.keys(this.user).forEach((item) => {
                this.user[item] = "";
              });
            }
          });
      } else {
        this.$message({
          duration: 1500,
          message: "用户名或密码不能为空",
          type: "error",
        });
      }
    },
  },

  beforeCreate() {
    document.querySelector("body").style.cssText = `  background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f);`;
  },
  destroyed() {
    document.querySelector("body").style.background = "";
  },
};
</script>

<style scoped>
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  overflow: hidden;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.main {
  /* height: 600px; */
  /* background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f); */
  font-family: "Roboto", sans-serif;
}
</style>