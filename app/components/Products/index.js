import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Slider from "react-slick";
import history from '../../history';
import { fetchCategoriesRequest } from './actions';
import { addToCart } from '../../containers/Cart/actions';
import { formatCurrency } from '../../utils/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Filter from '../Filter';
import Modal from '../Modal';
import ProductDetails from '../ProductDetails';

const ProductsContainer = styled.div`
  margin-bottom: 50px;
  text-align: center;

  .slick-slider {
    display: flex;

    .slick-list {
      overflow: hidden;
      padding: 0 20px;

      .slick-track {
        display: flex;
        .slick-slide {
          width: auto !important;
        }
      }
    }
  }

  .product-list {
    padding: 0 10px 0 0;

    .product-item {
      position: relative;
      width: 100%;
      overflow: hidden;

      &:hover {
        figure {
          img {
            -webkit-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
          }

          &:before {
            opacity: 1;
            visibility: visible;
            -webkit-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
          }
        }

        .image_overlay {
          opacity: 0.7;
          position: absolute;
        }

        .btn-view {
          display: block;
          position: absolute;
          left: 35px;
          bottom: 35px;

          .btn-white {
            background-color: white;
            color: black !important;

            &:hover {
              background-color: transparent;
              color: white !important;
            }
          }
        }

        .caption {
          h3, small {
            color: white;
          }
        }
      }

      .btn-view {
        display: none;
      }

      .image_overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(71,186,193,.9);
        opacity: 0;
        transition: all .3s ease-in-out;
      }

      .caption {
        position: absolute;
        text-align: left;
        top: 30px;
        left: 30px;

        h3 {
          color: black;
          margin: 0;
        }
        
        small {
          color: #797979;
          display: inline-block;
          font-size: 13px;
        }
      }

      figure {
        overflow: hidden;
        position: relative;

        img {
          height: 360px;
          -webkit-transition: .3s all ease;
          -o-transition: .3s all ease;
          transition: .3s all ease;
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
        }
      }
    }
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, height:"360px", lineHeight:"360px", display: "block" }}
      onClick={onClick}
    >
    <FontAwesomeIcon className="font-awesome fa-2x" icon={faChevronCircleRight}/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, height:"360px", lineHeight:"360px", display: "block" }}
      onClick={onClick}
    >
    <FontAwesomeIcon className="font-awesome fa-2x" icon={faChevronCircleLeft}/>
    </div>
  );
}

class Products extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      product: null
    };
    this.showModal= this.showModal.bind(this);
  }

  componentWillMount() {
    const { fetchCategoriesRequest } = this.props;
    fetchCategoriesRequest();
  }

  showModal(item) {
    this.setState((previousState) => ({
      ...previousState,
      product: item,
    }));
  };

  redirectToProducts = () => {
    history.push('/products');
  }

  render() {
    const { categories, addToCart, cartItems } = this.props;
    const { product } = this.state;

    const ArrowLeft = (props) => (
        <button
            {...props}
            className={props.prev}/>
    );
    const ArrowRight = (props) => (
        <button
            {...props}
            className={props.next}/>
    );

    const settings = {
      autoplay: false,
      autoplaySpeed: 5000,
      pauseOnFocus: true,
      pauseOnHover: true,
      dots: false,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 3,
      draggable: true,
      swipeToSlide: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    
    const productItems = categories.map(product => (
      <div className="col-md-4 product-list" key={product.id}>
        <div className="product-item">
          <figure>
            <img src={require(`../../images/products/${product.sku}_4.jpg`)} alt={product.title} className="img-fluid" />  
          </figure>
          <div className="image_overlay"/>
          <div className="btn-view">
            <button type="button" className="btn-white" onClick={this.redirectToProducts}>View Products</button>
          </div>
          <div className="caption">
            <h3>{product.title}</h3>
            <small>{product.description}</small>
          </div>
        </div>
      </div>
    ));

    return (
      <ProductsContainer>
        <div className="container">
          <div className="row section-heading">
            <div className="col-md-offset-3 col-md-6 text-center">
              <h3 className="row section-sub-title">POPULAR PRODUCTS</h3>
              <h2 className="row section-title">Our Products</h2>
              <p className="section-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nostrum natus excepturi fuga ullam accusantium vel ut eveniet aut consequatur laboriosam ipsam.</p>
            </div>
          </div>
          <div className="row">
            <Slider  {...settings}>
              {productItems}
            </Slider>
            {product && <Modal id="viewProduct" ModalBody={ProductDetails} addToCart={addToCart} cartItems={cartItems} product={product}/>}
          </div>
        </div>
      </ProductsContainer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.products.items,
  cartItems: state.cart.items,
})

export default connect(mapStateToProps, {fetchCategoriesRequest, addToCart})(Products)
