/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';
import Products from '../../components/Products';
import SiteBlocks from './siteBlocks';
import FeaturedProduct from './featuredProduct';
import ContactUs from '../../components/ContactUs';

const HomePageContainer = styled.div`
`;

const HomePage = () => (
  <HomePageContainer>
    <Carousel />
    <Products />
    <SiteBlocks />
    <FeaturedProduct />
    <ContactUs />
    <Footer />
  </HomePageContainer>
);

const mapStateToProps = state => ({
  loggedIn: state.login,
})

export default connect(mapStateToProps)(HomePage)
