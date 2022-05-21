<template>
  <div class="toast-container position-fixed end-0 float-end" style="z-index: 1500;top: 128px">
    <div v-for="(msg, key) in messages" :key="key" class="toast show" role="alert">
      <div class="toast-header bg-light text-white" style="height:50px;">
        <!-- <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span> -->
        <i
          class="bi bi-exclamation-circle-fill p-2 rounded me-2 d-inline-block text-muted"
          style="font-size:1.25rem;"
        ></i>
        <strong class="me-auto text-muted fw-normal" style="font-size:1rem;">{{ msg.title }}</strong>
        <button
          type="button"
          class="close border-n"
          @click="clearToast(key)"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="toast-body text-center" v-if="msg.content" style="z-index: 1500;font-size:1rem;">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
  unmounted() {
    this.emitter.off('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
