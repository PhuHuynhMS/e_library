<script setup>
import Swal from "sweetalert2";
import { computed } from "vue";

const props = defineProps({
  details: {
    type: Array,
    required: true,
  },
});

const formattedDetails = computed(() => {
  return props.details.map((book) => ({
    ...book,
    borrowed_date: new Date(book.borrowed_date).toLocaleDateString("vi-VN"),
    due_date: new Date(book.due_date).toLocaleDateString("vi-VN"),
    returned_date: new Date(book.returned_date).toLocaleDateString("vi-VN"),
    renewal_request_date: new Date(
      book.renewal_request_date
    ).toLocaleDateString("vi-VN"),
  }));
});

const rejectDetails = async (detail) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, reject it!",
    cancelButtonText: "No, cancel!",
  });

  if (!confirmation.isConfirmed) {
    return;
  }
  emit("reject", detail);
};

const emit = defineEmits(["reject", "renew"]);

const acceptRenewalRequests = async (book) => {
  const { value: date } = await Swal.fire({
    title: "select due date",
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    input: "date",
    didOpen: () => {
      const today = new Date().toISOString();
      Swal.getInput().min = today.split("T")[0];
    },
  });
  if (date) {
    book.due_date = date;
    emit("renew", book);
  }
};
</script>

<template>
  <div v-if="details.length > 0">
    <h1 class="text-2xl font-bold mb-6">List of Renewal Requests</h1>
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse border">
        <thead>
          <tr>
            <th class="border px-4 py-2">Title</th>
            <th class="border px-4 py-2">Reader Id</th>
            <th class="border px-4 py-2">Borrowed Date</th>
            <th class="border px-4 py-2">Due Date</th>
            <th class="border px-4 py-2">Renewal Request Date</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in formattedDetails" :key="book.book_id">
            <td class="border px-4 py-2">{{ book.book.book_name }}</td>
            <td class="border px-4 py-2">
              {{ book.reader.reader_id }}
            </td>
            <td class="border px-4 py-2">
              {{ book.borrowed_date }}
            </td>
            <td class="border px-4 py-2">
              {{ book.due_date }}
            </td>
            <td class="border px-4 py-2">
              {{ book.renewal_request_date }}
            </td>
            <td class="border px-4 py-2">{{ book.status }}</td>
            <td class="border px-4 py-2 d-flex flex-column">
              <button
                class="btn btn-success mb-2 action-btn"
                @click="acceptRenewalRequests(book)"
              >
                <i class="fas fa-check"></i>
                Accept
              </button>
              <button
                class="btn btn-danger action-btn"
                @click="rejectDetails(book)"
              >
                <i class="fa-solid fa-xmark"></i>
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else>
    <p class="text-center mt-3 mb-3 text-muted fs-4 fw-bold">
      No renewal requests found.
    </p>
  </div>
</template>

<style scoped>
.action-btn {
  width: 100px;
}
</style>
