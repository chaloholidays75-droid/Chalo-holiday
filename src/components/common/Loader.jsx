import React from 'react';
import loadingGif from '../../assets/loading1.gif'; // Ensure this path is correct

const Loader = () => {
  const loaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const imgStyle = {
    width: '400px',
    height: '400px',
    objectFit: 'contain',
    animation: 'spin 10s linear infinite', // Slower spin duration (10 seconds)
  };

  return (
    <>
      <div style={loaderStyle}>
        <img src={loadingGif} alt="Loading..." style={imgStyle} />
      </div>

      {/* Keyframes for slow spin animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </>
  );
};

export default Loader;