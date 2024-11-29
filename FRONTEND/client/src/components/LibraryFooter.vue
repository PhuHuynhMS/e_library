<template>
  <footer class="footer bg-dark text-light py-4">
    <div class="container">
      <!-- Nội dung chung -->
      <div class="row">
        <div class="col-md-6">
          <p class="mb-0">
            © 2024 Library Management System. All Rights Reserved.
          </p>
          <small>Developed by Kingsley</small>
        </div>

        <div class="col-md-6 text-md-end mt-3 mt-md-0">
          <div>
            <a href="/contact" class="btn btn-outline-light btn-sm"
              >Contact Us</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "LibraryFooter",
};
</script>

<style scoped>
.footer {
  border-top: 1px solid #ddd;
  width: 100%;
}

.footer p {
  font-size: 0.9rem;
  margin-bottom: 0;
}

.footer a {
  font-size: 0.85rem;
}
</style>
