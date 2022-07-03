import AppActions from "./components/actions.js";
import AppHeader from "./components/header.js";
import AppSort from "./components/sort.js";
import AppProduct from "./components/product.js";

var app = new Vue({
  el: "#app",
  data: {
    productList: [],
    searchValue: "",
    aToZSort: true,
  },
  components: { AppActions, AppHeader, AppProduct, AppSort },

  created: async function () {
    await fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        this.productList = data;
      });
  },

  methods: {
    onUpdateCurrentPage(newValue) {
      this.currentPage = newValue;
    },
  },
  watch: {
    aToZSort() {
      if (this.aToZSort === "true") {
        this.aToZSort = true;
      } else if (this.aToZSort === "false") {
        this.aToZSort = false;
      }
    },
  },
});
