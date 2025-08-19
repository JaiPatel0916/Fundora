// components/BackgroundVideo.js
import styled from 'styled-components';

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const BackgroundVideo = () => (
    <VideoBackground autoPlay loop muted playsInline>
        <source src="https://cdn.pixabay.com/video/2023/11/17/189526-886011271_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </VideoBackground>
);

export default BackgroundVideo;
