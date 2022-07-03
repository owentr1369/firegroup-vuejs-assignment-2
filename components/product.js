export default Vue.component("app-product", {
  template: ` <div class="products">
                <div class="products_header">
                  <div class="products_header-all">
                <input id="numberSelected" type="checkbox" v-model="hasProducts" :checked="selectedProducts.length>0"/>
                <label for="numberSelected" v-if="selectedProducts.length==0">Product</label>
                      <label for="numberSelected" v-else-if="selectedProducts.length==1">1 Product seleted</label>
                            <label for="numberSelected" v-else>{{selectedProducts.length}} Products selected</label>
                
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
              <button class="cancel" @click="cancel">Cancel</button>
              <button class="save" @click="save">Save</button>
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
      isSearching: false,
      maxPage: "",
      firstItemIndex: 0,
      lastItemIndex: 10,
      currentPage: 1,
      stopNext: false,
      stopPrev: true,
      selectedProducts: [],
      hasProducts: false,
    };
  },
  methods: {
    addToSeleted: function (e) {
      let selectedId = e.target.id;
      if (selectedId !== "") {
        this.selectedProducts.push(selectedId);
        if (
          this.selectedProducts.filter(
            (dupliProduct) => dupliProduct == selectedId
          ).length == 2
          // Find duplicated ID that need to be removed
        ) {
          this.selectedProducts = this.selectedProducts.filter(
            (dupliProduct) => dupliProduct !== selectedId
          );
          // Remove unchecked product ID
          console.log("this.selectedProducts :>> ", this.selectedProducts);
        }
      }
    },
    prevPage: function () {
      this.currentPage--;
    },
    nextPage: function () {
      this.currentPage++;
    },
    cancel: function () {
      console.log("Cancel");
    },
    save: function () {
      console.log("Save");
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(this.selectedProducts)
      );
    },
  },
  created() {
    this.selectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
  },
  mounted() {
    // check selected products
    if (this.selectedProducts.length > 0) {
      this.selectedProducts.forEach((item) => {
        setTimeout(function () {
          document.getElementById(String(item)).checked = true;
        }, 100);
      });
    }

    if (this.selectedProducts.length > 0) {
      // If have >0 product => check
      this.countedProducts = true;
    }
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
      // check selected products
      if (this.selectedProducts.length > 0) {
        this.selectedProducts.forEach((item) => {
          setTimeout(function () {
            document.getElementById(String(item)).checked = true;
          }, 100);
        });
      }
    },
    selectedProducts() {
      if (this.selectedProducts.length > 0) {
        this.hasProducts = true;
      } else {
        this.hasProducts = false;
      }
    },
    hasProducts() {
      if (this.hasProducts == false) {
        async function removeItems(arr) {
          return await arr.map((item) => {
            return (document.getElementById(String(item)).checked = false);
          });
        }
        this.selectedProducts = removeItems(this.selectedProducts);
        this.selectedProducts = [];
        console.log("this.selectedProducts :>> ", this.selectedProducts);
        // this.selectedProducts = [];
        // this.selectedProducts.forEach((item) => {
        //   document.getElementById(String(item)).checked = false;
        // });
      } else {
        console.log("true");
        if (this.selectedProducts.length == 0) {
          this.productList.forEach((item) => {
            this.selectedProducts.push(item.id);
          });
          this.selectedProducts.forEach((item) => {
            document.getElementById(String(item)).checked = true;
          });
        }
      }
    },
  },
});
