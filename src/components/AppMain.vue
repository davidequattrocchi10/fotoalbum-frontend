<script>
import { state } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            state
        }
    },
    mounted() {
        const url = state.base_api_url + state.photos_endpoint;
        console.log(url);
        state.callApi(url);

    }
}

</script>

<template>
    <section class="photos" v-if="state.photos">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                <div class="col" v-if="state.photos.data == 0">
                    <h5 class="alert alert-warning" role="alert">There aren't photos for this search</h5>
                </div>
                <div class="col" v-else v-for="photo in state.photos.data">
                    <div class="card">
                        <div v-if="photo.image">
                            <img class="card-img-top" style="height:400px;"
                                :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
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
                                data-bs-keyboard="false" role="dialog" :aria-labelledby="`modal-title-${photo.id}`"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title " :id="`modal-title-${photo.id}`">
                                                {{ photo.title }}
                                            </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body text-center">
                                            <div v-if="photo.image">
                                                <img :src="photo.image.startsWith('https://') ? photo.image : state.base_api_url + '/storage/' + photo.image"
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
            <nav v-if="state.photos.data == 0">
                <span class="badge text-bg-warning">Try another one</span>
            </nav>
            <nav aria-label="Page navigation" class="mt-3" v-else>
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': !link.url, 'active': link.active }"
                        v-for="link in state.photos.links">
                        <button class="page-link" :href="link.url" type="button" @click="state.goToPage(link.url)">
                            <span v-html="link.label">
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>

        </div>




    </section>

</template>

<style scoped></style>