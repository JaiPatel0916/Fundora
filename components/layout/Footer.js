import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  backdrop-filter: blur(10px);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -5px 15px rgba(0, 255, 200, 0.3);
  position: relative;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  max-width: 1200px;
`;

const FooterColumn = styled.div`
  width: 30%;
  min-width: 250px;
  margin-top: 20px;
  text-align: center;
`;

const FooterTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: cyan;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.a`
  display: block;
  margin: 5px 0;
  font-size: 1rem;
  transition: 0.3s;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none; /* Removes underline */

  &:hover {
    color: cyan;
    transform: scale(1.1);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.3s;
  text-decoration: none; /* Ensures no underline */

  &:hover {
    color: cyan;
    transform: scale(1.2);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
`;



const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                {/* About Section */}
                <FooterColumn>
                    <FooterTitle>Fundora</FooterTitle>
                    <FooterText>
                      A Platform where Innovation meets Funding Limitless
                    </FooterText>
                </FooterColumn>

                {/* Quick Links Section */}
                <FooterColumn>
                    <FooterTitle>Resources</FooterTitle>
                    <FooterLinks>
                        <FooterLink href="/success-stories">
                            Success Stories
                        </FooterLink>

                        <FooterLink as="a" href="https://polygonscan.com" target="_blank" rel="noopener noreferrer">
                            Polygon Scan
                        </FooterLink>

                        <FooterLink>Contact Us</FooterLink>
                    </FooterLinks>
                </FooterColumn>

                {/* Social Media Section */}
                <FooterColumn>
                    <FooterTitle>Follow Us</FooterTitle>
                    <SocialIcons>
                        <SocialIcon href="#">🔗 Twitter</SocialIcon>
                        <SocialIcon href="#">🔗 GitHub</SocialIcon>
                        <SocialIcon href="#">🔗 Discord</SocialIcon>
                    </SocialIcons>
                </FooterColumn>
            </FooterContent>

            {/* Copyright */}
            <FooterBottom>© {new Date().getFullYear()} Fundora. All Rights Reserved.</FooterBottom>
        </FooterWrapper>
    );
};

export default Footer;
