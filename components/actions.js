export default Vue.component("app-actions", {
  template: ` <div class="actions">
            <div class="actions_search">
              <img src="./assets/svg/search.svg" alt="" class="actions_search-icon"/>
              <input 
                type="text"
                placeholder="Search product by name, tag, id..."
                class="actions_search-input"
              />
            </div>
            <div class="actions_sort">
              <label class="actions_sort-label" for="">Sort:</label>
              <select class="actions_sort-select" name="" id="">
                <option value="atoz" selected>Product title A - Z</option>
                <option value="ztoa">Product title Z - A</option>
              </select>
              <img class="actions_sort-arrow" src="./assets/svg/sort.svg" alt="" />
            </div>
          </div>`,

  data() {
    return {};
  },
});
