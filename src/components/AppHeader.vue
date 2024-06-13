<script>
import { state } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            state
        }
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
            <form @submit.prevent="state.search()">
                <div class="input-group mb-3">
                    <input type="search" class="form-control" placeholder="search..." v-model="state.search_photo">
                    <button class="btn btn-outline-secondary" type="submit">
                        <i class="fas fa-search fa-lg fa-fw"></i>
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>


<style scoped></style>