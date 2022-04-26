<div id="top"></div>
<!--
*** README format taken from https://github.com/othneildrew/Best-README-Template/blob/master/README.md
*** Thanks for checking out our project. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!--
  <a href="https://github.com/Th3Whit3Wolf/voyager">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  -->
  <h3 align="center">Voyager</h3>

  <p align="center">
    A better way to manage the bureaucracy of PCS'ing
    <br />
    <!--
    <a href="https://github.com/Th3Whit3Wolf/voyager"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Th3Whit3Wolf/voyager">View Demo</a>
    ·
    -->
    <a href="https://github.com/Th3Whit3Wolf/voyager/issues">Report Bug</a>
    ·
    <a href="https://github.com/Th3Whit3Wolf/voyager/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!--
[![Voyager Screen Shot][product-screenshot]](https://example.com)
-->

We would like to reduce the amount of actual work and guess work currently involved in the in/out-processing process, by allowing computers to do the tedious work.
Allowing you to focus on what you actually need to do and help you do it.

#### Desktop View Mode

#### Mobile View Mode (Frontend SPA Can be Saved as App to Homescreen)

<p float="left">
<img src="/../screenshots/frontend/screenshots/mobileView1DarkMode.PNG" alt="Mobile View Login Screen" width=200>
  -->
<img src="/../screenshots/frontend/screenshots/mobileView2DarkMode.PNG" alt="Mobile View Loading User Data" width=200>
  -->
<img src="/../screenshots/frontend/screenshots/mobileView3DarkMode.PNG" alt="Mobile View Checking Off User Tasks" width=200>
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

#### Primary Packages and Libraries

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)

#### Supporting Packages and Libraries

- [React Router](https://reactrouter.com/)
- [MUI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

<p align="right">(<a href="#top">back to top</a>)</p>

### Prerequisites

* Docker must be installed on the system at a minimum 
    * note: while the server and user interface can be spun up manually, the database requires docker for installation)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

### As a User

- Navigate to: [https://bsdi1-voyager-frontend.herokuapp.com](https://bsdi1-voyager-frontend.herokuapp.com)

### As Developer

* IF using Docker Compose (__recommended__)
    1. git clone this repo
    2. navigate into the repo (voyager by default if you did not rename the clone)
    3. type `docker compose up` on the terminal 
    4. open a new browser and navigate to http://localhost:3000
    5. to spin the application back down, in another terminal: type `docker compose down`
* IF NOT using Docker Compose (but still have Docker available: see prerequisites)
    * __NOTE: The Database is not currently constructed in such a way to make this feasible. Use Docker Compose for now.___ 
    * Spin up the Frontend
        1. Open a new terminal
        2. Navigate into the repo -> frontend
        3. type `npm run dev` to start up development server for React + Vite (instead of npm start)
        4. CTRL+C to stop the frontend whenever finished 
    * Spin up the Backend
        1. Open a new terminal
        2. Navigate into the repo -> backend
        3. type `npm run dev` to start up the backend server with nodemon
        4. CTRL+C to stop the backend whenever finished
    * Spin up the Database
        1. .... this hasn't been setup as an option yet, since the Docker Compose file spins up postgres straight from an image, this could be modified in order to have a database folder where a dockerfile instead takes up the task of setting up the database
 
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

<p align="right">(<a href="#top">back to top</a>)</p>
