import styled from "styled-components";
import Image from "next/image";
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// TOP OF FILE, before `export default function Detail...`
const IPFS_GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
];

function toCid(val = "") {
  if (!val) return "";
  if (val.startsWith("ipfs://")) return val.replace("ipfs://", "");
  const m = val.match(/\/ipfs\/([^/?#]+)/);
  return m ? m[1] : val; // fall back to raw CID
}


export default function Detail({ Data = {}, DonationsData = [] }) {
  const [mydonations, setMydonations] = useState([]);
  const [story, setStory] = useState('');
  const [amount, setAmount] = useState('');
  const [change, setChange] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);  // Track if the user is the owner

  // ADD THESE LINES inside the component (above `return`)
  const [gw, setGw] = useState(0);                           // which gateway index
  const cid = toCid(Data?.image);                            // normalize whatever you stored
  const imgSrc = cid ? `${IPFS_GATEWAYS[gw]}${cid}` : "/default-image.jpg"; // current URL

  const fetchFeedbacks = async () => {
    if (!Data.address) return;
    try {
      const res = await fetch(`/api/feedback/${Data.address}`);
      const result = await res.json();
      if (result.success) setFeedbacks(result.feedbacks);
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  useEffect(() => {
    const Request = async () => {
      if (!Data.address) return;

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();
      setUserAddress(Address);

      // Check if the user is the campaign owner
      if (Address.toLowerCase() === Data.owner.toLowerCase()) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }

      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const contract = new ethers.Contract(Data.address, Campaign.abi, provider);

      // const response = await fetch(`https://crowdfunding.infura-ipfs.io/ipfs/${Data.storyUrl}`);
      // const data = await response.text();
      // setStory(data);

      // Fetch story from public gateways with fallback
      const storyCid = toCid(Data.storyUrl);
      let storyText = "";

      if (storyCid) {
        for (const base of IPFS_GATEWAYS) {
          try {
            const res = await fetch(`${base}${storyCid}`, { cache: "no-store" });
            if (!res.ok) continue;

            const ct = res.headers.get("content-type") || "";
            // support plain text or JSON stories
            if (ct.includes("application/json")) {
              const json = await res.json();
              storyText = JSON.stringify(json, null, 2);
            } else {
              storyText = await res.text();
            }

            // guard against Infura error pages or empty text
            if (storyText && !/infura\.io\/dashboard/i.test(storyText)) {
              break; // we got a good story
            } else {
              storyText = "";
            }
          } catch (_) {
            // try next gateway
          }
        }
      }

      setStory(storyText || "Story not available right now. Please try again later.");


      const MyDonations = contract.filters.donated(Address);
      const MyAllDonations = await contract.queryFilter(MyDonations);

      setMydonations(MyAllDonations.map((e) => ({
        donar: e.args.donar,
        amount: ethers.utils.formatEther(e.args.amount),
        timestamp: parseInt(e.args.timestamp)
      })));
    };

    Request();
  }, [Data, change]);

  useEffect(() => {
    fetchFeedbacks();
  }, [Data]);

  const DonateFunds = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Data.address, Campaign.abi, signer);

      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        toast.error('❌ Enter a valid amount greater than 0.');
        return;
      }

      const parsedAmount = ethers.utils.parseEther(amount);
      const received = await contract.receivedAmount();
      const required = await contract.requiredAmount();

      if (received.gte(required)) {
        toast('❌ Donations are already full for this campaign.');
        return;
      }

      const toastId = toast.loading('⏳ Processing your donation...');

      const transaction = await contract.donate({
        value: parsedAmount,
      });

      await transaction.wait();

      toast.success('✅ Donation successful!', {
        id: toastId,
      });

      setChange(!change);
      setAmount('');
    } catch (error) {
      console.error("Error during donation:", error);
      toast.dismiss(); // ❗ Closes loading toast
      toast.error('⚠ Donation failed or cancelled.');
    }
  };

  const submitFeedback = async () => {
    if (!newFeedback.trim()) {
      toast.error("Feedback can't be empty.");
      return;
    }

    const toastId = toast.loading('Submitting feedback...');

    try {
      const res = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignAddress: Data.address,
          userAddress: userAddress,
          message: newFeedback,
        }),
      });

      const result = await res.json();

      if (result.success) {
        // Update UI
        setFeedbacks([result.feedback, ...feedbacks]);
        setNewFeedback('');

        toast.success('✅ Feedback submitted successfully!', { id: toastId });
      } else {
        toast.error(result.message || 'Failed to submit feedback.', { id: toastId });
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.error('❌ Error submitting feedback.', { id: toastId });
    }
  };

  return (
    <DetailWrapper>
      <LeftContainer>
        <ImageSection>
          <Image
            alt="crowdfunding dapp"
            src={imgSrc}
            fill                
            unoptimized         
            onError={() => gw < IPFS_GATEWAYS.length - 1 && setGw(gw + 1)} // try next gateway
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />

        </ImageSection>
        <Text
    as="pre"
    style={{
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}
  >
    {story}
  </Text>
      </LeftContainer>

      <RightContainer>
        <Title>{Data.title}</Title>
        <DonateSection>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <Donate onClick={DonateFunds}>Donate</Donate>
        </DonateSection>

        <FundsData>
          <Funds>
            <FundText>Required Amount</FundText>
            <FundText>{Data.requiredAmount} Matic</FundText>
          </Funds>
          <Funds>
            <FundText>Received Amount</FundText>
            <FundText>{Data.receivedAmount} Matic</FundText>
          </Funds>
        </FundsData>

        <Donated>
          <LiveDonation>
            <DonationTitle>Recent Donation</DonationTitle>
            {DonationsData.map((e) => (
              <Donation key={e.timestamp}>
                <DonationData>{e.donar.slice(0, 6)}...{e.donar.slice(39)}</DonationData>
                <DonationData>{e.amount} Matic</DonationData>
                <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
            ))}
          </LiveDonation>

          <MyDonation>
            <DonationTitle>My Past Donation</DonationTitle>
            {mydonations.map((e) => (
              <Donation key={e.timestamp}>
                <DonationData>{e.donar.slice(0, 6)}...{e.donar.slice(39)}</DonationData>
                <DonationData>{e.amount} Matic</DonationData>
                <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
              </Donation>
            ))}
          </MyDonation>
        </Donated>
        <br></br><br></br>

        {/* Feedback section */}
        <DonationTitle>Feedbacks</DonationTitle>
        <FeedbackSection>
  {/* Show all feedbacks to both the owner and the contributors */}

  {/* If the user is the owner, show the feedback input and submit button */}
  {isOwner && (
    <>
      <FeedbackInput
        value={newFeedback}
        onChange={(e) => setNewFeedback(e.target.value)}
        placeholder="Write your feedback..."
      />
      <Donate onClick={submitFeedback}>Submit</Donate>
    </>
  )}
    {feedbacks.map((fb, i) => (
    <FeedbackItem key={i}>
      <p><b>{fb.userAddress.slice(0, 6)}...{fb.userAddress.slice(-4)}</b></p>
      <p>{fb.message}</p>
    </FeedbackItem>
  ))}
</FeedbackSection>

      </RightContainer>
    </DetailWrapper>
  );
}

