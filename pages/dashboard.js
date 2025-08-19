import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Footer from '../components/layout/Footer';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );

      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
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
      })
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
    <HomeWrapper>

      {/* Cards Container */}
      <CardsWrapper>


        {/* Card */}
        {campaignsData.map((e) => {
          return (
            <Card key={e.title}>
              <CardImg>
                <Image
                  alt="crowdfunding dapp"
                  layout='fill'
                  src={"https://crowdfunding.infura-ipfs.io/ipfs/" + e.image}
                />
              </CardImg>
              <Title>
                {e.title}
              </Title>
              <CardData>
                <Text>Owner<AccountBoxIcon /></Text>
                <Text>{e.owner.slice(0, 6)}...{e.owner.slice(39)}</Text>
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
          )
        })}

        {/* Card */}

      </CardsWrapper>
      <Footer/>
    </HomeWrapper>
  )
}




const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
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
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
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
