import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderNav = () => {
  const Router = useRouter();

  return (
    <HeaderNavWrapper>
      {/* Campaigns Link */}
      <Link href="/" passHref legacyBehavior>
        <StyledLink $active={Router.pathname === "/"}>Campaigns</StyledLink>
      </Link>

      {/* Create Campaign Link */}
      <Link href="/createcampaign" passHref legacyBehavior>
        <StyledLink $active={Router.pathname === "/createcampaign"}>Create Campaign</StyledLink>
      </Link>

      {/* Dashboard Link */}
      <Link href="/dashboard" passHref legacyBehavior>
        <StyledLink $active={Router.pathname === "/dashboard"}>Dashboard</StyledLink>
      </Link>
    </HeaderNavWrapper>
  );
};

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 50%;
  border-radius: 10px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1.5px;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 14px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  /* Futuristic Glass Effect */
  background: ${(props) => props.theme.mode === 'dark'
    ? "linear-gradient(135deg, rgba(50, 50, 50, 0.6), rgba(25, 25, 25, 0.4))"
    : "linear-gradient(135deg, rgba(240, 240, 240, 0.7), rgba(220, 220, 220, 0.5))"};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  /* Adaptive Text & Border Color */
  color: ${(props) => props.theme.mode === 'dark' ? "#fff" : "#333"};
  border: 2px solid transparent;

  /* Cyberpunk Glow Border */
  ${({ $active, theme }) =>
    $active &&
    `
      border: 2px solid ${theme.mode === 'dark' ? '#ff8a00' : '#007bff'};
      color: ${theme.mode === 'dark' ? '#ff8a00' : '#007bff'};
      box-shadow: 0px 0px 12px ${theme.mode === 'dark' ? 'rgba(255, 138, 0, 0.4)' : 'rgba(0, 123, 255, 0.4)'};
    `}

  /* Hover Effect - Dynamic Neon Glow */
  &:hover {
    color: ${(props) => props.theme.mode === 'dark' ? "#ff8a00" : "#007bff"};
    border: 2px solid ${(props) => props.theme.mode === 'dark' ? "#ff8a00" : "#007bff"};
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0px 5px 15px ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 138, 0, 0.5)"
    : "rgba(0, 123, 255, 0.5)"};
  }

  /* Glowing Border Effect */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 138, 0, 0.3), transparent);
    opacity: 0.6;
    z-index: -1;
    transition: opacity 0.5s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  /* Magnetic Pull Effect */
  &:active {
    transform: scale(0.96);
  }
`;

export default HeaderNav;
