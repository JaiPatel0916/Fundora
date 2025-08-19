import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Background Video Layer
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: blur(2px);
`;

// Glassmorphism Overlay for Quote
const QuoteOverlay = styled.div`
  position: relative;
  z-index: 2;
  max-width: 80%;
  padding: 30px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const QuoteText = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 2.8rem;
  font-weight: 600;
  color: white;
  text-shadow:
    0 2px 5px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(255, 255, 255, 0.2);
  margin: 0;
  line-height: 1.4;
`;

export default function HeroQuote({ quote }) {
  const videoURL = 'https://cdn.pixabay.com/video/2016/01/29/1992-153555258_large.mp4';

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quoteAnimation = useSpring({
    transform: `rotate(${scrollY / 3}deg) scale(${scrollY > 100 ? 0.5 : 1})`,
    opacity: scrollY > 150 ? 0 : 1,
    config: { tension: 200, friction: 30 },
  });

  return (
    <HeroWrapper>
      <BackgroundVideo
        src={videoURL}
        autoPlay
        muted
        loop
        playsInline
      />
      <QuoteOverlay>
        <animated.div style={quoteAnimation}>
          <QuoteText>{quote || 'FUNDORA: Where Innovation Meets Funding Globally Without Limits!'}</QuoteText>
        </animated.div>
      </QuoteOverlay>
    </HeroWrapper>
  );
}
