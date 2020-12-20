import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = ({
  component: Component,
  layout: Layout,
  title,
  ...rest
}) => {
  if (!Component) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout title={title}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;