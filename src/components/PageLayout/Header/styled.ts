import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../assets/colors';
import { Col } from '../../Col';
import { Row } from '../../Row';

const { Header: LayoutHeader } = Layout;

export const LayoutHeaderStyled = styled(LayoutHeader)`
  position: fixed;
  top: 0;
  height: 5rem;
  z-index: 100;
  width: 100%;
  text-transform: uppercase;
  color: white;
  background-color: ${colors.primary};
`;

export const RowStyled = styled(Row)`
  height: 100%;
`;

export const ColStyled = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const LinkStyled = styled(NavLink)`
  padding: 0 .45rem;
  color: ${colors.link.root};

  &:hover {
    transition: color 0.7s ease;
    color: ${colors.link.hover};
  }

  &.active {
    color: ${colors.link.active};
    font-weight: 500;
  }
`;
