import React, { Suspense, useState } from 'react';

import { Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%',
    marginTop: 80,
    marginLeft: 96
  },
}));


const MainLayout = ({ children, title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Suspense fallback="loading">
       
      </Suspense>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MainLayout;