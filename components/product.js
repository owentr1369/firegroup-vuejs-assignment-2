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
                v-for="product in newList"
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
                      <span class="product_main-body-id">{{product.id}}</span>
                    </div>
                  </label>
                </div>
                <span class="product_price">$ {{product.price}}</span>
              </div>
            </div>
          </div>`,
  props: ["productList", "searchValue"],
  data() {
    return {
      newList: [],
    };
  },
  methods: {
    addToSeleted: function (e) {
      console.log(e);
    },
  },
  watch: {
    searchValue() {
      this.newList = this.productList.filter((product) => {
        return (
          product.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          product.id.includes(this.searchValue.toLowerCase())
        );
      });
    },
  },
});
