export default Vue.component("app-actions", {
  template: ` <div class="actions">
            <div class="actions_search">
              <img src="./assets/svg/search.svg" alt="" class="actions_search-icon"/>
              <input 
                type="text"
                placeholder="Search product by name, tag, id..."
                class="actions_search-input"
                v-on:input="updateValue($event.target.value)"
              />
            </div>
          `,
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
