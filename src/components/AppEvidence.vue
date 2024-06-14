<script>
import axios from 'axios';
import { state } from '../store.js';

export default {
    data() {
        return {
            state
        }
    },
    mounted() {
        const url = state.base_api_url + state.evidence_endpoint;
        console.log(url);
        this.callApiEvidence(url);

    },
    methods: {
        callApiEvidence(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data.results);
                    state.evidence = response.data.results;

                })
                .catch(errors => {
                    console.error(errors);
                })
        },
    }
}
</script>

<template>
    <section class="evidence" v-if="state.evidence">
        <div class="container">
            <div id="evidenceCarousel" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item " :class="{ active: index === 0 }"
                        v-for="(main, index) in state.evidence">
                        <div v-if="main.image">
                            <img :src="main.image.startsWith('https://') ? main.image : state.base_api_url + '/storage/' + main.image"
                                alt="">
                        </div>
                    </div>
                    <button class="carousel-control-prev bg-light " type="button" data-bs-target="#evidenceCarousel"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next bg-light" type="button" data-bs-target="#evidenceCarousel"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
#evidenceCarousel .carousel-inner {
    height: 500px;
    width: 700px;
    margin: 0 auto;
}

#evidenceCarousel img {
    height: 500px;
    width: 700px;
}
</style>