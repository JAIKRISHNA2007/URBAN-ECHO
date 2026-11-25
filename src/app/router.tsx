import { createBrowserRouter } from 'react-router-dom';

import { FoundationPage } from './pages/FoundationPage';
import { MessagePage } from './pages/MessagePage';
import { routePaths } from './routes';

export const router = createBrowserRouter([
  {
    path: routePaths.public.landing,
    element: <FoundationPage />,
  },
  {
    path: routePaths.system.forbidden,
    element: (
      <MessagePage
        descriptionKey="errors.forbiddenBody"
        titleKey="errors.forbiddenTitle"
      />
    ),
  },
  {
    path: '*',
    element: (
      <MessagePage
        descriptionKey="errors.notFoundBody"
        titleKey="errors.notFoundTitle"
      />
    ),
  },
]);
