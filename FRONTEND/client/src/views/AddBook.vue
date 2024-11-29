<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      book: {
        book_name: "",
        author: "",
        book_price: null,
        book_quantity: null,
        published_year: null,
        publisher: "",
        image: null,
      },
    };
  },
  components: {
    BookForm,
  },
  methods: {
    async submitBook(book) {
      try {
        const response = await BookService.create(book);
        if (response.status == "success") {
          await Swal.fire({
            icon: "success",
            title: "Book Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({ name: "BookList" });
        }
      } catch (error) {
        console.log(error);

        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="page mt-3">
      <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4 text-center">Add Book Details</h1>
        <!-- Form Section -->
        <BookForm @submit:book="submitBook" :book="book" />
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
