import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import jsonData from './data.json';
import './stylesproductDetails.css';  // Make sure to have your styles file imported
import RH from './img5.png';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Footer from '../../Components/Footer'
const HRManagementDetails = () => {
  return (
    <>
       <div class="container-fluid py-5">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <img class="img-fluid animated pulse infinite" src={RH} />
                </div>
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <h1 class="text-primary mb-4">Healthy Hair <span class="fw-light text-dark">Is A Symbol Of Our
                            Beauty</span></h1>
                    <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet, erat non
                        malesuada consequat, nibh erat tempus risus, vitae porttitor purus nisl vitae purus. Praesent
                        tristique odio ut rutrum pellentesque. Fusce eget molestie est, at rutrum est.</p>
                    <p class="mb-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no
                        labore lorem sit. Sanctus clita duo justo et tempor.</p>
                    <a class="btn btn-primary py-2 px-4" href="">Shop Now</a>
                </div>
            </div>
        </div>
    </div>
 
    <section class="site-section">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-lg-0 mb-4">
              <div class="box-with-humber bg-white p-5">
                <span class="icon icon-format_paint mr-2 text-primary h3 mb-3 d-block"></span>
                <h2 class="text-primary">Brand Strategy</h2>
                <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                <ul class="list-unstyled ul-check primary">
                  <li>Customer Experience</li>
                  <li>Product Management</li>
                  <li>Proof of Concept</li>
                </ul>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-lg-0 mb-4" data-jarallax-element="-50">
              <div class="box-with-humber bg-white p-5">
                <span class="icon icon-palette mr-2 text-primary h3 mb-3 d-block"></span>

                <h2 class="text-primary">Visual Identity</h2>
                <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                <ul class="list-unstyled ul-check primary">
                  <li>Web Design</li>
                  <li>Branding</li>
                  <li>Web &amp; App Development</li>
                </ul>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-lg-0 mb-4" data-jarallax-element="20">
              <div class="box-with-humber bg-white p-5">
                <span class="icon icon-laptop2 mr-2 text-primary h3 mb-3 d-block"></span>

                <h2 class="text-primary">Web Design</h2>
                <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium eos nulla qui commodi consectetur beatae fugiat. Veniam iste rerum perferendis.</p>
                <ul class="list-unstyled ul-check primary">
                  <li>Social Media</li>
                  <li>Paid Campaigns</li>
                  <li>Marketing &amp; SEO</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
<Footer />
    </>
    
  );
};

export default HRManagementDetails;
