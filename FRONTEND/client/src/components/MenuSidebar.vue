<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

    showBorrowedDocuments() {
      this.updateActiveIndex(0);
    },
    showRenewalDocuments() {
      this.updateActiveIndex(1);
    },
    showReturnedDocuments() {
      this.updateActiveIndex(2);
    },
    showPersonalInfo() {
      this.updateActiveIndex(3);
    },
    showChangePassword() {
      this.updateActiveIndex(4);
    },
  },
};
</script>

<template>
  <div class="list-group">
    <button
      type="button"
      class="list-group-item list-group-item-action fw-bold button-hover"
      :class="{ active: activeIndex === 0 }"
      @click="showBorrowedDocuments"
    >
      <i class="fa-regular fa-note-sticky"></i>
      Currently Borrowed Documents
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action fw-bold button-hover"
      :class="{ active: activeIndex === 1 }"
      @click="showRenewalDocuments"
    >
      <i class="fa-solid fa-calendar-days"></i>
      Renewal Documents
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action fw-bold button-hover"
      :class="{ active: activeIndex === 2 }"
      @click="showReturnedDocuments"
    >
      <i class="fa-solid fa-book"></i>
      Returned Documents
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action fw-bold button-hover"
      :class="{ active: activeIndex === 3 }"
      @click="showPersonalInfo"
    >
      <i class="fa-solid fa-user"></i>
      Personal Information
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action fw-bold button-hover"
      :class="{ active: activeIndex === 4 }"
      @click="showChangePassword"
    >
      <i class="fa-solid fa-key"></i>
      Change Password
    </button>
  </div>
</template>

<style>
.list-group-item.active {
  background-color: #ffc107;
  color: #fff;
  border: none;
}

.button-hover:hover {
  background-color: #ffc107;
  color: #fff;
}
</style>
