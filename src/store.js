import { reactive } from "vue";
import axios from 'axios';

export const state = reactive({

    //state
    base_api_url: 'http://127.0.0.1:8000',
    photos_endpoint: '/api/photos',
    contacts_endpoint: '/api/contacts',
    photos: null,
    search_photo: '',
    name: '',
    address: '',
    message: '',




    //action
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
    },
    goToPage(url) {
        console.log(url);
        this.callApi(url);

    },

});