// Static Paths
export async function getStaticPaths() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS, CampaignFactory.abi, provider);
  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);

  return {
    paths: AllCampaigns.map((e) => ({
      params: { address: e.args.campaignAddress.toString() }
    })),
    fallback: "blocking"
  };
}

// Static Props
export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const contract = new ethers.Contract(context.params.address, Campaign.abi, provider);

  const title = await contract.title();
  const requiredAmount = await contract.requiredAmount();
  const image = await contract.image();
  const storyUrl = await contract.story();
  const owner = await contract.owner();
  const receivedAmount = await contract.receivedAmount();

  const Donations = contract.filters.donated();
  const AllDonations = await contract.queryFilter(Donations);

  const Data = {
    address: context.params.address,
    title,
    requiredAmount: ethers.utils.formatEther(requiredAmount),
    image,
    receivedAmount: ethers.utils.formatEther(receivedAmount),
    storyUrl,
    owner,
  };

  const DonationsData = AllDonations.map((e) => ({
    donar: e.args.donar,
    amount: ethers.utils.formatEther(e.args.amount),
    timestamp: parseInt(e.args.timestamp)
  }));

  return {
    props: {
      Data,
      DonationsData
    },
    revalidate: 10
  };
}

// Add your styled components below (DetailWrapper, RightContainer, etc.)

// Keep getStaticPaths and getStaticProps same as before
const FeedbackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const FeedbackInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  background-color: ${({ theme }) => theme.bgSecondary || "#f9f9f9"};
  color: ${({ theme }) => theme.text || "#000"};
`;

const FeedbackItem = styled.div`
  border: 1px solid #444;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.bgSecondary || "#1a1a1a"};
  color: ${({ theme }) => theme.text || "#fff"};
`;


const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 98%;
    padding-top: 80px;
`;
const LeftContainer = styled.div`
  width: 45%;
`;
const RightContainer = styled.div`
  width: 50%;
`;
const ImageSection = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  
`;
const Text = styled.p`
  font-family: "Roboto";
  font-size: large;
  color: ${(props) => props.theme.color};
  text-align: justify;
`;
const Title = styled.h1`
  padding: 0;
  margin: 0;
  font-family: "Poppins";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 30px;
