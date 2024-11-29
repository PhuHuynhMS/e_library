<template>
  <h1 class="text-center mt-3 fs-4 fw-bold text-uppercase text-light">
    Book List
  </h1>
  <div class="wrapper">
    <div class="page row mt-3">
      <div class="col-md mt-3 p-0">
        <div class="row">
          <div class="col-4">
            <InputSearch v-model="searchText" />
          </div>
        </div>
        <div class="row mt-3" v-if="filteredBooksCount > 0 && searchText">
          <p>Found {{ filteredBooksCount }} books</p>
        </div>
        <div class="row mt-3">
          <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" />
          <p v-else>Books not found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";
import { useRoute } from "vue-router";
import { toRaw } from "vue";

export default {
  components: {
    InputSearch,
    BookList,
  },

  data() {
    return {
      route: useRoute(),
      books: [],
      searchText: "",
    };
  },
  computed: {
    bookStrings() {
      return this.books.map((book, index) => {
        const { book_name, book_price, author, published_year } = book;
        return [book_name, book_price, author, published_year].join("");
      });
    },

    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) => {
        return this.bookStrings[index].includes(this.searchText);
      });
    },
    filteredBooksCount() {
      const filteredBooks = toRaw(this.filteredBooks);

      return filteredBooks.length;
    },
  },

  methods: {
    async retrieveBooks() {
      try {
        const response = await BookService.getAll();

        if (response.status == "success") {
          this.books = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBooks();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

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

@media (max-width: 768px) {
  .page {
    padding: 15px;
    max-width: 100%;
  }

  .found-books {
    font-size: 1rem;
  }
}
</style>
