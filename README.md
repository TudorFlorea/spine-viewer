<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url][![Forks][forks-shield]][forks-url][![Stargazers][stars-shield]][stars-url][![Issues][issues-shield]][issues-url][![MIT License][license-shield]][license-url][![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TudorFlorea/spine-viewer">
    <img src="images/logo_large.png" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">Spine Viewer</h3>

  <p align="center">
    A simple spine viewer and debugger app!
    <br />
    <br />
    <a href="https://spine-viewer.netlify.app">View Project</a>
    ·
    <a href="https://github.com/TudorFlorea/spine-viewer/issues">Report Bug</a>
    ·
    <a href="https://github.com/TudorFlorea/spine-viewer/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://spine-viewer.netlify.app)

The project is build with pixi.js and pixi-spine and serves as a viewer and debugger for spine exports. In order to used you'll need spine export files (.atlas file, .json file, .png file).

The main features are:
* Play animations present on the spine export
* Changed skins attached to the spine export
* Debug all elements of you spine
* Create a timeline with multiple animations
* Change the background

Keep in mind that it might not work with all versions of exports!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need nodejs and npm installed in order to run this project

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/TudorFlorea/spine-viewer.git
   ```
2. Install NPM packages
   ```sh
   cd spine-viewer && npm install
   ```
3. Run 
   ```sh
   npm run dev
   ```
4. Visit http://localhost:5173/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Better handling of window events and check for memory leaks
- [ ] Better code splitting for faster load times
- [ ] Add multiple demo spines


See the [open issues](https://github.com/TudorFlorea/spine-viewer/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES https://github.com/TudorFlorea/spine-viewer -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TudorFlorea/spine-viewer.svg?style=for-the-badge
[contributors-url]: https://github.com/TudorFlorea/spine-viewer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TudorFlorea/spine-viewer.svg?style=for-the-badge
[forks-url]: https://github.com/TudorFlorea/spine-viewer/network/members
[stars-shield]: https://img.shields.io/github/stars/TudorFlorea/spine-viewer.svg?style=for-the-badge
[stars-url]: https://github.com/TudorFlorea/spine-viewer/stargazers
[issues-shield]: https://img.shields.io/github/issues/TudorFlorea/spine-viewer.svg?style=for-the-badge
[issues-url]: https://github.com/TudorFlorea/spine-viewer/issues
[license-shield]: https://img.shields.io/github/license/TudorFlorea/spine-viewer.svg?style=for-the-badge
[license-url]: https://github.com/TudorFlorea/spine-viewer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tudor-florea-772239118/
[product-screenshot]: images/app_screenshot.png