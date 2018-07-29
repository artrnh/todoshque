import * as React from 'react';

import styled from '../styled';
import media from '../utils/media';

const Layout: React.SFC = (props) => (
  <Container>
    {props.children}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 40%;
  padding: 20px;

  ${media.desktop`width: 60%;`}
  ${media.tablet`width: 70%;`}
  ${media.phone`width: 100%;`}
`;

export default Layout;
