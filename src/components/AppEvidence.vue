<script>
import axios from 'axios';
import AppLoader from './AppLoader.vue'
import { state } from '../store.js';

export default {
    data() {
        return {
            state,
            evidence: state.evidence
        }
    },
    components: {
        AppLoader
    },
    watch: {
        'state.evidence'(newValue) {
            if (newValue) {
                this.jumbotron();
            }
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
        jumbotron() {
            setTimeout(() => {
                let header = document.getElementById('jumbotronEvidence');
                let carousel = document.getElementById('evidenceCarousel');
                let activeItem = carousel.querySelector('.carousel-item.active img');
                if (activeItem) {
                    header.style.backgroundImage = 'url(' + activeItem.currentSrc + ')';
                }
            }, 200);
        },
        changeImage() {
            let header = document.getElementById('jumbotronEvidence');
            console.log(header.style)
            let carousel = document.getElementById('evidenceCarousel');
            let activeItem = carousel.querySelector('.carousel-item.active img');
            console.log(activeItem.currentSrc)
            if (activeItem) {
                header.style.backgroundImage = 'url(' + activeItem.currentSrc + ')';
            }


        }
    }
}
</script>

<template>
    <section class="evidence" v-if="state.evidence">
        <div id="jumbotronEvidence" class="jumbotron rounded-3 pb-5">
            <div class="overlay"></div>
            <div class="container-over container py-5 text-center">
                <div id="evidenceCarousel" class="carousel slide">
                    <div class="carousel-inner" style="width: 70%; height:500px; margin:auto;">
                        <div class="carousel-item " :class="{ active: index === 0 }"
                            v-for="(main, index) in state.evidence">
                            <div v-if="main.image">
                                <img :src="main.image.startsWith('https://') ? main.image : state.base_api_url + '/storage/' + main.image"
                                    class="d-block w-100" style="width: 200%; height:500px;" alt="">
                            </div>
                        </div>
                        <button class="carousel-control-prev bg-light " type="button" data-bs-target="#evidenceCarousel"
                            @click="changeImage()" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next bg-light" type="button" data-bs-target="#evidenceCarousel"
                            @click="changeImage()" data-bs-slide="next">
                            <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <AppLoader v-else></AppLoader>
</template>


<style scoped>
.jumbotron {
    position: relative;
    height: 600px;
    width: 100%;
    background-size: cover;
    background-position: center;
    color: white;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
}

.container-over {
    position: relative;
    z-index: 1;
    max-width: 100%;
    height: auto;
}
</style>