import styled, { keyframes } from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { useState } from 'react';
import Link from 'next/link';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import FAQSection from '../components/Form/Components/FAQSection';
import Landing from './landing';

/* =======================
   IPFS helpers (fallback)
   ======================= */
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
      alt="Crowdfunding dapp"
      src={src}
      fill
      unoptimized
      onError={() => gw < IPFS_GATEWAYS.length - 1 && setGw(gw + 1)}
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
    />
  );
}

export default function Home({ AllData, HealthData, EducationData, AnimalData }) {
  const [filter, setFilter] = useState(AllData);
  const router = useRouter();

  const handleGoToCampaign = async (address) => {
    const id = toast.loading('Getting campaign ready...', {
      position: 'top-center',
      theme: 'dark',
    });
    try {
      await router.push(`/${address}`);
    } finally {
      toast.dismiss(id);
    }
  };

  return (
    <>
      {/* Your existing hero/landing section */}
      <Landing />

      <Page>
        <Main>
          <SectionTitle>Popular Campaigns</SectionTitle>

          {/* Filters */}
          <FilterBar>
            <FilterLeft>
              <FilterAltIcon style={{ fontSize: 32 }} />
              <FilterLabel>Filter:</FilterLabel>
            </FilterLeft>
            <FilterChips>
              <Category onClick={() => setFilter(AllData)}>All</Category>
              <Category onClick={() => setFilter(HealthData)}>Health</Category>
              <Category onClick={() => setFilter(EducationData)}>Education</Category>
              <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
            </FilterChips>
          </FilterBar>

          {/* Cards */}
          <CardsGrid
            as={motion.div}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {filter.map((e) => (
              <Card key={e.address}>
                <CardImg>
                  <CampaignImage cid={e.image} />
                </CardImg>

                <CardBody>
                  <Title>{e.title}</Title>

                  <CardRow>
                    <Text>
                      Owner&nbsp;<AccountBoxIcon fontSize="small" />
                    </Text>
                    <Text>{e.owner.slice(0, 6)}...{e.owner.slice(-4)}</Text>
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

                  <Button onClick={() => handleGoToCampaign(e.address)}>
                    Go to Campaign
                  </Button>
                </CardBody>
              </Card>
            ))}
          </CardsGrid>

          <FAQSection />
        </Main>

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Page>
    </>
  );
}

/* ===========================
   Data (unchanged)
   =========================== */
export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS, CampaignFactory.abi, provider);

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => ({
    title: e.args.title,
    image: e.args.imgURI,
    owner: e.args.owner,
    timeStamp: parseInt(e.args.timestamp),
    amount: ethers.utils.formatEther(e.args.requiredAmount),
    address: e.args.campaignAddress,
  }));

  const getHealthCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => ({
    title: e.args.title,
    image: e.args.imgURI,
    owner: e.args.owner,
    timeStamp: parseInt(e.args.timestamp),
    amount: ethers.utils.formatEther(e.args.requiredAmount),
    address: e.args.campaignAddress,
  }));

  const getEducationCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => ({
    title: e.args.title,
    image: e.args.imgURI,
    owner: e.args.owner,
    timeStamp: parseInt(e.args.timestamp),
    amount: ethers.utils.formatEther(e.args.requiredAmount),
    address: e.args.campaignAddress,
  }));

  const getAnimalCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => ({
    title: e.args.title,
    image: e.args.imgURI,
    owner: e.args.owner,
    timeStamp: parseInt(e.args.timestamp),
    amount: ethers.utils.formatEther(e.args.requiredAmount),
    address: e.args.campaignAddress,
  }));

  return {
    props: { AllData, HealthData, EducationData, AnimalData },
    revalidate: 10,
  };
}

/* ===========================
   Animations
   =========================== */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
const pulse = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(0,255,255,0.2); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(0,255,255,0.4); }
`;
const colorWave = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

/* ===========================
   Styled components (UI)
   =========================== */

/* Full page wrapper with modern gradient + sticky footer */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
background:
  linear-gradient(135deg, #070b19 0%, #1a1f42 50%, #0c122c 100%),
  radial-gradient(50% 70% at 85% 15%, rgba(0, 255, 200, 0.18), transparent 70%),
  radial-gradient(50% 70% at 15% 85%, rgba(255, 0, 200, 0.15), transparent 70%);

  background-attachment: fixed;
`;

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 20px 32px;
`;

/* Section title you already had, kept but centered to the new layout */
export const SectionTitle = styled.h1`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 900;
  text-align: center;
  margin: 20px 0 24px;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 2;
  letter-spacing: 2px;
  line-height: 1.2;
 background: linear-gradient(90deg, #00f5ff, #ff00ea, #00f5ff);

  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 6s linear infinite, ${pulse} 4s ease-in-out infinite;

  &::after {
    content: '';
    display: block;
    margin: 0.75rem auto 0;
    width: 120px;
    height: 5px;
    background: linear-gradient(270deg, #ff00c8, #00ffe0, #5f00ff, #00ff8f);
    background-size: 800% 800%;
    animation: ${colorWave} 8s ease infinite;
    border-radius: 4px;
    box-shadow: 0 0 15px rgba(0,255,255,0.4);
  }
`;

const FilterBar = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 8px auto 12px;

  display: flex;
  align-items: center;

  /* ⬅️ everything will stay together on the left */
  justify-content: flex-start;

  gap: 16px;
`;

const FilterLeft = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #eaf9ff;

  /* Prevent wrapping */
  white-space: nowrap;
`;

const FilterChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  /* Ensures chips appear *right after* the icon + label */
  align-items: center;
`;


const FilterLabel = styled.span`
  font-weight: 700;
  opacity: 0.85;
`;



const Category = styled.div`
  padding: 10px 16px;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(230,230,230,0.6));
  color: #111;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3);

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, rgba(255,255,255,1), rgba(240,240,240,0.85));
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

/* Responsive grid: 3 → 2 → 1 with spacing */
const CardsGrid = styled.div`
  width: 100%;
  max-width: 1580px;
  display: grid;
  padding-top: 20px;
  gap: 88px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
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

  /* 👇 this makes the content area take all remaining space */
  flex: 1 1 auto;

  /* optional: remove fixed min-height if you had one */
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

  @media (max-width: 425px) { font-size: 14px; }
`;

const Button = styled.button`
  margin-top: auto; /* stick to bottom of the card */
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

const FooterWrapper = styled.footer`
  flex-shrink: 0;
  width: 100%;
`;
