import { Carousel, Image } from 'react-bootstrap';
import styled from 'styled-components';

export const Subtitle = styled.span`
    font-family: Helvetica;
    font-weight: bold;
    font-size: 1.5rem;
`;

export const HCarouselItem = styled(Carousel.Item)`
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

export const HCarouseImage = styled(Image)`
    height: 100%;
    object-fit: cover;
`;

export const HCaptionWrapper = styled(Carousel.Caption)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;