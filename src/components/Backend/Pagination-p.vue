<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination" >
        <!-- :class="{ 'disabled':!pages.has_prc } 這個時候的資料已經在 pages 裡面 -->
        <!-- 發現必須先寫 :class="{ disabled: !pages.has_pre }" 再寫 class="page-item" Previous 才有反應 -->
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
  // methods: {
  //   updatePage(page) {
  //     // emit 觸發 Products.vue 的 getProducts
  //     // 並且代入 getProducts 的參數 page
  //     this.$emit('emitPages', page);
  //   },    
  // },
}
</script>