# Fotoalbum-Frontend

Fotoalbum-Frontend is a web application built with Vue.js and web APIs, designed for publishing and viewing photos fetched from the endpoints provided by the 'Fotoalbum-Backend' project, which can be found [here](https://github.com/davidequattrocchi10/fotoalbum-backend).

## Features

### Photo Viewing and Filtering
- **View Photos**: Display a list of photos published by the photographer.
- **Filter by Category**: Filter images based on their category.
- **Filter by Title**: Search and filter images by their title.
- **Featured Carousel**: Display a carousel of only featured images.

### Contact Form
- **Contact Form**: Simple contact form with fields for email and message.

## Integration with Fotoalbum-Backend
This frontend application interacts with the backend via defined API endpoints to fetch and display photos. It utilizes Vue.js for dynamic user interfaces and efficient data handling.

## How to Use

1. **Clone the Repository**
    ```bash
    git clone https://github.com/davidequattrocchi10/fotoalbum-frontend.git
    cd fotoalbum-frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configuration**
    - Ensure the API endpoints in `src/api.js` point to the correct URLs of Fotoalbum-Backend.

4. **Run the Application**
    ```bash
    npm run serve
    ```

5. **Access the Application**
    Open your browser and visit `http://localhost:8080` to view the Fotoalbum-Frontend application.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE.txt).

## Contribution

Feel free to fork this project and submit pull requests. Contributions are welcome!

