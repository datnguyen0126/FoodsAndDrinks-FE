<template>
  <div>
    <ul class="pagination">
      <li :class="['page-item',{disabled: isInFirstPage}]">
        <a class="page-link" @click="onClickFirstPage">First</a>
      </li>
      <li :class="['page-item',{disabled: isInFirstPage}]">
        <a class="page-link" @click="onClickPreviousPage">Previous</a>
      </li>
      <li v-for="page in pages" class="page-item" :key="page.name">
        <a
          class="page-link"
          v-if="page.name>0"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >{{ page.name }}</a>
      </li>
      <li :class="['page-item',{disabled: isInLastPage}]">
        <a class="page-link" @click="onClickNextPage">Next</a>
      </li>
      <li :class="['page-item',{disabled: isInLastPage}]">
        <a type="button" class="page-link" @click="onClickLastPage">Last</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      console.log(this.currentPage - 1);
      this.$emit(
        "pagechanged",
        this.currentPage - 1 > 0 ? this.currentPage - 1 : 1
      );
    },
    onClickPage(page) {
      if (page > 0) this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../styles/pagination.scss";
</style>
