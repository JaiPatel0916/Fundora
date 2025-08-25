import Layout from '../components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import { ParallaxProvider } from 'react-scroll-parallax'; // ✅ FIX: Import this
import '../style/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '1rem',
              padding: '16px 24px',
              borderRadius: '12px',
              background: '#fff',
              color: '#111',
              fontWeight: '600',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.5s ease-in-out',
            },
            success: {
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
              style: {
                background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                boxShadow: '0px 10px 30px rgba(0, 128, 0, 0.2)',
                animation: 'zoomIn 0.5s ease-in-out',
              },
            },
            error: {
              iconTheme: {
                primary: '#F44336',
                secondary: '#fff',
              },
              style: {
                background: '#f44336',
                boxShadow: '0px 10px 30px rgba(255, 0, 0, 0.2)',
                animation: 'shake 0.5s ease-in-out',
              },
            },
          }}
        />

        <Component {...pageProps} />
      </Layout>
    </ParallaxProvider>
  );
}

export default MyApp;
