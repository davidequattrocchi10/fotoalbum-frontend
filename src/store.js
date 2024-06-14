import { reactive } from "vue";
import axios from 'axios';

export const state = reactive({

    //state
    base_api_url: 'http://127.0.0.1:8000',
    photos_endpoint: '/api/photos',
    categories_endpoint: '/api/categories',
    contacts_endpoint: '/api/contacts',
    evidence_endpoint: '/api/evidence',
    photos: null,
    evidence: null,
    search_photo: '',
    name: '',
    address: '',
    message: '',
    selectedCategory: '',
    categories: [],




    //action
    filterPhotos() {
        console.log(this.selectedCategory);
        console.log(this.search_photo);
        let url = this.base_api_url + this.photos_endpoint + '?';

        if (this.search_photo) {
            url += `search=${this.search_photo}&`;
        }

        if (this.selectedCategory) {
            url += `category_id=${this.selectedCategory}`;
        }
        console.log(url)
        this.callApi(url);

    },
    callApi(url) {
        axios
            .get(url)
            .then(response => {
                console.log(response.data.results);
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