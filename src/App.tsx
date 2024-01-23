import { ConfigProvider } from 'antd';
import { Suspense } from 'react';

import { theme } from './assets/theme';
import { Loading } from './components';
import AppRouters from './routes';

const App = (): JSX.Element => (
  <ConfigProvider theme={theme}>
    <Suspense fallback={<Loading />}>
      <AppRouters />
    </Suspense>
  </ConfigProvider>
);

export default App;
