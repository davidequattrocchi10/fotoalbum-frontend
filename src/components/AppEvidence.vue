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
                const header = document.getElementById('jumbotronEvidence');
                const carousel = document.getElementById('evidenceCarousel');
                const activeItem = carousel.querySelector('.carousel-item.active img');
                // console.log(activeItem.currentSrc)
                if (activeItem) {
                    header.style.backgroundImage = 'url(' + activeItem.currentSrc + ')';
                }
            }, 300);
        },
        changeImage() {
            const header = document.getElementById('jumbotronEvidence');
            console.log(header.style.backgroundImage)
            const carouselElement = document.getElementById('evidenceCarousel');

            carouselElement.addEventListener('slid.bs.carousel', () => {
                const activeItem = carouselElement.querySelector('.carousel-item.active');
                const imgElement = activeItem.querySelector('img');
                if (imgElement) {
                    header.style.backgroundImage = 'url(' + imgElement.src + ')';
                }
            });



        }
    }
}
</script>

<template>
    <section class="evidence" v-if="state.evidence">
        <div id="jumbotronEvidence" class="jumbotron rounded-3">
            <div class="d-flex justify-content-center align-items-center">
                <div class="overlay"></div>
                <div class="container-over container">
                    <div id="evidenceCarousel" class="carousel slide">
                        <div class="carousel-inner" style="width: 70%;   margin:auto;">
                            <div class="carousel-item" :class="{ active: index === 0 }"
                                v-for="(main, index) in state.evidence">
                                <div v-if="main.image">
                                    <img :src="main.image.startsWith('https://') ? main.image : state.base_api_url + '/storage/' + main.image"
                                        class="d-block w-100" style="width: 200%;" alt="">
                                </div>
                            </div>
                            <button class="carousel-control-prev bg-light " type="button"
                                data-bs-target="#evidenceCarousel" @click="changeImage()" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next bg-light" type="button"
                                data-bs-target="#evidenceCarousel" @click="changeImage()" data-bs-slide="next">
                                <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
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
    width: 100%;
    background-size: cover;
    background-position: center;
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