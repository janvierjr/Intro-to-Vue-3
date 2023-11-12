const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
      console.log(this.cart)
    },
    removeFromCart(id) {
      if (this.cart.length > 0) {
        this.cart.splice(this.cart.indexOf(id), 1)
      }
      console.log(this.cart);
    },
  }
});
