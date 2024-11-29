<template>
  <Form @submit="submitUser" :validation-schema="registerFormSchema">
    <div class="row">
      <div class="col-md-6">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <Field
            name="firstName"
            type="text"
            class="form-control"
            v-model="userLocal.firstName"
          ></Field>
          <ErrorMessage name="firstName" class="error-feedback" />
        </div>
        <!-- Last Name -->
        <div class="form-group mt-3">
          <label for="lastName">Last Name</label>
          <Field
            name="lastName"
            type="text"
            class="form-control"
            v-model="userLocal.lastName"
          ></Field>
          <ErrorMessage name="lastName" class="error-feedback" />
        </div>
        <!-- Date of Birth -->
        <div class="form-group mt-3">
          <label for="dateOfBirth">Date of Birth</label>
          <Field
            name="dateOfBirth"
            type="date"
            class="form-control"
            v-model="userLocal.dateOfBirth"
          ></Field>
          <ErrorMessage name="dateOfBirth" class="error-feedback" />
        </div>
        <!-- Gender -->
        <div class="form-group mt-3">
          <label for="gender">Gender</label>
          <Field
            as="select"
            name="gender"
            id="gender"
            v-model="userLocal.gender"
            class="form-control"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <!-- Address -->
        <div class="form-group mt-3">
          <label for="address">Address</label>
          <Field
            name="address"
            type="text"
            class="form-control"
            v-model="userLocal.address"
          ></Field>
          <ErrorMessage name="address" class="error-feedback" />
        </div>
        <!-- Phone Number -->
        <div class="form-group mt-3">
          <label for="phoneNumber">Phone Number</label>
          <Field
            name="phoneNumber"
            type="text"
            class="form-control"
            v-model="userLocal.phoneNumber"
          ></Field>
          <ErrorMessage name="phoneNumber" class="error-feedback" />
        </div>
      </div>
      <div class="col-md-6">
        <!-- Username -->
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
        <!-- Password -->
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
        <!-- Confirm password -->
        <div class="form-group mt-3">
          <label for="passwordConfirm">Confirm Password</label>
          <Field
            name="passwordConfirm"
            type="password"
            class="form-control"
            v-model="userLocal.passwordConfirm"
          />
          <ErrorMessage name="passwordConfirm" class="error-feedback" />
        </div>
      </div>
    </div>
    <div class="form-group mt-3 text-center">
      <button class="btn btn-primary">Register</button>
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
    const registerFormSchema = yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      dateOfBirth: yup.string().required("Date of birth is required"),
      gender: yup
        .string()
        .oneOf(["male", "female", "other"], "Invalid gender")
        .required("Gender is required"),
      address: yup.string().required("Address is required"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .length(10, "Phone number must be 10 digits"),
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      passwordConfirm: yup
        .string()
        .required("Password confirmation is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    });

    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      userLocal: this.user,
      registerFormSchema,
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
