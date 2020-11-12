import App from 'next/app';
import React from 'react';
import '../style/scss/style.scss';
import { wrapper } from '../store';
import commerce from '../lib/commerce';
import collections from '../lib/collections';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Fetch data on load
    // Fetch categories
    const categoriesResponse = await commerce.categories.list();

    // Match static data record to API data to find category name
    const categories = categoriesResponse.data.map(item => ({
      ...collections.find(data => data.slug === item.slug),
      ...item,
    }));

    // Fetch products
    const { data: products } = await commerce.products.list();

    // Allows store to be updated via the dispatch action
    ctx.store.dispatch({ type: 'STORE_CATEGORIES', payload: categories });
    ctx.store.dispatch({ type: 'STORE_PRODUCTS', payload: products });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    );
  }
}

export default wrapper.withRedux(MyApp);
