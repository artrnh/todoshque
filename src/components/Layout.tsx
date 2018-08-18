import * as React from 'react';

import styled from '../styled';
import media from '../utils/media';

export interface IProps {
  render(): React.ReactNode;
}

const Layout: React.SFC<IProps> = (props) => <Container>{props.render()}</Container>;

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
