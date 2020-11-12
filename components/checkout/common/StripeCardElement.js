import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardElement } from '@stripe/react-stripe-js';

export default class StripeCardElement extends Component {

  renderStripeForm() {
    const { gateways } = this.props;
    const cardElementOpts = {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      }
    }

    return (
      <div className="border border-color-gray400 mb-5">
        {( gateways && gateways.available['stripe'] ) ? (
          <>
            <p className="font-weight-medium">Credit/debit card</p>
            <CardElement
              options={cardElementOpts}
              class="stripe-form"
            />
            TEST
          </>
        ) :
          ''
        }
      </div>
    )
  }

  render() {
    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        {this.renderStripeForm()}
      </>
    );
  }
}

StripeCardElement.propTypes = {
  gateways: PropTypes.object,
}
