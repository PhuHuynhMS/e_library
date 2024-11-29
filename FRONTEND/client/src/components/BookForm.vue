<template>
  <div class="container w-50">
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
      <div class="form-group">
        <label for="book_name">Book Title</label>
        <Field
          name="book_name"
          type="text"
          class="form-control"
          v-model="book.book_name"
        ></Field>
        <ErrorMessage name="book_name" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="author">Author</label>
        <Field
          name="author"
          type="text"
          class="form-control"
          v-model="book.author"
        />
        <ErrorMessage name="author" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="price">Price</label>
        <Field
          name="price"
          type="number"
          class="form-control"
          v-model="book.book_price"
        />
        <ErrorMessage name="price" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="quantity">Quantity</label>
        <Field
          name="quantity"
          type="number"
          class="form-control"
          v-model="book.book_quantity"
        />
        <ErrorMessage name="quantity" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="publisher">Publisher</label>
        <Field
          name="publisher"
          type="text"
          class="form-control"
          v-model="book.publisher"
        />
        <ErrorMessage name="publisher" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="published_year">Published Year</label>
        <Field
          name="published_year"
          type="number"
          class="form-control"
          v-model="book.published_year"
        />
        <ErrorMessage name="published_year" class="error-feedback" />
      </div>
      <div class="form-group mt-3">
        <label for="image">Image</label>
        <Field
          name="image"
          type="file"
          class="form-control"
          @change="onFileChange"
        />
        <ErrorMessage name="image" class="error-feedback" />
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
    book: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:book"],
  data() {
    const bookFormSchema = yup.object().shape({
      book_name: yup.string().required("Book name is required"),
      author: yup.string().required("Author is required"),
      price: yup
        .number()
        .required("Price is required")
        .min(0, "Price must be greater than 0"),
      quantity: yup
        .number()
        .required("Quantity is required")
        .min(0, "Quantity must be greater than 0"),
      published_year: yup.number().required("Published year is required"),
      publisher: yup.string().required("Publisher is required"),
    });
    return {
      bookFormSchema,
      selected_file: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.selected_file = event.target.files[0];
    },
    submitBook() {
      const formData = new FormData();
      if (this.selected_file) {
        formData.append("image", this.selected_file);
      }
      // Thêm từng trường của book vào FormData
      formData.append("book_name", this.book.book_name);
      formData.append("author", this.book.author);
      formData.append("book_price", this.book.book_price);
      formData.append("book_quantity", this.book.book_quantity);
      formData.append("published_year", this.book.published_year);
      formData.append("publisher", this.book.publisher);

      this.$emit("submit:book", formData);
    },

    onBack() {
      this.$router.push({ name: "BookList" });
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
}
</style>
