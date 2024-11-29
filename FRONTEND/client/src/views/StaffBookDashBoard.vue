<script>
import BookForm from "@/components/BookForm.vue";
import StaffBookList from "@/components/StaffBookList.vue";
import BookService from "@/services/book.service";
import Swal from "sweetalert2";
export default {
  components: {
    BookForm,
    StaffBookList,
  },
  data() {
    return {
      books: [],
    };
  },

  methods: {
    async getAll() {
      try {
        const response = await BookService.getAll();
        this.books = response.data;
        console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBook(book) {
      try {
        const confirmation = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        });
        if (!confirmation.isConfirmed) {
          return;
        }
        const response = await BookService.delete(book._id);
        if (response.status == "success") {
          await Swal.fire({
            title: "Success!",
            text: "Book deleted successfully!",
            icon: "success",
            confirmButtonText: "OK!",
          });
          this.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },

    navigateToCreate() {
      this.$router.push({ name: "AddBook" });
    },
  },

  mounted() {
    this.getAll();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="page mt-3">
      <div class="row">
        <h1 class="text-2xl font-bold mb-6 col-8">List of Books</h1>
        <div class="col-4 d-flex justify-content-end h-25">
          <button
            type="button"
            class="btn btn-primary"
            @click="navigateToCreate"
          >
            <i class="fas fa-plus"></i>
            Add
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <StaffBookList
          v-if="books.length > 0"
          :books="books"
          @delete-book="deleteBook"
        />
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
</style>
