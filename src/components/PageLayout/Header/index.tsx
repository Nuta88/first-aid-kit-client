import { memo } from 'react';
import { navigationLinks } from '../../../constants/apiUrls';
import { useAuth } from '../../../hooks';
import { User } from '../../../types/user';
import {
  AvatarIcon,
  CircleButton,
  Col,
  Dropdown,
  LogoutIcon,
  TextButton
} from '../../index';
import { InlineCenter } from '../../Space/InlineCenter';

import {
  ColStyled,
  LayoutHeaderStyled,
  LinkStyled,
  RowStyled
} from './styled';

const Header = (): JSX.Element => {
  const { onLogout } = useAuth();
  const user: User = JSON.parse(localStorage.getItem('user') ?? '') ?? {};

  
  return (
    <LayoutHeaderStyled data-testid="layout-header">
      <RowStyled align="middle" gutter={[ 16, 16 ]}>
        <Col>
          First Aid Kit
        </Col>
        <ColStyled flex={1}>
          {navigationLinks.map(navigation => (
            <LinkStyled
              key={navigation.name}
              to={navigation.link}
            >
              <InlineCenter>
                {navigation.name}
              </InlineCenter>
            </LinkStyled>
          ))}
        </ColStyled>
        <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Dropdown items={
            [
              {
                label: `${user["first_name"]} ${user["last_name"]}`,
                key: 'name',
                disabled: true
              },
              {
                type: 'divider',
              },
              {
                label: <TextButton icon={<LogoutIcon />} onClick={onLogout}>Logout</TextButton>,
                key: 'logout'
              }
            ]
          }>
            <CircleButton size="large" icon={<AvatarIcon />} />
          </Dropdown>
        </Col>
      </RowStyled>
    </LayoutHeaderStyled>
  );
};

export default memo(Header);
