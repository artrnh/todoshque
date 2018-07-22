import { css } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals, ...placeholders) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(literals, ...placeholders)}
    }
  `;

  return acc;
}, {});

export default media;
