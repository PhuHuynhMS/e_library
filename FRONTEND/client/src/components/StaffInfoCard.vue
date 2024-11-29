<script>
export default {
  props: {
    staff: { type: Object, default: null },
  },
};
</script>

<template>
  <div class="card shadow-lg border-0">
    <div class="card-header text-white bg-primary">
      <h4 class="mb-0">General Information</h4>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ staff.staff_name || "Unknown Staff" }}
      </h5>
      <div class="mt-4">
        <p class="card-text">
          <strong><i class="fas fa-id-badge me-2"></i>Staff ID:</strong>
          {{ staff.staff_id || "N/A" }}
        </p>
        <p class="card-text">
          <strong><i class="fas fa-map-marker-alt me-2"></i>Address:</strong>
          {{ staff.staff_address || "Not Available" }}
        </p>
        <p class="card-text">
          <strong><i class="fas fa-phone me-2"></i>Phone:</strong>
          {{ staff.staff_phone || "No Phone Number" }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  border-bottom: 2px solid #fff;
}

.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-footer {
  border-top: 1px solid #eaeaea;
}
</style>
