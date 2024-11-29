<template>
  <div class="form-container">
    <Form @submit="submitForm" :validation-schema="bookBorrowingFormSchema">
      <div class="form-group text-end">
        <button class="btn btn-light" @click="resetForm">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
      </div>
      <!-- Book ID and Quantity -->
      <div v-for="(book, index) in books" :key="index">
        <div class="form-group">
          <label :for="'books[' + index + '].book_id'" class="form-label"
            >Book ID</label
          >
          <Field
            type="text"
            class="form-control"
            :name="'books[' + index + '].book_id'"
            v-model="book.book_id"
          ></Field>
          <ErrorMessage
            :name="'books[' + index + '].book_id'"
            class="error-feedback"
          />
        </div>
        <div class="form-group">
          <label :for="'books[' + index + '].quantity'">Quantity</label>
          <Field
            :name="'books[' + index + '].quantity'"
            type="number"
            class="form-control"
            v-model="book.quantity"
          ></Field>
          <ErrorMessage
            :name="'books[' + index + '].quantity'"
            class="error-feedback"
          />
        </div>
        <div class="text-end">
          <button
            v-if="books.length > 1"
            type="button"
            class="btn btn-danger mt-2"
            @click="removeBook(index)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <button type="button" class="btn btn-primary mt-2" @click="addMoreBook">
        <i class="fas fa-plus"></i>
      </button>
      <!-- Reader ID -->
      <div class="form-group mt-3">
        <label for="reader_id" class="form-label">Reader ID</label>
        <Field
          name="reader_id"
          type="text"
          class="form-control"
          v-model="reader.reader_id"
        ></Field>
        <ErrorMessage name="reader_id" class="error-feedback" />
      </div>
      <!-- Borrowed Date -->
      <div class="form-group mt-3">
        <label for="borrowed_date" class="form-label">Borrowed Date</label>
        <Field
          name="borrowed_date"
          type="date"
          class="form-control"
          v-model="borrowed_date"
        ></Field>
        <ErrorMessage name="borrowed_date" class="error-feedback" />
      </div>
      <!-- Due Date -->
      <div class="form-group mt-3">
        <label for="due_date" class="form-label">Due Date</label>
        <Field
          name="due_date"
          type="date"
          class="form-control"
          v-model="due_date"
        ></Field>
        <ErrorMessage name="due_date" class="error-feedback" />
      </div>
      <!-- Status -->
      <div class="form-group mt-3">
        <label for="status" class="form-label">Status</label>
        <Field
          as="select"
          name="status"
          type="text"
          class="form-control"
          v-model="status"
        >
          <option value="BORROWED">BORROWED</option>
        </Field>
        <ErrorMessage name="status" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-100 mt-3">Submit</button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

const books = ref([
  {
    book_id: "",
    quantity: 1,
  },
]);

const reader = ref({
  reader_id: "",
});

const borrowed_date = ref("");
const due_date = ref("");

const status = ref("BORROWED");

const bookBorrowingFormSchema = yup.object().shape({
  books: yup.array().of(
    yup.object().shape({
      book_id: yup.string().required("Book ID is required"),
      quantity: yup
        .number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
    })
  ),
  reader_id: yup
    .string()
    .required("Reader ID is required")
    .length(5, "Reader ID must be 5 characters"),
  borrowed_date: yup.string().required("Borrowed Date is required"),
  due_date: yup.string().required("Due Date is required"),
  status: yup.string().required("Status is required"),
});

const addMoreBook = () => {
  books.value.push({
    book_id: "",
    quantity: 1,
  });
};

const removeBook = (index) => {
  books.value.splice(index, 1);
};

const resetForm = () => {
  books.value = [
    {
      book_id: "",
      quantity: 1,
    },
  ];
  reader.value = {
    reader_id: "",
  };
  borrowed_date.value = "";
  due_date.value = "";
  status.value = "BORROWED";
};

const emit = defineEmits(["submit"]);

const submitForm = (values) => {
  emit("submit", values);
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.error-feedback {
  color: red;
}
</style>
