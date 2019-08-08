import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { filterProducts, sortProducts } from '../../containers/Products/actions';

const FilterContainer = styled.div`
  .float-icon {
    width: 60px;
    height: 60px;
    background-color: #1b1a1f;
    position: absolute;
    right: 0;
    top: -50px;
    line-height: 78px;

    .font-awesome {
      color: white;
    }
  }

  .float-container {
    height: auto;
    width: 450px;
    background-color: #1b1a1f;
    color: white;
    z-index: 1;
    right: 0;
    position: absolute;
    padding: 20px;

    .row {
      position: relative;
      box-sizing: border-box;
      padding: 5%;
      transition: background-color .2s,opacity .2s;

      &:before {
        content: '';
        width: 90%;
        height: 2px;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        left: 5%;
      }

      .count {
        font-size: 16px;
      }

      label {
        display: flex;
        justify-content: center;
      }

      select {
        width: 50%;
        margin-left: 20px;
      }
    }
  }
`;

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };


  render() {
    const { filteredProducts, sortProducts, sort, size, products, filterProducts } = this.props;

    return (
      <FilterContainer>
        {this.state.isOpen ?
          <div className="float-icon" onClick={this.closeFloatCart}>
            <FontAwesomeIcon className="font-awesome fa-2x" icon={faTimes}/>
          </div>
        : <div className="float-icon" onClick={this.openFloatCart}>
            <FontAwesomeIcon className="font-awesome fa-2x" icon={faFilter}/>
          </div>
        }
        {this.state.isOpen &&
          <div className="float-container">
            <div className="row">
              <span className="count">{filteredProducts.length} products found.</span>
            </div>
            <div className="row">
              <label htmlFor="order">Order by
                <select 
                  className="form-control" value={sort} 
                  onChange={(e) => sortProducts(filteredProducts, e.target.value)}>
                      <option value="">Select</option>
                      <option value="lowest">Lowest to highest</option>
                      <option value="highest">Highest to lowest</option>
                </select>
              </label>
            </div>
            <div className="row">
              <label htmlFor="size"> Filter Size
                <select 
                  className="form-control" value={size}
                    onChange={(e) => filterProducts(products, e.target.value)}>
                      <option value="">ALL</option>
                      <option value="x">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                </select>
              </label>
            </div>
          </div>
        }
      </FilterContainer>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProducts.items,
  filteredProducts: state.allProducts.filteredItems,
  size: state.allProducts.size,
  sort: state.allProducts.sort,
});

export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter);
