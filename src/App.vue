<script>
import axios from 'axios';

export default{
  name: 'App',
  data() {
    return{
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      photos: null
    }
  },
  mounted(){
    const url = this.base_api_url + this.photos_endpoint;
    axios
    .get(url)
    .then(response =>{
      console.log(response);
      this.photos = response.data.results;

    })
    .catch(errors => {
      console.error(errors);
    })
  }
}
</script>

<template>
  <h1>PHOTOS</h1>

  <section class="photos" v-if="photos">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="photo in photos.data">
          <div class="card">
            <div v-if="photo.image">
              <img class="card-img-top" style="height:400px;"
              :src="photo.image.startsWith('https://') ? photo.image : base_api_url + '/storage/' + photo.image" alt="">
            </div>
            <div v-else>
              <p>Image not available</p>
            </div>

            <div class="card-body">
              {{ photo.title }}
            </div>
          </div>

        </div>
      </div>

    </div>

  </section>

</template>

<style>

</style>