`;
const Input = styled.input`
  padding: 10px 20px;
  background: ${(props) => props.theme.mode === 'dark'
    ? "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(50, 50, 50, 0.6))"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 230, 230, 0.7))"};
  color: ${(props) => props.theme.mode === 'dark' ? "#00eaff" : "#333"};
  border: 2px solid ${(props) => props.theme.mode === 'dark' ? "#00eaff" : "#007bff"};
  border-radius: 12px;
  outline: none;
  font-size: 18px;
  width: 42%;
  height: 30px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  box-shadow: 0px 4px 15px ${(props) => props.theme.mode === 'dark'
    ? "rgba(0, 234, 255, 0.5)"
    : "rgba(0, 123, 255, 0.3)"};
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: ${(props) => props.theme.mode === 'dark' ? "rgba(0, 234, 255, 0.6)" : "rgba(0, 123, 255, 0.6)"};
    font-style: italic;
  }

  &:focus {
    background: ${(props) => props.theme.mode === 'dark'
    ? "linear-gradient(135deg, rgba(0, 10, 20, 0.8), rgba(20, 50, 80, 0.6))"
    : "linear-gradient(135deg, rgba(230, 245, 255, 0.9), rgba(200, 220, 255, 0.7))"};
    border-color: ${(props) => props.theme.mode === 'dark' ? "#00ffea" : "#0056b3"};
    transform: scale(1.05);
    box-shadow: 0px 6px 20px ${(props) => props.theme.mode === 'dark'
    ? "rgba(0, 255, 234, 0.7)"
    : "rgba(0, 86, 179, 0.5)"};
  }
`;

const Donate = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 15px;
  font-size: large;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-in-out;

  /* Adaptive Dual Mode */
  color: ${(props) => (props.theme.mode === 'dark' ? '#fff' : '#111')};
  background: ${(props) => (props.theme.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(0, 255, 200, 0.7), rgba(255, 0, 200, 0.7))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 230, 230, 0.8))')};
  box-shadow: ${(props) => (props.theme.mode === 'dark'
    ? '0px 5px 15px rgba(0, 255, 200, 0.6)'
    : '0px 5px 15px rgba(0, 0, 0, 0.1)')};

  /* Glow Effect */
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 250%;
    height: 250%;
    background: radial-gradient(circle, rgba(0, 255, 200, 0.4), transparent);
    transform: rotate(0deg);
    transition: transform 0.7s ease-in-out;
  }

  &:hover::before {
    transform: rotate(360deg);
  }

  /* Dynamic Hover Effect */
  &:hover {
    transform: translateY(-5px);
    background: ${(props) => (props.theme.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(0, 255, 200, 1), rgba(255, 0, 200, 1))'
    : 'linear-gradient(135deg, rgba(240, 240, 240, 1), rgba(210, 210, 210, 0.8))')};
    box-shadow: ${(props) => (props.theme.mode === 'dark'
    ? '0px 10px 30px rgba(0, 255, 200, 0.8)'
    : '0px 10px 30px rgba(0, 0, 0, 0.15)')};
  }

  &:active {
    transform: scale(0.97);
  }
`;

const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 8px;
  border-radius: 8px;
  text-align: center;
`;
const FundText = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;
const Donated = styled.div`
  height: 280px;
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgDiv};
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
  padding: 10px;
  border-radius: 12px;
  background: ${(props) => props.theme.mode === 'dark'
    ? "rgba(50, 50, 50, 0.9)"
    : "rgba(230, 230, 230, 0.9)"};
  box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
    : "0px 4px 10px rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s ease-in-out;

  & > * {  /* Apply effect to each direct child (each row) */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    margin: 6px 0;
    border-radius: 12px;
    background: ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 255, 255, 0.05)"
    : "rgba(0, 0, 0, 0.05)"};
    font-weight: bold;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0px 6px 14px ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 138, 0, 0.3)"
    : "rgba(0, 123, 255, 0.3)"};
      background: ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 138, 0, 0.15)"
    : "rgba(0, 123, 255, 0.15)"};
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.mode === 'dark'
    ? "rgba(255, 138, 0, 0.7)"
    : "rgba(0, 123, 255, 0.7)"};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;

  div {
    padding: 5px;
    margin: 5px 0;
    border-radius: 8px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      transform: translateY(-3px) scale(1.01);
      box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.1);
    }
  }
`;

const DonationTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  padding: 8px 12px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #fff;
  background: linear-gradient(90deg, #4cd137, #2ecc71);
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(76, 209, 55, 0.3);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0px 6px 15px rgba(76, 209, 55, 0.5);
    background: linear-gradient(90deg, #2ecc71, #4cd137);
  }
`;

const Donation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 4px 8px;
`;
const DonationData = styled.p`
  color: ${(props) => props.theme.color};
  font-family: "Roboto";
  font-size: large;
  margin: 0;
  padding: 0;
`;