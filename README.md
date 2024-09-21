# eBay Clone

This project is a demonstration app mimicking eBay for learning purposes, built with React, Redux, Tailwind CSS, and Firebase. It showcases how to implement features like user authentication and fetching data using the RapidAPI service.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Firebase**: For user authentication and real-time database management.
- **RapidAPI**: To fetch data from Amazon's API.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Firebase project with authentication set up.
- RapidAPI account for accessing the API.

### Installation

1. Clone the repository:
   git clone https://github.com/dishantshinde/ebay-clone.git cd ebay-clone

2. Create a `.env` file in the root directory and add your Firebase and RapidAPI credentials:
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain REACT_APP_RAPIDAPI_KEY=your_rapidapi_key

3. Install dependencies:
   npm install

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make changes.

#### `npm test`

Launches the test runner in interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. It optimizes the build for the best performance.

#### `npm run eject`

**Note**: This is a one-way operation. Once you eject, you can't go back! Use this command if you need full control over the configuration.

## Usage

After starting the app, you can sign in with Google, browse items, and add them to your cart. The app fetches data from the Amazon API in real-time, providing a seamless experience similar to eBay.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app) for bootstrapping the project.
- [Firebase](https://firebase.google.com/) for authentication services.
- [RapidAPI](https://rapidapi.com/) for providing access to various APIs.
