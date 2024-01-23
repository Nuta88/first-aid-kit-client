import { ConfigProvider } from 'antd';

import { theme } from './assets/theme';

const App = (): JSX.Element => (
  <ConfigProvider theme={theme}>
    FIRST AID KIT
  </ConfigProvider>
);

export default App;
