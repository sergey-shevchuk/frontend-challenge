import React from 'react';
import styled from '@emotion/styled/macro';

const Button = styled.button(
  {
    minWidth: '110px',
    minHeight: '37px',
    padding: '0 16px',
    fontSize: '18px',
    fontWeight: '400',
    borderRadius: '4px',
    cursor: 'pointer',
    // TODO remove outline: 0 and style button's focus to be accessible
    outline: '0',
    userSelect: 'none',

    '&:hover': {
      boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      boxShadow: 'none !important',
      transform: 'translateY(1px) !important',
      transition: 'all 0.15s ease'
    }
  },
  ({ type, size }) => {
    let styles = {};
    switch (type) {
      case 'outlined':
        styles = {
          ...styles,
          color: '#e20a0a94',
          border: '1px solid #e20a0a94',
          background: 'transparent',
          margin: '5px',
          fontWeight: '300'
        };
        break;
      case 'contained':
      default:
        styles = {
          ...styles,
          color: 'rgba(255, 255, 255, 0.9)',
          border: '0',
          backgroundImage:
            'linear-gradient(to bottom left, #0093fe, #0093fe, #0093fe)',
          backgroundSize: '200% 200%',
          backgroundPosition: '100% 0'
        };
    }
    switch (size) {
      case 's':
        styles = {
          ...styles,
          width: 110
        };
        break;
      case 'm':
      default:
        styles = {
          ...styles
        };
    }
    return styles;
  }
);

export default Button;

export const __cards__ = define => {
  define('Default', (state, update) => <Button>Default</Button>);
  define('Outlined', (state, update) => (
    <Button type="outlined">Outlined</Button>
  ));
};
