import React, { useState } from 'react';
import styled from 'styled-components';

const faqs = [
  {
    question: 'What is this platform about?',
    answer: 'This platform allows users to explore and support amazing campaigns.',
  },
  {
    question: 'How can I donate?',
    answer: 'Just click on a campaign and use the donation box to support it.',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Absolutely. All payments are processed securely through trusted gateways.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Wrapper>
      <BackgroundVideo autoPlay muted loop>
        <source src="https://cdn.pixabay.com/video/2023/11/17/189526-886011271_large.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Content>
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <QuestionBox key={index} onClick={() => toggleFAQ(index)}>
            <Question>{faq.question}</Question>
            <AnswerWrapper isActive={activeIndex === index}>
              <Answer>{faq.answer}</Answer>
            </AnswerWrapper>
          </QuestionBox>
        ))}
      </Content>
    </Wrapper>
  );
};

export default FAQSection;

// ------------------- Styled Components -------------------

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #fff;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 16px;
`;

const QuestionBox = styled.div`
  margin-bottom: 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #aaa;
  padding-bottom: 1rem;
`;

const Question = styled.h3`
  margin: 0;
  font-size: 1.4rem;
`;

const AnswerWrapper = styled.div`
  overflow: hidden;
  max-height: ${({ isActive }) => (isActive ? '300px' : '0')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  transform: translateY(${({ isActive }) => (isActive ? '0' : '-10px')});
  transition: max-height 0.5s ease, opacity 0.4s ease, transform 0.4s ease;
`;

const Answer = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #ddd;
`;
