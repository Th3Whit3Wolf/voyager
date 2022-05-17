<div  id="top"></div>

<!--

*** README format taken from https://github.com/othneildrew/Best-README-Template/blob/master/README.md

*** Thanks for checking out our project. If you have a suggestion

*** that would make this better, please fork the repo and create a pull request

*** or simply open an issue with the tag "enhancement".

*** Don't forget to give the project a star!

*** Thanks again! Now go create something AMAZING! :D

-->

<!-- PROJECT LOGO -->

<br  />

<div  align="center">

<!--

<a href="https://github.com/Th3Whit3Wolf/voyager">

<img src="images/logo.png" alt="Logo" width="80" height="80">

</a>

-->

<h3  align="center">Voyager</h3>

<p  align="center">

A better way to manage the bureaucracy of PCS'ing

<br  />

<!--

<a href="https://github.com/Th3Whit3Wolf/voyager"><strong>Explore the docs »</strong></a>

<br />

<br />

<a href="https://github.com/Th3Whit3Wolf/voyager">View Demo</a>

·

-->

<a  href="https://github.com/Th3Whit3Wolf/voyager/issues">Report Bug</a>

·

<a  href="https://github.com/Th3Whit3Wolf/voyager/issues">Request Feature</a>

</p>

</div>

<!-- TABLE OF CONTENTS -->

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a  href="#about-the-project">About The Project</a>

<ul>

<li><a  href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a  href="#getting-started">Getting Started</a>

<ul>

<li><a  href="#prerequisites">Prerequisites</a></li>

<li><a  href="#installation">Installation</a></li>

</ul>

</li>

<li><a  href="#usage">Usage</a></li>

<li><a  href="#roadmap">Roadmap</a></li>

<li><a  href="#contributing">Contributing</a></li>

<li><a  href="#license">License</a></li>

<li><a  href="#contact">Contact</a></li>

<li><a  href="#acknowledgments">Acknowledgments</a></li>

</ol>

</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!--

[![Voyager Screen Shot][product-screenshot]](https://example.com)

-->

We would like to reduce the amount of actual work and guess work currently involved in the in/out-processing process, by allowing computers to do the tedious work.

Allowing you to focus on what you actually need to do and help you do it.

<!-- #### Desktop View Mode

#### Mobile View Mode (Frontend SPA Can be Saved as App to Homescreen)

<p  float="left">

<img  src="/../screenshots/frontend/screenshots/mobileView1DarkMode.PNG"  alt="Mobile View Login Screen"  width=200>


<!-- <img  src="/../screenshots/frontend/screenshots/mobileView2DarkMode.PNG"  alt="Mobile View Loading User Data"  width=200>


<img  src="/../screenshots/frontend/screenshots/mobileView3DarkMode.PNG"  alt="Mobile View Checking Off User Tasks"  width=200>

</p> -->

<p  align="right">(<a  href="#top">back to top</a>)</p>

### Built With

#### Primary Packages and Libraries

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)

#### Supporting Packages and Libraries

- [React Router](https://reactrouter.com/)
- [MUI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Recharts](https://recharts.org/)

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

1. [Docker](https://www.docker.com/) must be installed on the system at a minimum. While the server and user interface can be spun up manually, the database requires docker for installation)

2. A [Firebase Account](https://firebase.google.com/) with:
   - A Project set up under your Firebase account
   - Authentication set up configured for Email/Password Authentication
   - Knowledge of your Firebase project's private key (see Project Settings)
   - See [Firebase Docs](https://firebase.google.com/docs/admin/setup) on admin setup

<p  align="right">(<a  href="#top">back to top</a>)</p>

### Installation

#### As a User

Navigate to: [https://bsdi1-voyager-frontend.herokuapp.com](https://bsdi1-voyager-frontend.herokuapp.com)

#### As Developer

1. Clone the Voyager Repo
   - Example: `git clone git@github.com:Th3Whit3Wolf/voyager.git`
2. Navigate into the repo
   - Example: `cd voyager`
3. Add firebase private key to `.secrets`
   - Per the prerequisites, you should already have a Firebase project and your private key
   - Copy your key into `.secrets` from the project root directory
   - Create a `.env` file with `FIREBASE_PATH` set to the name of the file you added to the `.secrets` directory
     ```bash
     mkdir .secrets
     cat <<  EOF > .env
     FIREBASE_PATH="firebaseVoyagerDev.json"
     EOF
     mv firebaseVoyagerDev.json .secrets
     ```
4. From the voyager root directory, start up Docker compose `npm run docker:up`
5. Set up the database schema and initialize with seeds
   ```
   cd backend
   npm run db:reset
   cd ..
   ```
6. Open a new browser and navigate to [http://localhost:3000](http://localhost:3000)
7. To spin the application back down use `npm run docker:down`

Note: If there are errors trying to get the application to load after spinning it up in step 4, then some Developers may have to do some steps manually:

- IF there are errors, then some Developers may have too: - First, make sure all Docker containers are down with `npm run docker:down` - Second, remove all Docker voyager images - Then do the following steps
  ```rm -rf pg-data
  cd frontend
  npm install
  cd ../backend
  npm install
  cd ..
  npm run docker:up
  cd backend npm run db:reset
  	(select yes with "y" option)
  cd ..
  ```

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- ROADMAP



## Roadmap



<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- CONTRIBUTING



## Contributing



<p align="right">(<a href="#top">back to top</a>)</p> -->

## License

License distribution is based upon the various packages used in the development. The primary packages used in this project are provided at the beginning of this ReadMe document.

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- CONTACT -->

<!-- ## Developers

*
<p  align="right">(<a  href="#top">back to top</a>)</p> -->

<!-- ACKNOWLEDGMENTS

## Acknowledgments

<p align="right">(<a href="#top">back to top</a>)</p> -->
