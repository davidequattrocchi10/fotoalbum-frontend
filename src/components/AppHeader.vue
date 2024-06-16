<script>
import axios from 'axios';
import { state } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            state,
            success: false,
            errors: false,
            loading: false
        }
    },
    methods: {
        submitMessage() {
            this.loading = true;
            // create the payload for the post request
            const payload = {
                name: state.name,
                address: state.address,
                message: state.message
            }
            console.log(payload)

            // send a post request
            axios.post(state.base_api_url + state.contacts_endpoint, payload)
                .then(response => {
                    this.loading = false;
                    if (response.data.success) {
                        this.success = 'Thanks for your message';
                        this.errors = false;
                        state.name = '';
                        state.address = '';
                        state.message = '';
                    } else {
                        //there is a error
                        console.log(response);
                        this.errors = response.data.errors;
                        this.success = false;

                    }
                })
                .catch(errors => {
                    console.log(errors);
                })
        },
        resetMessage() {
            this.success = false;
            this.errors = false;

        }

    }
}

</script>

<template>
    <button class="btn btn-link position-fixed end-0" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#contactForm" aria-controls="contactForm">
        Contacts
    </button>

    <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="contactForm"
        aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">
                Get in Touch!
            </h5>
            <button @click="resetMessage()" type="button" class="btn-close" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                <p class="lead">
                    Contact me
                </p>
                <div class="alert alert-success" role="alert" v-if="success">
                    <strong>Success</strong> {{ success }}
                </div>

                <div class="alert alert-danger" role="alert" v-if="errors">
                    <strong>There are errors</strong>
                    <ul>
                        <li v-for="error in errors">{{ error[0] }}</li>
                    </ul>
                </div>
                <form @submit.prevent="submitMessage()">

                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" id="name" aria-describedby="nameHelper"
                            placeholder="John Wayne" v-model="state.name" />
                        <small id="nameHelper" class="form-text text-muted">Type your full name</small>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Email</label>
                        <input type="email" class="form-control" name="address" id="address"
                            aria-describedby="addressHelper" placeholder="abc@mail.com" v-model="state.address" />
                        <small id="addressHelper" class="form-text text-muted">Type your full email address</small>
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" name="message" id="message" rows="3"
                            v-model="state.message"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" :disabled="loading">
                        {{ loading ? 'Sending...' : 'Send' }}
                    </button>


                </form>
            </div>
        </div>
    </div>




    <div class="bg-light rounded-3">
        <div class="container py-5">
            <h1 class="display-5 fw-bold">Capture the World</h1>
            <div class="row">
                <div class="col-md-8 fs-4">
                    Immerse yourself in a captivating visual journey on Capture the World.
                    Explore a vast library of photographs showcasing the beauty and diversity of our planet.
                    From breathtaking landscapes and captivating wildlife to intimate portraits and vibrant cityscapes,
                    our curated collection offers something for every visual explorer.
                </div>
                <div class="col-md-4 text-center">
                    <div class="logo">
                        <img class="img-fluid rounded-circle" width="100"
                            src="data:image/jpeg;base64,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"
                            alt="">
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>


<style scoped></style>