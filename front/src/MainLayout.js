import React, { Suspense, useState } from 'react';

import { Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';


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
  const theme = useTheme();


  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Suspense fallback="loading">
       
      </Suspense>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MainLayout;