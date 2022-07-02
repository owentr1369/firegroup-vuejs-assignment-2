export default Vue.component("app-footer", {
  template: ` <footer class="footer">
          <div class="footer_left">
            <button class="prev" @click="prevPage">
              <img src="./assets/svg/arrow-left.svg" alt="" />Prev
            </button>
            <button class="next" @click="nextPage">
              Next
              <img src="./assets/svg/arrow-left.svg" alt="" />
            </button>
          </div>
          <div class="footer_right">
            <button class="cancel">Cancel</button>
            <button class="save" >Save</button>
          </div>
        </footer>`,
  props: ["currentPage", "productList"],
  data() {
    return {
      next: true,
      prev: false,
    };
  },
  methods: {
    prevPage: function () {
      this.currentPage -= 1;
    },
    nextPage: function () {
      this.currentPage += 1;
    },
  },
  watch: {
    currentPage() {},
  },
});
