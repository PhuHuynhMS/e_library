<script>
import BookCard from "./BookCard.vue";
export default {
  components: {
    BookCard,
  },
  props: {
    books: { type: Array, default: [] },
  },
};
</script>
<template>
  <div v-for="(book, index) in books" :key="index" class="col-md-3 mb-3">
    <BookCard :book="book" />
  </div>
</template>
