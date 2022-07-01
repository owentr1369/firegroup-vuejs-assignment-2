export default Vue.component("app-header", {
  template: '<h1 class="header_text">{{header}}</h1>',

  data() {
    return {
      header: "Add product",
    };
  },
});
