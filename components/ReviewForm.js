app.component('review-form', {
  /*html*/
  template: `
    <form class='review-form' @submit.prevent='onSubmit'>
      <h3>Leave a Review</h3>
      <label for='name'>Name:</label>
      <input id='name' v-model='name'/>

      <label for='review'>Review:</label>
      <input id='review' v-model='review'/>

      <label for='recommend'>Would you recommend this product?:</label>
      <div class='radio-container'>
        <input name='recommend' type='radio' id='recommendYes' v-model='recommendYes' value='Yes'/>
        <label for='recommendYes'>Yes</label>
        <input name='recommend' type='radio' id='recommendNo' v-model='recommendNo' value='No'/>
        <label for='recommendNo'>No</label>
      </div>


      <label for='rating'>Rating:</label>
      <select id='rating' v-model.number='rating'>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <p v-if='submitError'>Please Fill Out Entire Form to Submit.</p>
      <input class='button' type='submit' value='Submit'/>
    </form>
  `,
  data() {
    return (
      {
        name: '',
        review: '',
        recommendYes: '',
        recommendNo: '',
        rating: '',
      },
      {
        submitError: false,
      }
    );
  },
  methods: {
    onSubmit() {
      if (
        this.name === (undefined || '') ||
        this.review === (undefined || '') ||
        this.rating === (undefined || null)
      ) {
        this.submitError = true;
        this.$emit('submit-error');
        return;
      }

      let productReview = {
        name: this.name,
        review: this.review,
        recommendYes: this.recommendYes,
        recommendNo: this.recommendNo,
        rating: this.rating,
      };
      this.$emit('review-submitted', productReview);
      this.submitError = false;

      this.name = '';
      this.review = '';
      this.recommendYes = '';
      this.recommendNo = '';
      this.rating = null;
    },
  },
});