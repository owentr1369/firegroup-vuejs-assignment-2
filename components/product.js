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
      console.log("Saved");
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(this.selectedProducts)
      ); // Save Data to LocalStorage
    },
  },
  created() {
    this.selectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    // Get Data from LocalStorage, if LocalStorage empty => []
  },
  mounted() {
    // check selected products
    if (this.selectedProducts.length > 0) {
      this.selectedProducts.forEach((item) => {
        setTimeout(function () {
          document.getElementById(String(item)).checked = true;
        }, 10);
      });
    }

    if (this.selectedProducts.length > 0) {
      // If have > 0 product => check input
      this.countedProducts = true;
    }
  },
  watch: {
    searchValue() {
      if (this.searchValue.length > 0) {
        // Do searching when type
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
      this.selectedProducts.forEach((item) => {
        // Check input after search and filt
        setTimeout(function () {
          document.getElementById(String(item)).checked = true;
        }, 10);
      });
    },

    aToZSort() {
      // Sort by product name
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
      // Calculate the max page, 10 items/page
      // Example: 15 items => 2 pages, 122 items => 13 pages
    },

    currentPage() {
      this.firstItemIndex = (this.currentPage - 1) * 10;
      this.lastItemIndex = this.currentPage * 10;
      // Items of nth page
      // Example: 2nd page: first item index = 10, last item index = 19
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
      // Disable prev or next button when reach limit
      if (this.selectedProducts.length > 0) {
        // Check selected products after change page
        this.selectedProducts.forEach((item) => {
          setTimeout(function () {
            document.getElementById(String(item)).checked = true;
          }, 10);
        });
      }
    },

    selectedProducts() {
      // Check input when have selected product in selectedProducts array
      if (this.selectedProducts.length > 0) {
        this.hasProducts = true;
      } else {
        this.hasProducts = false;
      }
    },

    hasProducts() {
      if (this.hasProducts == false) {
        // Uncheck all selected product and reset selectedProducts array
        async function removeItems(arr) {
          return await arr.map((item) => {
            return (document.getElementById(String(item)).checked = false);
          });
        }
        this.selectedProducts = removeItems(this.selectedProducts);
        this.selectedProducts = [];
      } else {
        // Select all products
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
