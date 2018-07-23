import { css } from 'styled-components';

interface ISizes {
  desktop: number;
  tablet: number;
  phone: number;
}

const sizes: ISizes = {
  desktop: 1200,
  tablet: 992,
  phone: 576,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media(max-width: ${sizes[label]}px) {
        ${css(literals, ...placeholders)}
    }
  `;

  return acc;
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>);

export default media;
