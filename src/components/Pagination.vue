<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination" >
        <li :class="{ disabled: !pages.has_pre }" class="page-item">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Previous"
            @click.prevent="$emit('get-datas', pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li 
          class="page-item"
          v-for="(item, key) in pages.total_pages"
          :key="key"
          :class="{ active: item === pages.current_page }"
        >
          <span class="page-link" v-if="item === pages.current_page">
            {{ item }}
          </span>
          <a
            class="page-link"
            v-else
            href="#"
            @click.prevent="$emit('get-datas', item)"
          >
            {{ item }}
          </a>
        </li>
        <li 
          class="page-item"
          :class="{ disabled: !pages.has_next }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="$emit('get-datas', pages.current_page + 1)"
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
  // Products.vue 的 pagination 傳送進來
  props:['pages'],
}
</script>