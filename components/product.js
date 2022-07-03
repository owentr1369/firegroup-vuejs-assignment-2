export default Vue.component("app-product", {
  template: ` <div class="products">
                <div class="products_header">
                  <div class="products_header-all">
                <input type="checkbox" id="" />
                <span>Product</span>
              </div>
              <span class="products_header-price">Price</span>
            </div>
            <div class="products_list">
              <div
                v-for="(product, index) in productList.slice(firstItemIndex,lastItemIndex)"
                :key="product.id"
                class="product"
                @click="addToSeleted"
              >
                <div class="product_main">
                  <label :for="product.id" class="checkbox_container">
                    <input type="checkbox" name="" :id="product.id" />
                    <span class="checkmark"></span>
                  </label>

                  <label :for="product.id">
                    <img :src="product.image" :alt="product.name" />
                    <div class="product_main-body">
                      <span class="product_main-body-name"
                        >{{product.name}}</span
                      >
                      <h1>{{index}}</h1>
                      <span class="product_main-body-id">{{product.id}}</span>
                    </div>
                  </label>
                </div>
                <span class="product_price">$ {{product.price}}</span>
              </div>
            </div>
                   <div class="footer">
            <div class="footer_left">
              <button class="prev" @click="prevPage" :disabled="stopPrev" :class="!stopPrev ? 'active' : ''">
                <img src="./assets/svg/arrow-left.svg" alt="" />Prev
              </button>
              <button class="next" @click="nextPage" :disabled="stopNext" :class="!stopNext ? 'active' : ''">
                Next
                <img src="./assets/svg/arrow-left.svg" alt="" />
              </button>
            </div>
            <div class="footer_right">
              <button class="cancel">Cancel</button>
              <button class="save">Save</button>
            </div>
          </div>
          </div>
           `,
  props: {
    productList: Array,
    searchValue: String,
    aToZSort: Boolean,
  },
  data() {
    return {
      newList: [],
      isSearching: false,
      maxPage: "",
      firstItemIndex: 0,
      lastItemIndex: 10,
      currentPage: 1,
      stopNext: false,
      stopPrev: true,
    };
  },
  methods: {
    addToSeleted: function (e) {
      console.log(e);
    },
    prevPage: function () {
      this.currentPage--;
    },
    nextPage: function () {
      this.currentPage++;
    },
  },
  watch: {
    searchValue() {
      console.log("this.searchValue :>> ", this.searchValue);
      if (this.searchValue.length > 0) {
        this.isSearching = true;
        this.productList = this.productList.filter((product) => {
          return (
            product.name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            product.id.includes(this.searchValue.toLowerCase())
          );
        });
      }
    },
    aToZSort() {
      if (this.aToZSort == true) {
        this.productList = this.productList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (this.aToZSort == false) {
        this.productList = this.productList
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      }
    },
    productList() {
      this.maxPage = Math.ceil(this.productList.length / 10);
      console.log("this.maxPage :>> ", this.maxPage);
    },
    currentPage() {
      this.firstItemIndex = (this.currentPage - 1) * 10;
      this.lastItemIndex = this.currentPage * 10;
      if (this.currentPage == this.maxPage) {
        this.stopNext = true;
      } else {
        this.stopNext = false;
      }
      if (this.currentPage > 1) {
        this.stopPrev = false;
      } else if (this.currentPage <= 1) {
        this.stopPrev = true;
      }
    },
  },
});
