<template>
  <Form @submit="submitUser" :validation-schema="loginFormSchema">
    <div class="form-group">
      <label for="username">Username</label>
      <Field
        name="username"
        type="text"
        class="form-control"
        v-model="userLocal.username"
      ></Field>
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="password">Password</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        v-model="userLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-group mt-3 text-center">
      <button class="btn btn-primary">Login</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user"],
  props: {
    user: { type: Object || null, required: true },
  },
  data() {
    const loginFormSchema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      userLocal: this.user,
      loginFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
}
</style>
