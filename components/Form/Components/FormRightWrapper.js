import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const PINATA_API_KEY = "eb63a89ff422bdd723a1"; // Replace with your Pinata API Key
const PINATA_API_SECRET = "e02243f980e7043ffe2e762c2778d5a5767f6e3635415cae5d24f792df072bcd"; // Replace with your Pinata API Secret

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      toast.warn("Error Uploading File");
      return null;
    }
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.story !== "") {
      const storyCID = await uploadToPinata(new Blob([Handler.form.story], { type: "text/plain" }));
      if (storyCID) Handler.setStoryUrl(storyCID);
    }

    if (Handler.image !== null) {
      const imageCID = await uploadToPinata(Handler.image);
      if (imageCID) Handler.setImageUrl(imageCID);
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Successfully");
  };

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              onChange={Handler.FormHandler}
              value={Handler.form.requiredAmount}
              name="requiredAmount"
              type={'number'}
              placeholder='Required Amount'
            />
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*' />
      </FormInput>

      {uploadLoading ? 
      <TailSpin color='#fff' height={20} /> 
      :
        uploaded === false ?
          <Button onClick={uploadFiles}>
            Upload Files to IPFS
          </Button>
          : <Button style={{ cursor: "no-drop" }}>Files Uploaded Successfully</Button>
      }

      <Button onClick={Handler.startCampaign}>
        Start Campaign
      </Button>
    </FormRight>
  )
};

const FormRight = styled.div`
  width:45%;
`;

const FormInput = styled.div`
  display:flex;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100%;
`;

const Input = styled.input`
  padding: 10px 10px;
  width: 100%;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  background: ${(props) =>
    props.theme.mode === 'dark'
      ? "linear-gradient(135deg, #1E1E2F, #2A2A3A)"
      : "linear-gradient(135deg, #F5F5F5, #FFFFFF)"};
  color: ${(props) => props.theme.color};
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  /* On hover, a subtle glow appears */
  &:hover {
    box-shadow: 0 0 8px 2px
      ${(props) =>
    props.theme.mode === 'dark'
      ? "rgba(0, 234, 255, 0.3)"
      : "rgba(0, 123, 255, 0.3)"};
  }

  /* On focus, the glow intensifies with a colored border */
  &:focus {
    border-color: ${(props) =>
    props.theme.mode === 'dark' ? "#00eaff" : "#007bff"};
    box-shadow: 0 0 12px 3px
      ${(props) =>
    props.theme.mode === 'dark'
      ? "rgba(0, 234, 255, 0.7)"
      : "rgba(0, 123, 255, 0.7)"};
  }

  /* Placeholder styling for better readability */
  &::placeholder {
    color: ${(props) => (props.theme.mode === 'dark' ? "#aaa" : "#666")};
  }
`;

const RowFirstInput = styled.div`
  display:flex;
  flex-direction:column;
  width:45%;
`;

const RowSecondInput = styled.div`
  display:flex;
  flex-direction:column;
  width:45%;
`;

const Select = styled.select`
  padding: 14px 18px;
  background: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 6px;
  border: 2px solid ${(props) => props.theme.bgSubDiv};
  border-radius: 10px;
  outline: none;
  font-size: 16px;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: inset 0px 0px 8px rgba(255, 255, 255, 0.1);

  &:hover {
    border-color: ${(props) => props.theme.mode === 'dark' ? '#ff8a00' : '#007bff'};
    background: linear-gradient(135deg, ${(props) => props.theme.bgDiv}, ${(props) => props.theme.bgSubDiv});
    box-shadow: 0px 4px 10px ${(props) => props.theme.mode === 'dark' ? 'rgba(255, 138, 0, 0.3)' : 'rgba(0, 123, 255, 0.3)'};
  }

  &:focus {
    border-color: ${(props) => props.theme.mode === 'dark' ? '#ff8a00' : '#007bff'};
    box-shadow: 0px 0px 12px ${(props) => props.theme.mode === 'dark' ? 'rgba(255, 138, 0, 0.8)' : 'rgba(0, 123, 255, 0.8)'};
  }
`;

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv};
  color:${(props) => props.theme.color};
  margin-top:4px;
  border:none;
  border-radius:8px;
  outline:none;
  font-size:large;
  width:100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline:none;
    border:none;
    font-weight:bold;
  }  
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme.mode === 'dark' ? "#f8f9fa" : "#222"};
  background: ${(props) => props.theme.mode === 'dark' 
    ? "linear-gradient(135deg, #2E8B57, #3CB371)" 
    : "linear-gradient(135deg, #006D77, #83C5BE)"};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => props.theme.mode === 'dark' 
    ? "0px 4px 12px rgba(46, 139, 87, 0.3)" 
    : "0px 4px 12px rgba(0, 109, 119, 0.3)"};

  margin-bottom: 15px;  /* 🔥 Adds 15px spacing BELOW each button */

  &:hover {
    background: ${(props) => props.theme.mode === 'dark' 
      ? "linear-gradient(135deg, #3CB371, #2E8B57)" 
      : "linear-gradient(135deg, #83C5BE, #006D77)"};
    box-shadow: ${(props) => props.theme.mode === 'dark' 
      ? "0px 6px 18px rgba(46, 139, 87, 0.5)" 
      : "0px 6px 18px rgba(0, 109, 119, 0.5)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;


export default FormRightWrapper;