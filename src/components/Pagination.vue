<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example ">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Previous"
            @click.prevent="updatePage( pages.current_page - 1 )"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li 
          class="page-item"
          v-for="page in pages.total_pages" :key="page"
          :class="{ active: pages === pages.current_page }"
        >
          <span class="page-link" v-if="page === pages.current_page">
            {{ page }}
          </span>
          <a
            class="page-link"
            v-else
            href="#"
            @click.prevent="updatePage(page)"
          >
            {{ page }}
          </a>
        </li>
        <!-- :class="{ disabled: !pages.has_next }" 沒有下一頁的時候 -->
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Next"
            @click.prevent="updatePage( pages.current_page + 1 )"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emitPages', page);
    },
  },
}
</script>