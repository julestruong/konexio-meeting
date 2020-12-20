import React, { Suspense } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    height: '100%',
    marginTop: 80,
    marginLeft: 74
  },
}));


const MainLayout = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Suspense fallback="loading">
       
      </Suspense>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MainLayout;