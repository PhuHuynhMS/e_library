<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  props: {
    borrowing_details: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const borrowingDetailsSchema = yup.object().shape({
      status: yup.string().required("Status is required"),
      // returned_date: yup.string().when("status", {
      //   is: "RETURNED",
      //   then: yup.string().required("Returned Date is required"),
      //   otherwise: yup.string().nullable(),
      // }),
    });

    return {
      returned_date: "",
      local_borrowing_details: this.borrowing_details,
      borrowingDetailsSchema,
    };
  },

  methods: {
    async updateBorrowingDetails() {
      let updateDoc = {
        status: this.local_borrowing_details.status,
      };
      if (this.local_borrowing_details.status === "RETURNED") {
        updateDoc = {
          returned_date: this.returned_date,
          book_id: this.local_borrowing_details.book.book_id,
          quantity: this.local_borrowing_details.quantity,
        };
      }
      this.$emit("submit:detail", updateDoc);
    },
    formatDate(date) {
      if (!date) return "Ngày không xác định";
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) return "Ngày không hợp lệ";
      return parsedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  emits: ["submit:detail"],
};
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Edit Borrowing Details</h1>

    <!-- Form Section -->
    <!-- Book Details -->
    <div class="mb-6" v-if="borrowing_details">
      <h2 class="text-xl font-semibold mb-2">Book Details</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Book ID:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.book.book_id"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Title:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.book.book_name"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Author:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.book.author"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Publisher:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.book.publisher_id.publisher_name"
            disabled
          />
        </div>
      </div>
    </div>

    <!-- Reader Details -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Reader Details</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Reader ID:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.reader.reader_id"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Reader Name:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.reader.reader_lastname"
            disabled
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Gender:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.reader.reader_gender"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Phone:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.reader.reader_phone"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Date of Birth:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="formatDate(local_borrowing_details.reader.reader_birthday)"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Address:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.reader.reader_address"
            disabled
          />
        </div>
      </div>
    </div>

    <!-- Borrowing Details -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Borrowing Details</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-medium mb-1">Borrowed Date:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="formatDate(local_borrowing_details.borrowed_date)"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Due Date:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="formatDate(local_borrowing_details.due_date)"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Quantity:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.quantity"
            disabled
          />
        </div>
        <div>
          <label class="block font-medium mb-1">Issued By:</label>
          <input
            type="text"
            class="form-input w-full"
            :value="local_borrowing_details.issued_by.staff_name"
            disabled
          />
        </div>
        <Form
          @submit="updateBorrowingDetails"
          :validation-schema="borrowingDetailsSchema"
        >
          <div class="form-group">
            <label class="block font-medium mb-1">Status:</label>
            <Field
              as="select"
              name="status"
              id="status"
              class="form-control w-full"
              v-model="local_borrowing_details.status"
            >
              <option value="BORROWED">Borrowed</option>
              <option value="OVERDUE">Overdue</option>
              <option value="RETURNED">Returned</option>
            </Field>
            <ErrorMessage name="status" class="error-feedback" />
          </div>
          <div
            class="form-group"
            v-if="local_borrowing_details.status == 'RETURNED'"
          >
            <label class="block font-medium mb-1">Returned Date:</label>
            <Field
              type="date"
              name="returned_date"
              id="returned_date"
              class="form-control w-full"
              v-model="returned_date"
            ></Field>
            <ErrorMessage name="returned_date" class="error-feedback" />
          </div>
          <!-- Action Buttons -->

          <div class="d-flex justify-content-end mt-3 form-group">
            <button
              type="button"
              class="btn btn-secondary me-2"
              @click="$router.back()"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
