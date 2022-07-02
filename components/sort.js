export default Vue.component("app-sort", {
  template: `<div class="actions_sort">
              <label class="actions_sort-label" for="select">Sort:</label>
              <select class="actions_sort-select" name="" id="select"
              value="sortValue"
              v-on:input="updateSort($event.target.value)">
                <option value="true">Product title A - Z</option>
                <option value="false">Product title Z - A</option>
              </select>
              <img class="actions_sort-arrow" src="./assets/svg/sort.svg" alt="" />
            </div>
          </div>`,
  props: { value: Boolean },
  data() {
    return {
      header: "Add product",
    };
  },
  methods: {
    updateSort: function (value) {
      this.$emit("input", value);
    },
  },
});
