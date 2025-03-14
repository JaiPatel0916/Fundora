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
  padding:15px;
  background-color:${(props) => props.theme.bgDiv};
  color:${(props) => props.theme.color};
  margin-top:4px;
  border:none;
  border-radius:8px;
  outline:none;
  font-size:large;
  width:100%;
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
  padding:15px;
  background-color:${(props) => props.theme.bgDiv};
  color:${(props) => props.theme.color};
  margin-top:4px;
  border:none;
  border-radius:8px;
  outline:none;
  font-size:large;
  width:100%;
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
  justify-content:center;
  width:100%;
  padding:15px;
  color:white;
  background-color:#00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border:none;
  margin-top:30px;
  cursor: pointer;
  font-weight:bold;
  font-size:large;
`;

export default FormRightWrapper;