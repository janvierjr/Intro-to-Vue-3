app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  /*html*/
  template: `
    <div class='review-container'>
      <h3>Reviews:</h3>
      <ul>
        <li v-for='(review, index) in reviews' :key='index'>
          {{ review.name }} gave this product {{ review.rating }} stars. Recommends product: {{ review.recommendYes }} {{review.recommendNo}}.
          <br/>
          <b>{{ review.review }}</b>
        </li>
      </ul>
    </div>
  `
})