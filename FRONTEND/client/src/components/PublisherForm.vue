<template>
  <div class="container w-50">
    <Form @submit="submit" :validation-schema="publisherFormSchema">
      <div class="form-group">
        <label for="publisher_name">Publisher Name</label>
        <Field
          name="publisher_name"
          type="text"
          class="form-control"
          v-model="publisher.publisher_name"
        ></Field>
        <ErrorMessage name="publisher_name" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="address">Address</label>
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="publisher.publisher_address"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>
      <div class="form-group mt-3 text-center">
        <button type="button" class="btn btn-secondary me-2" @click="onBack">
          Cancel
        </button>
        <button class="btn btn-primary">Add</button>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  props: {
    publisher: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:publisher"],
  data() {
    const publisherFormSchema = yup.object().shape({
      publisher_name: yup.string().required("Book name is required"),
      address: yup.string().required("Author is required"),
    });
    return {
      publisherFormSchema,
    };
  },
  methods: {
    submit() {
      this.$emit("submit:publisher", this.publisher);
    },
    onBack() {
      this.$router.push({ name: "PublisherList" });
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
}
</style>
