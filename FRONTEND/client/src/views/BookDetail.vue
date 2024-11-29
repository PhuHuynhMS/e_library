<script>
import BookService from "@/services/book.service";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: null,
    };
  },

  created() {
    this.fetchBookById(this.id);
  },

  methods: {
    async fetchBookById(id) {
      try {
        const response = await BookService.getById(id);
        if (response.status == "success") {
          this.book = response.data;
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    },
  },
};
</script>
<template>
  <div class="container mt-3">
    <div class="header">
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
    </div>

    <div class="tabs d-flex flex-column">
      <button class="tab active w-25">General</button>
    </div>

    <div class="content">
      <div class="left">
        <img
          :src="'http://localhost:3000' + book.image_url"
          alt="Thumbnail"
          class="thumbnail"
          height="500"
        />
      </div>
      <div class="right">
        <h1 class="title">{{ book.book_name }}</h1>
        <p><strong>Book Identifier:</strong> {{ book.book_id }}</p>
        <p>
          <strong>Publishing Information:</strong>
          {{ book.publisher_id.publisher_name }},
          {{ book.publisher_id.publisher_address }},
          {{ book.published_year }}
        </p>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Quantity:</strong> {{ book.book_quantity }}</p>
        <p><strong>Price:</strong> {{ book.book_price }} VND</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.back-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.header-options {
  display: flex;
  gap: 10px;
}

.option-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.tab {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #f8f9fa;
  border: none;
  color: #333;
}

.tab.active {
  background-color: #d4af37;
  color: white;
}

.content {
  display: flex;
  gap: 15px;
}

.left .thumbnail {
  width: 200px;
  height: auto;
  border: 1px solid #ddd;
}

.right {
  flex: 1;
}
</style>
