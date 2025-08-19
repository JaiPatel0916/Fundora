import styled from 'styled-components';

export default function VideoHero() {
    return (
        <VideoWrapper>
            <Video autoPlay muted loop playsInline>
                <source src="https://cdn.pixabay.com/video/2021/04/07/70324-538455366_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
            <Overlay />
            <Content>
                <Title>Empower. Support. Transform.</Title>
                <Subtitle>Fuel the future through decentralized crowdfunding</Subtitle>
            </Content>
        </VideoWrapper>
    );
}


const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 200, 0.6);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
`;
