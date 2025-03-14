import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);
  
  return(

    <FormLeft>
        <FormInput>
            <lable>Campaign Title</lable>
            <Input onChange={Handler.FormHandler} value={Handler.form.campainTitle} placeholder='Campaign Title' name='campaignTitle'>
            </Input>
        </FormInput>
        <FormInput>
            <lable>Story</lable>
            <TextArea onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
            </TextArea>
        </FormInput>

    </FormLeft>
  )
}

const FormLeft = styled.div`
width:48%;
`

const FormInput = styled.div`
display:flex;
flex-direction:column;
font-family:'poppins';
margin-top:10px;
`

const Input = styled.input`
  padding: 15px;
  background: ${(props) => props.theme.mode === 'dark'
    ? "linear-gradient(135deg, #2A2A3A, #383B45)"
    : "linear-gradient(135deg, #f8f9fa, #e9ecef)"};
  color: ${(props) => props.theme.color};
  margin-top: 6px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: large;
  width: 100%;
  box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "inset 0px -2px 8px rgba(255, 138, 0, 0.2)"
    : "inset 0px -2px 8px rgba(0, 123, 255, 0.2)"};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "0px 4px 12px rgba(255, 138, 0, 0.25)"
    : "0px 4px 12px rgba(0, 123, 255, 0.25)"};
  }

  &:focus {
    box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "0px 0px 15px rgba(255, 138, 0, 0.5)"
    : "0px 0px 15px rgba(0, 123, 255, 0.5)"};
    border: 1px solid ${(props) => props.theme.mode === 'dark' ? "#ff8a00" : "#007bff"};
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  background: ${(props) => props.theme.mode === 'dark'
    ? "linear-gradient(135deg, #2A2A3A, #383B45)"
    : "linear-gradient(135deg, #f5f5f5, #e0e0e0)"};
  color: ${(props) => props.theme.mode === 'dark' ? "#E0E0E0" : "#222"};
  margin-top: 6px;
  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  max-width: 100%;
  min-width: 100%;
  min-height: 160px;
  resize: vertical;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "0px 4px 12px rgba(255, 138, 0, 0.1)"
    : "0px 4px 12px rgba(0, 123, 255, 0.1)"};

  &::placeholder {
    color: ${(props) => props.theme.mode === 'dark' ? "#888" : "#555"};
    font-style: italic;
  }

  &:hover {
    border-color: ${(props) => props.theme.mode === 'dark' ? "#ff8a00" : "#007bff"};
  }

  &:focus {
    border-color: ${(props) => props.theme.mode === 'dark' ? "#ff8a00" : "#007bff"};
    box-shadow: ${(props) => props.theme.mode === 'dark'
    ? "0px 0px 15px rgba(255, 138, 0, 0.5)"
    : "0px 0px 15px rgba(0, 123, 255, 0.5)"};
    transform: scale(1.02);
  }
`;

export default FormLeftWrapper