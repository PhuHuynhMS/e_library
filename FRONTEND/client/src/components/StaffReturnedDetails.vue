<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  details: {
    type: Array,
    required: true,
  },
});

const selectedDetail = ref(null);

const openModal = (detail) => {
  selectedDetail.value = detail;
};

const emit = defineEmits(["delete"]);

const deleteDetails = () => {
  if (selectedDetail.value) {
    emit("delete", selectedDetail.value);
    selectedDetail.value = null;
  }
};

const formattedDetails = computed(() => {
  return props.details.map((book) => ({
    ...book,
    borrowed_date: new Date(book.borrowed_date).toLocaleDateString("vi-VN"),
    due_date: new Date(book.due_date).toLocaleDateString("vi-VN"),
    returned_date: new Date(book.returned_date).toLocaleDateString("vi-VN"),
  }));
});
</script>

<template>
  <div v-if="details.length > 0">
    <h1 class="text-2xl font-bold mb-6">List of Returned Books</h1>
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse border">
        <thead>
          <tr>
            <th class="border px-4 py-2">Title</th>
            <th class="border px-4 py-2">Reader Id</th>
            <th class="border px-4 py-2">Borrowed Date</th>
            <th class="border px-4 py-2">Due Date</th>
            <th class="border px-4 py-2">Returned Date</th>
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
              {{ book.returned_date }}
            </td>
            <td class="border px-4 py-2">
              <button
                class="btn btn-danger fixed-width"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                @click="openModal(book)"
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
  <div v-else>
    <p class="text-center mt-3 mb-3 text-muted fs-4 fw-bold">
      No returned books
    </p>
  </div>

  <!-- Confirmation Modal -->
  <Teleport to="#modal">
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel2">
              Delete Confirmation
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">Are you sure you want to delete this?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="deleteDetails"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.fixed-width {
  width: 100px;
}
</style>
