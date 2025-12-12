import styled from 'styled-components';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../components/layout/Footer';

const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
];

function toCid(val = '') {
  if (!val) return '';
  if (val.startsWith('ipfs://')) return val.replace('ipfs://', '');
  const m = val.match(/\/ipfs\/([^/?#]+)/);
  return m ? m[1] : val;
}

function CampaignImage({ cid }) {
  const [gw, setGw] = useState(0);
  const finalCid = toCid(cid);
  const src = finalCid ? `${IPFS_GATEWAYS[gw]}${finalCid}` : '/default-image.jpg';

  return (
    <Image
      alt="crowdfunding dapp"
      src={src}
      fill
      unoptimized
      onError={() => gw < IPFS_GATEWAYS.length - 1 && setGw(gw + 1)}
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL,
        { name: 'polygon-amoy', chainId: 80002 } // change if mainnet: { name: 'polygon', chainId: 137 }
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );

      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => ({
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress,
      }));
      setCampaignsData(AllData);
    };
    Request();
  }, []);

  return (
    <Page>
      
      <Main>
        <Header>
          <Heading>Welcome to your Dashboard</Heading>
          <Subheading>Track and manage your campaigns at a glance.</Subheading>
        </Header>

        <CardsGrid>
          {campaignsData.map((e) => (
            <Card key={e.address}>
              <CardImg>
                <CampaignImage cid={e.image} />
              </CardImg>

              {/* Content area */}
              <CardBody>
                <Title>{e.title}</Title>

                <CardRow>
                  <Text>
                    Owner&nbsp;<AccountBoxIcon fontSize="small" />
                  </Text>
                  <Text>{e.owner.slice(0, 6)}...{e.owner.slice(39)}</Text>
                </CardRow>

                <CardRow>
                  <Text>
                    Amount&nbsp;<PaidIcon fontSize="small" />
                  </Text>
                  <Text>{e.amount} Matic</Text>
                </CardRow>

                <CardRow>
                  <Text><EventIcon fontSize="small" /></Text>
                  <Text suppressHydrationWarning>
                    {new Date(e.timeStamp * 1000).toLocaleString()}
                  </Text>
                </CardRow>

                {/* Button pinned to bottom via margin-top:auto on the spacer above */}
                <Link passHref href={'/' + e.address}>
                  <Button>Go to Campaign</Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </CardsGrid>
      </Main>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Page>
  );
}

/* ===========================
   Styled-components (layout)
   =========================== */

/* Full-page wrapper: linear gradient + footer stick */
const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* New attractive linear gradient */
  background: linear-gradient(135deg, #10121f 0%, #1e2761 45%, #2b86c5 100%);
  /* optional subtle overlay for depth */
  background-attachment: fixed;
`;

/* Main grows to push Footer down */
const Main = styled.main`
  flex: 1 0 auto;
  width: 100%;
  max-width: 1580px;
  margin: 0 auto;
  padding: 48px 20px 32px;
  box-sizing: border-box;
`;

const FooterWrapper = styled.footer`
  flex-shrink: 0;
  width: 100%;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 24px;
`;

const Heading = styled.h1`
  color: #eaf9ff;
  font-weight: 800;
  letter-spacing: 0.2px;
  padding-top: 28px;
  font-size: clamp(22px, 3vw, 44px);
  margin: 0 0 6px 0;
`;

const Subheading = styled.p`
  color: rgba(234, 249, 255, 0.85);
  margin: 0;
  font-size: clamp(13px, 1.8vw, 20px);
`;

/* Grid with extra spacing between cards */
const CardsGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 88px; /* more space between cards */
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;

  /* make the card a flex container with its own height */
  height: 100%;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.45),
      inset 0 0 0 1px rgba(0, 255, 200, 0.25);
    border-color: rgba(0, 255, 200, 0.35);
  }
`;

const CardImg = styled.div`
  position: relative;
  width: 100%;
  height: 180px;

  @media (max-width: 1024px) { height: 160px; }
  @media (max-width: 768px)  { height: 150px; }
  @media (max-width: 425px)  { height: 140px; }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  min-height: 0;
`;

const Title = styled.h2`
  margin: 4px 2px 6px;
  color: #eaf9ff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Text = styled.p`
  color: #eaf9ff;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

/* Button pinned to card bottom (no overlap) */
const Button = styled.button`
  margin-top: auto; /* pushes the button to the bottom of CardBody */
  width: 100%;
  padding: 12px 16px;
  border: 0;
  cursor: pointer;
  border-radius: 12px;

  font-family: 'Orbitron', 'Roboto', sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #0c1a1f;

  background: linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%);
  box-shadow:
    0 8px 18px rgba(91, 134, 229, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);

  transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow:
      0 12px 26px rgba(91, 134, 229, 0.45),
      inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  &:active {
    transform: translateY(0px) scale(0.99);
  }
`;
