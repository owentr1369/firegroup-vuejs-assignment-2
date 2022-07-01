import AppActions from "./components/actions.js";
import AppHeader from "./components/header.js";
import AppFooter from "./components/footer.js";

var app = new Vue({
  el: "#app",
  data: {
    productList: [],
  },
  components: { AppActions, AppHeader, AppFooter },
  created: function () {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        this.productList = data;
        console.log("this.productList :>> ", this.productList);
      });
  },
});
