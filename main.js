import AppActions from "./components/actions.js";
import AppHeader from "./components/header.js";
import AppProduct from "./components/product.js";
import AppFooter from "./components/footer.js";

var app = new Vue({
  el: "#app",
  data: {
    productList: [],
    searchValue: "",
  },
  components: { AppActions, AppHeader, AppFooter, AppProduct },
  created: function () {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        this.productList = data;
      });
  },
});
