export default Vue.component("app-footer", {
  template: ` <footer class="footer">
          <div class="footer_left">
            <button class="prev">
              <img src="./assets/svg/arrow-left.svg" alt="" />Prev
            </button>
            <button class="next">
              Next
              <img src="./assets/svg/arrow-left.svg" alt="" />
            </button>
          </div>
          <div class="footer_right">
            <button class="cancel">Cancel</button>
            <button class="save">Save</button>
          </div>
        </footer>`,

  data() {
    return {};
  },
});
