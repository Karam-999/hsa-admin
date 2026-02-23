// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// import MuiSetup from './MuiSetup';

// export const metadata = {
//   title: 'Help Study Abroad — Admin',
//   description: 'Admin dashboard',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang='en'>
//       <body>
//         <MuiSetup>{children}</MuiSetup>
//       </body>
//     </html>
//   );
// }

import MuiSetup from './Muisetup';

export const metadata = {
  title: 'Help Study Abroad — Admin',
  description: 'Admin dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  );
}
