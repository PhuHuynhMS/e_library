<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import AccountService from "@/services/account.service";
import { useUserStore } from "@/stores/userStore";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    });
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await AccountService.login({
          username: this.username,
          password: this.password,
        });
        console.log(response);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.token);
          const decoded = jwtDecode(response.data.data.token);

          const userStore = useUserStore();
          userStore.login(decoded.account_role);
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Admin Login</h2>
      <Form @submit="onSubmit" :validation-schema="schema">
        <!-- Username Input -->
        <div class="form-group mb-3">
          <Field
            class="form-control"
            id="username"
            name="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            required
          />
          <ErrorMessage name="username" class="text-danger" />
        </div>
        <!-- Password Input -->
        <div class="form-group mb-3">
          <Field
            class="form-control"
            id="password"
            name="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <!-- Login Button -->
        <div class="text-center">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
