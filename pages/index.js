import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import {ethers} from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json' 
import {useState} from 'react';
import Link from 'next/link'

export default function Index({ AllData, HealthData, EducationData, AnimalData }) {
    const [filter, setFilter] = useState(AllData);
    return (
        <HomeWrapper>
            {/* Filter Section */}
            <FilterWrapper>
                <FilterAltIcon style={{ fontSize: 40 }} />
                <Category onClick={() => setFilter(AllData)}>All</Category>
                <Category onClick={() => setFilter(HealthData)}>Health</Category>
                <Category onClick={() => setFilter(EducationData)}>Education</Category>
                <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
            </FilterWrapper>

            {/* Cards Container */}
            <CardsWrapper>
                {filter.map((e) => (
                    <Card key={e.title}>
                        <CardImg>
                            <Image 
                                alt="Crowdfunding dapp"
                                src={e.image ? `https://ipfs.infura.io/ipfs/${e.image}` : "/default-image.jpg"}
                               layout="fill" // ✅ Ensures the image fills the container
        objectFit="cover"
                            />
                        </CardImg>
                        <Title>{e.title}</Title>
                        <CardData>
                            <Text>Owner<AccountBoxIcon /></Text> 
                            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
                        </CardData>
                        <CardData>
                            <Text>Amount<PaidIcon /></Text> 
                            <Text>{e.amount} Matic</Text>
                        </CardData>
                        <CardData>
                            <Text><EventIcon /></Text>
                            <Text suppressHydrationWarning>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
                        </CardData>
                      <Link passHref href={'/' + e.address}>
          <Button>
            Go to Campaign
          </Button>
          </Link>
                    </Card>
                ))}
            </CardsWrapper>
        </HomeWrapper>
    );
}


export async function getStaticProps() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
    
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );
    
      const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });


  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    },
    revalidate: 10
  }
    }

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin-top: 15px;
`;

const Category = styled.div`
  padding: 12px 18px;
  margin: 0px 15px;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-in-out;

  /* Adaptive Theme */
  background: ${(props) => (props.theme.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(50, 50, 50, 0.8), rgba(100, 100, 100, 0.5))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 230, 230, 0.7))')};
  color: ${(props) => (props.theme.mode === 'dark' ? '#fff' : '#111')};
  box-shadow: ${(props) => (props.theme.mode === 'dark'
    ? '0 5px 15px rgba(0, 255, 200, 0.4)'
    : '0 5px 15px rgba(0, 0, 0, 0.1)')};

  /* Dynamic Glow Effect */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 200, 0.4), transparent);
    transform: rotate(0deg);
    transition: transform 0.7s ease-in-out;
  }

  &:hover::before {
    transform: rotate(360deg);
  }

  /* Hover Effects */
  &:hover {
    transform: translateY(-5px);
    background: ${(props) => (props.theme.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(80, 80, 80, 0.6))'
    : 'linear-gradient(135deg, rgba(240, 240, 240, 1), rgba(210, 210, 210, 0.8))')};
    box-shadow: ${(props) => (props.theme.mode === 'dark'
    ? '0 10px 30px rgba(255, 0, 200, 0.7)'
    : '0 10px 30px rgba(0, 0, 0, 0.15)')};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CardsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    margin-top: 25px;
`;

const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 255, 200, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 200, 0.5), transparent);
    transform: rotate(0deg);
    transition: transform 1s ease-in-out;
  }

  &:hover::before {
    transform: rotate(360deg);
  }

  &:hover {
    transform: perspective(800px) rotateX(10deg) rotateY(10deg) translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 255, 200, 0.7);
    background: linear-gradient(135deg, rgba(0, 255, 200, 0.2), rgba(255, 0, 200, 0.2));
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CardImg = styled.div`
    position: relative;
    height: 120px;
    width: 100%;
`;

const Title = styled.h2`
    font-family: 'Roboto';
    font-size: 18px;
    margin: 2px 0px;
    background-color: ${(props) => props.theme.bgSubDiv};
    padding: 5px;
    cursor: pointer;
    font-weight: normal;
`;

const CardData = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2px 0px;
    background-color: ${(props) => props.theme.bgSubDiv};
    padding: 5px;
    cursor: pointer;
`;

const Text = styled.p`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    font-size: 18px;
    font-weight: bold;
`;

const Button = styled.button`
  padding: 12px 20px;
  text-align: center;
  width: 100%;
  border: none;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(0, 255, 200, 0.8), rgba(255, 0, 200, 0.8));
 
  box-shadow: 0px 0px 10px rgba(0, 255, 200, 0.7), 0px 0px 20px rgba(255, 0, 200, 0.7);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    transform: rotate(0deg);
    transition: transform 0.5s ease-in-out;
  }

  &:hover::before {
    transform: rotate(360deg);
  }

  &:hover {
    background: linear-gradient(135deg, rgba(255, 0, 200, 0.9), rgba(0, 255, 200, 0.9));
    box-shadow: 0px 0px 15px rgba(255, 0, 200, 0.8), 0px 0px 30px rgba(0, 255, 200, 0.8);
  }

  &:active {
    transform: scale(0.95);
  }
`;
