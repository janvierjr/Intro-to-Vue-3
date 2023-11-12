app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img
              :src="image"
              :class="{ 'out-of-stock-img': !inStock }"
            />
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else="inStock">Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <p>{{ sale }}</p>

            <product-details :details="details"></product-details>

            <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
            >
          </div>
            <button
              class="button"
              :class="{ disabledButton: !inStock}"
              @click="addToCart"
              :disabled="!inStock"
              >
              Add to Cart
            </button>
            <button
              class="button"
              :class="{ disabledButton: !inStock }"
              style="width: fit-content;"
              @click="removeFromCart"
              :disabled="!inStock"
              >Remove from Cart</button>
        </div>
      </div>
      <review-list v-if='reviews.length' :reviews='reviews'></review-list>
      <review-form
        @submit-error='submitError'
        @review-submitted="submittedReview">
      </review-form>
    </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      details: ['50% cotton', '30% wool', '20% polyester'],
      selectedVariant: 0,
      reviews: [],
      submitError: false,
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './assets/images/socks_green.jpg',
          quantity: 50,
          sale: true,
        },
        {
          id: 2235,
          color: 'blue',
          image: './assets/images/socks_blue.jpg',
          quantity: 0,
          sale: false,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    submittedReview(productReview) {
      this.reviews.push(productReview);
      console.log(productReview);
    },
    submitError() {
      this.submitError = true;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.variants[this.selectedVariant].sale) {
        return this.brand + ' ' + this.product + ' are on sale.';
      }
      return 'Special offer';
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return '2.99';
    },
  },
});