<script setup>
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { computed } from "vue";
import InputSearch from "./InputSearch.vue";

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
  }));
});

const getStatusClass = (status) => {
  switch (status) {
    case "OVERDUE":
      return "text-danger fw-bold";
    case "BORROWED":
      return "text-success fw-bold";
    case "RENEWAL":
      return "text-warning fw-bold";
    default:
      return "text-dark fw-bold";
  }
};

const deleteDetail = async (detail) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (!confirmation.isConfirmed) {
    return;
  }
  emit("delete", detail);
};

const router = useRouter();

const navigateToEditPage = (detail) => {
  router.push({
    name: "EditBorrowingDetails",
    params: {
      id: detail._id,
    },
  });
};

const emit = defineEmits(["delete"]);
</script>

<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-6">List of Unreturned Books</h1>
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse border">
        <thead>
          <tr>
            <th class="border px-4 py-2">Title</th>
            <th class="border px-4 py-2">Reader Id</th>
            <th class="border px-4 py-2">Borrowed Date</th>
            <th class="border px-4 py-2">Due Date</th>
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
              <span :class="getStatusClass(book.status)">{{
                book.status
              }}</span>
            </td>
            <td class="border px-4 py-2 d-flex flex-column">
              <button
                class="btn btn-warning text-white mb-2 fixed-width"
                @click="navigateToEditPage(book)"
              >
                <i class="fas fa-edit"></i>
                Edit
              </button>
              <button
                class="btn btn-danger fixed-width"
                @click="deleteDetail(book)"
              >
                <i class="fas fa-trash"></i>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.fixed-width {
  width: 100px;
}
</style>
