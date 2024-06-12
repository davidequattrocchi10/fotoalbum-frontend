<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      photos: null,
      search_photo: ''
    }
  },
  methods: {
    goToPage(url) {
      console.log(url);
      this.callApi(url);

    },
    search() {
      const url = this.base_api_url + this.photos_endpoint + `?search=${this.search_photo}`;
      console.log(url);
      this.callApi(url);

    },
    callApi(url) {
      axios
        .get(url)
        .then(response => {
          this.photos = response.data.results;

        })
        .catch(errors => {
          console.error(errors);
        })
    }

  },
  mounted() {
    const url = this.base_api_url + this.photos_endpoint;
    console.log(url);
    this.callApi(url);

  }
}
</script>

<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container py-5">
      <h1 class="display-5 fw-bold">Capture the World</h1>
      <p class="col-md-8 fs-4">
        Immerse yourself in a captivating visual journey on Capture the World.
        Explore a vast library of photographs showcasing the beauty and diversity of our planet.
        From breathtaking landscapes and captivating wildlife to intimate portraits and vibrant cityscapes,
        our curated collection offers something for every visual explorer.
      </p>
      <form @submit.prevent="search()">
        <div class="input-group mb-3">
          <input type="search" class="form-control" placeholder="search..." v-model="search_photo">
          <button class="btn btn-outline-secondary" type="submit">
            <i class="fas fa-search fa-lg fa-fw"></i>
          </button>
        </div>
      </form>

    </div>
  </div>


  <section class="photos" v-if="photos">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="photo in photos.data">
          <div class="card">
            <div v-if="photo.image">
              <img class="card-img-top" style="height:400px;"
                :src="photo.image.startsWith('https://') ? photo.image : base_api_url + '/storage/' + photo.image"
                alt="">
            </div>
            <div v-else>
              <p>Image not available</p>
            </div>

            <div class="card-body">
              {{ photo.title }}
            </div>
            <div class="card-footer">
              <!-- Modal trigger button -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                :data-bs-target="`#photo-${photo.id}`">
                View
              </button>

              <!-- Modal Body -->
              <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
              <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static"
                data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title " :id="`modal-title-${photo.id}`">
                        {{ photo.title }}
                      </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                      <div v-if="photo.image">
                        <img
                          :src="photo.image.startsWith('https://') ? photo.image : base_api_url + '/storage/' + photo.image"
                          alt="" style="max-width: 100%; height: 600px; object-fit: cover;">
                      </div>
                      <div v-else>
                        <p>Image not available</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <nav aria-label="Page navigation" class="mt-3">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': !link.url, 'active': link.active }" v-for="link in photos.links">
            <button class="page-link" :href="link.url" type="button" @click="goToPage(link.url)">
              <span v-html="link.label">
              </span>
            </button>
          </li>
        </ul>
      </nav>

    </div>




  </section>

</template>

<style></style>
