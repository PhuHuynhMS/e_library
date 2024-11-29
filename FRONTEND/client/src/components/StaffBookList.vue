<script>
export default {
  props: {
    books: { type: Array, default: [] },
  },
  methods: {
    deleteBook(book_id) {
      this.$emit("delete-book", book_id);
    },

    navigateToEditPage(book) {
      this.$router.push({
        name: "EditBook",
        params: { id: book._id },
      });
    },
  },
};
</script>
<template>
  <table class="table-auto border-collapse border">
    <thead>
      <tr>
        <th class="border px-4 py-2">Book ID</th>
        <th class="border px-4 py-2">Title</th>
        <th class="border px-4 py-2">Price</th>
        <th class="border px-4 py-2">Quantity</th>
        <th class="border px-4 py-2">Published Year</th>
        <th class="border px-4 py-2">Publisher</th>
        <th class="border px-4 py-2">Author</th>
        <th class="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.book_id">
        <td class="border px-4 py-2">{{ book.book_id }}</td>
        <td class="border px-4 py-2">{{ book.book_name }}</td>
        <td class="border px-4 py-2">{{ book.book_price }}</td>
        <td class="border px-4 py-2">{{ book.book_quantity }}</td>
        <td class="border px-4 py-2">{{ book.published_year }}</td>
        <td class="border px-4 py-2">
          {{ book.publisher_id.publisher_name }}
        </td>
        <td class="border px-4 py-2">{{ book.author }}</td>
        <td class="border px-4 py-2 d-flex flex-column">
          <button
            class="btn btn-warning text-white mb-2 fixed-width"
            @click="navigateToEditPage(book)"
          >
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button class="btn btn-danger fixed-width" @click="deleteBook(book)">
            <i class="fas fa-trash"></i>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.fixed-width {
  width: 100px;
}
</style>
