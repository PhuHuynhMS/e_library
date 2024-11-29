<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card shadow-lg border-0">
          <div class="card-header text-white bg-primary">
            <h4 class="mb-0 text-center">Change Password</h4>
          </div>
          <div class="card-body">
            <Form
              ref="form"
              @submit="handleChangePassword"
              :validation-schema="passwordSchema"
            >
              <!-- Current Password -->
              <div class="mb-3">
                <label for="currentPassword" class="form-label">
                  Current Password
                </label>
                <Field
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  class="form-control"
                  v-model="form.currentPassword"
                  placeholder="Enter current password"
                />
                <ErrorMessage name="currentPassword" class="error-feedback" />
              </div>

              <!-- New Password -->
              <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  class="form-control"
                  v-model="form.newPassword"
                  placeholder="Enter new password"
                />
                <ErrorMessage name="newPassword" class="error-feedback" />
              </div>

              <!-- Confirm Password -->
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">
                  Confirm New Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  v-model="form.confirmPassword"
                  placeholder="Confirm new password"
                />
                <ErrorMessage name="confirmPassword" class="error-feedback" />
              </div>

              <!-- Submit Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Change Password
                </button>
              </div>
            </Form>
          </div>
          <div class="card-footer bg-light text-center">
            <small class="text-muted">
              Please ensure your new password is secure.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  props: {
    isChanged: { type: Boolean, default: false },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  watch: {
    isChanged(newVal) {
      if (newVal) {
        this.resetFormWithoutValidation();
      }
    },
  },
  data() {
    const passwordSchema = yup.object().shape({
      currentPassword: yup.string().required("Current password is required"),
      newPassword: yup
        .string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
    });
    return {
      passwordSchema,
      form: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    handleChangePassword() {
      this.$emit("change-password", this.form);
    },

    resetFormWithoutValidation() {
      this.form.currentPassword = "";
      this.form.newPassword = "";
      this.form.confirmPassword = "";

      this.$refs.form.resetForm();
    },
  },
  emits: ["change-password"],
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
.card {
  border-radius: 10px;
}
.card-header {
  border-bottom: 2px solid #fff;
}
</style>
