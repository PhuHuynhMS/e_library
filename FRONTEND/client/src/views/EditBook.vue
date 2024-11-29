<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import BookService from "@/services/book.service";
import Swal from "sweetalert2";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const bookSchema = yup.object().shape({
      book_name: yup.string().required("Book name is required"),
      book_price: yup
        .number()
        .required("Book price is required")
        .min(0, "Price must be greater than 0"),
      book_quantity: yup
        .number()
        .required("Book quantity is required")
        .min(0, "Quantity must be greater than 0"),
      published_year: yup.string().required("Published year is required"),
      author: yup.string().required("Author is required"),
    });

    return {
      book: {
        book_name: "",
        book_price: 0,
        book_quantity: 0,
        published_year: 0,
        author: "",
        publisher_id: {
          publisher_name: "",
        },
        image_url: "",
      },
      bookSchema,
      selectedFile: null,
      previewImage: "",
    };
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth()).padStart(2, "0");
      const year = String(date.getFullYear());
      return day + "/" + month + "/" + year;
    },

    async fetchBook() {
      try {
        const response = await BookService.getById(this.$route.params.id);

        this.book = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },

    async updateBook() {
      try {
        const formData = new FormData();

        formData.append("book_name", this.book.book_name);
        formData.append("book_price", this.book.book_price);
        formData.append("book_quantity", this.book.book_quantity);
        formData.append("published_year", parseInt(this.book.published_year));
        formData.append("author", this.book.author);

        if (this.selectedFile) {
          formData.append("image", this.selectedFile); // Thêm ảnh nếu có
        }

        const response = await BookService.update(
          this.$route.params.id,
          formData
        );

        if (response.status == "success") {
          await Swal.fire({
            title: "Success!",
            text: "Book updated successfully!",
            icon: "success",
            confirmButtonText: "OK!",
          });
          this.$router.push({ name: "BookList" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Cancel() {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes! Do you want to leave?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, leave!",
        cancelButtonText: "No, stay",
      });

      if (result.isConfirmed) {
        this.$router.push({ name: "BookList" });
      }
    },
  },

  created() {
    this.fetchBook();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="page mt-3">
      <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4">Edit Book Details</h1>

        <!-- Form Section -->

        <Form @submit="updateBook" :validation-schema="bookSchema">
          <div class="mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium mb-1">Book title:</label>
                <Field
                  name="book_name"
                  type="text"
                  class="form-input w-full"
                  v-model="book.book_name"
                ></Field>
                <ErrorMessage name="book_name" class="error-feedback" />
              </div>
              <div>
                <label class="block font-medium mb-1">Price:</label>
                <Field
                  name="book_price"
                  type="number"
                  class="form-input w-full"
                  v-model="book.book_price"
                ></Field>
              </div>
              <ErrorMessage name="book_price" class="error-feedback" />

              <div>
                <label class="block font-medium mb-1">Quantity:</label>
                <Field
                  name="book_quantity"
                  type="number"
                  class="form-input w-full"
                  v-model="book.book_quantity"
                ></Field>
                <ErrorMessage name="book_quantity" class="error-feedback" />
              </div>
              <div>
                <label class="block font-medium mb-1">Published Year:</label>
                <Field
                  name="published_year"
                  type="text"
                  class="form-input w-full"
                  v-model="book.published_year"
                ></Field>
                <ErrorMessage name="published_year" class="error-feedback" />
              </div>
              <div>
                <label class="block font-medium mb-1">Author:</label>
                <Field
                  name="author"
                  type="text"
                  class="form-input w-full"
                  v-model="book.author"
                ></Field>
                <ErrorMessage name="author" class="error-feedback" />
              </div>

              <div>
                <label class="block font-medium mb-1">Publisher:</label>
                <input
                  type="text"
                  class="form-input w-full"
                  :value="book.publisher_id.publisher_name"
                  disabled
                />
              </div>

              <!-- Preview ảnh -->
              <div>
                <label class="block font-medium mb-1">Current Image:</label>
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt="Selected Image"
                  class="img-thumbnail mb-2"
                />
                <img
                  v-else
                  :src="'http://localhost:3000' + book.image_url"
                  alt="Current Book Image"
                  class="img-thumbnail mb-2"
                />
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="onFileSelected"
                />
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="d-flex justify-content-end mt-3 form-group">
            <button
              type="button"
              class="btn btn-secondary me-2"
              @click="Cancel()"
            >
              Cancel
            </button>
            <button class="btn btn-primary">Save</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  text-align: left;
  max-width: 100vw;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.container {
  max-width: 800px;
}
.form-input,
.form-select {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
}

.error-feedback {
  color: red;
}
</style>
