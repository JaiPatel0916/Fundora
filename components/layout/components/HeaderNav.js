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

      {/* About Us Link */}
      <Link href="/about" passHref legacyBehavior>
        <StyledLink $active={Router.pathname === "/about"}>About Us</StyledLink>
      </Link>
    </HeaderNavWrapper>
  );
};

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: ${(props) => props.theme.mode === 'dark'
    ? 'rgba(25, 25, 25, 0.6)'
    : 'rgba(255, 255, 255, 0.5)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 12px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const StyledLink = styled.a`
  position: relative;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1.2px;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: ${(props) => props.theme.mode === 'dark' ? '#ffffffd9' : '#1a1a1a'};
  background: transparent;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  ${({ $active, theme }) =>
    $active &&
    `
      color: ${theme.mode === 'dark' ? '#ffc265' : '#0056d6'};
      border-color: ${theme.mode === 'dark' ? '#ffc26566' : '#0056d655'};
      background: ${theme.mode === 'dark'
        ? 'rgba(255, 194, 101, 0.1)'
        : 'rgba(0, 86, 214, 0.08)'};
      box-shadow: 0 0 12px ${theme.mode === 'dark'
        ? 'rgba(255, 194, 101, 0.3)'
        : 'rgba(0, 86, 214, 0.2)'};
    `}

  &:hover {
    transform: translateY(-2px);
    color: ${(props) => props.theme.mode === 'dark' ? '#ffc265' : '#0056d6'};
    border-color: ${(props) => props.theme.mode === 'dark' ? '#ffc265' : '#0056d6'};
    background: ${(props) => props.theme.mode === 'dark'
      ? 'rgba(255, 194, 101, 0.15)'
      : 'rgba(0, 86, 214, 0.1)'};
    box-shadow: 0 0 14px ${(props) => props.theme.mode === 'dark'
      ? 'rgba(255, 194, 101, 0.25)'
      : 'rgba(0, 86, 214, 0.25)'};
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default HeaderNav;
