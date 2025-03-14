import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper';
import FormRightWrapper from './Components/FormRightWrapper'; 
import { createContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from 'ethers'; 
import { toast } from 'react-toastify';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json';

const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [image, setImage] = useState(null); // Fix: Declare image state
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const startCampaign = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        if (form.campaignTitle === "") {
            toast.warn("Title Field Is Empty");
        } else if (form.story === "") {
            toast.warn("Story Field Is Empty");
        } else if (form.requiredAmount === "") {
            toast.warn("Required Amount Field Is Empty");
        } else if (uploaded === false) {  // Fix: Strict comparison
            toast.warn("Files Upload Required");
        } else {        
            setLoading(true);  
    
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_ADDRESS,
                CampaignFactory.abi,
                signer
            );
            
            const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
    
            const campaignData = await contract.createCampaign(
                form.campaignTitle,
                CampaignAmount,
                imageUrl,
                form.category,
                storyUrl
            );
    
            await campaignData.wait();   
    
            setAddress(campaignData.hash); // Fix: Correctly assign transaction hash
        }
    };

    return (
        <FormState.Provider value={{ form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, setLoading, setAddress, startCampaign, setUploaded }}>
            <FormWrapper>
                <FormMain>
                    {loading === true ? (
                        address === "" ? (
                            <Spinner>
                                <TailSpin height={60} />+
                            </Spinner>
                        ) : (
                            <Address>
                                <h1>Campaign Started Successfully</h1>
                                <h1>{address}</h1>
                                <link href={`https://polygonscan.com/tx/${address}`} target="_blank" rel="noopener noreferrer">
                                    <Button>GO TO CAMPAIGN</Button>
                                </link>
                            </Address>
                        )
                    ) : (
                        <FormInputWrapper>
                            <FormLeftWrapper />
                            <FormRightWrapper />
                        </FormInputWrapper>
                    )}
                </FormMain>
            </FormWrapper>
        </FormState.Provider>
    );
};

const FormWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const FormMain = styled.div`
    width: 80%;
`;

const FormInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
`;

const Spinner = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Address = styled.div`
    width: 100%;
    height: 80vh;   
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme?.bgSubDiv || "gray"}; 
    border-radius: 8px;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    width: 30%;
    padding: 15px;
    color: white;
    background-color: #00b712;
    background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
    border: none;
    margin-top: 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: large;
`;

export default Form;
export { FormState };
