<script>
import { state } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppSearch',
    data() {
        return {
            state
        }
    },
    mounted() {
        const url = state.base_api_url + state.categories_endpoint;
        console.log(url);
        this.fetchCategories(url);

    },
    methods: {
        fetchCategories(url) {
            axios
                .get(url)
                .then(response => {
                    state.categories = response.data.results;
                    console.log(state.categories)

                })
                .catch(errors => {
                    console.error(errors);
                })
        },
    }
}

</script>


<template>
    <div class="bg-light rounded-3 my-3">
        <div class="container py-5">
            <div class="row align-items-baseline">
                <div class="col-9">
                    <form @submit.prevent="state.filterPhotos()">
                        <div class="input-group mb-3">
                            <input type="search" class="form-control" placeholder="search..."
                                v-model="state.search_photo">
                            <button class="btn btn-outline-secondary" type="submit">
                                <i class="fas fa-search fa-lg fa-fw"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-3 text-end">
                    <select v-model="state.selectedCategory" @change="state.filterPhotos" class="m-1">
                        <option value="">All category</option>
                        <option v-for="category in state.categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>