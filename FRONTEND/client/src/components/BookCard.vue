<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <router-link
    :to="{
      name: 'BookDetail',
      params: {
        id: book._id,
      },
    }"
    class="text-decoration-none card-height"
  >
    <div class="card book-card shadow-sm">
      <!-- Icon hoặc hình ảnh -->
      <img
        :src="'http://localhost:3000' + book.image_url"
        class="card-img-top"
        alt="Book Image"
      />

      <!-- Nội dung -->
      <div class="card-body">
        <h5 class="card-title text-center">{{ book.book_name }}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>Author:</strong> {{ book.author }}
          </li>
          <li class="list-group-item">
            <strong>Publishing information:</strong>
            {{ book.publisher_id.publisher_name }},
            {{ book.published_year }}
          </li>
          <li class="list-group-item">
            <strong>Price:</strong> {{ book.book_price }} VND
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.book-card {
  width: 18rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.card-header {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 60px;
  height: 60px;
  color: #6c757d;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  height: 96px;
}

.list-group-item {
  font-size: 0.9rem;
}
</style>
