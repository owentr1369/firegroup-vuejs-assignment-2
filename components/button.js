Vue.component("btn", {
  template: '<button @click="count++"> {{count}} </button>',

  data() {
    return {
      count: 0,
    };
  },
});
