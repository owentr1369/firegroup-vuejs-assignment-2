export default Vue.component("app-actions", {
  template: ` <div class="actions">
            <div class="actions_search">
              <img src="./assets/svg/search.svg" alt="" class="actions_search-icon"/>
              <input 
                type="text"
                placeholder="Search product by name, tag, id..."
                class="actions_search-input"
                v-bind:value="value" 
                v-on:input="updateValue($event.target.value)"
              />
            </div>
            <div class="actions_sort">
              <label class="actions_sort-label" for="select">Sort:</label>
              <select class="actions_sort-select" name="" id="select">
                <option value="atoz" selected>Product title A - Z</option>
                <option value="ztoa">Product title Z - A</option>
              </select>
              <img class="actions_sort-arrow" src="./assets/svg/sort.svg" alt="" />
            </div>
          </div>`,
  props: { value: String },
  data() {
    return {};
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
});
