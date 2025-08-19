import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const SuccessStoriesWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #2b3e50, #30404d, #455f73);
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 40px;
  color: #1abc9c;
  text-shadow: 2px 2px 15px rgba(26, 188, 156, 0.7);
  letter-spacing: 3px;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  width: 90%;
  max-width: 1300px;
`;

const StoryCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(26, 188, 156, 0.5);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 35px rgba(26, 188, 156, 0.7);
  }

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(26, 188, 156, 0.3), transparent);
    transition: 0.6s;
    z-index: 0;
  }

  &:hover::before {
    transform: scale(1.25);
    opacity: 0;
  }
`;

const StoryTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #1abc9c;
  z-index: 2;
  position: relative;
`;

const StoryContent = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  z-index: 2;
  position: relative;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  padding: 14px 30px;
  background:rgb(177, 188, 26);
  color: black;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: rgba(26, 188, 156, 0.8);
    transform: scale(1.1);
  }
`;

const SuccessStories = () => {
  const stories = [
    {
      title: "🚀 John Raised $50,000",
      content:
        "John used our platform to fund his startup and successfully raised $50,000 within a month!",
    },
    {
      title: "💖 Sarah's Medical Fund",
      content:
        "Sarah crowdfunded for her medical expenses and got overwhelming support from the community.",
    },
    {
      title: "🎓 Alex's Education Grant",
      content:
        "Alex secured full funding for his college education, helping him achieve his dreams!",
    },
    {
      title: "🐶 Emily's Animal Shelter",
      content:
        "Emily launched a campaign for a local animal shelter and saved hundreds of stray animals.",
    },
    {
      title: "📚 Emma's Scholarship Fund",
      content:
        "Emma raised funds to establish a scholarship for underprivileged students, helping them pursue higher education.",
    },
    {
      title: "🎓 Sunita Raised $20,000 for College Tuition",
      content:
        "Sarah crowdfunded $20,000 for her college tuition, making her dream of higher education a reality!",
    },
    {
      title: "🩺 Olivia's Medical Aid Fund",
      content:
        "Olivia created a medical aid fund that helped provide life-saving surgeries for children in need.",
    },
    {
      title: "🦸‍♀️ Ava's Health Awareness Campaign",
      content:
        "Ava's campaign for breast cancer awareness raised thousands of dollars and educated communities on early detection.",
    },
    {
      title: "🐶 Bella's Animal Rescue",
      content:
        "Bella founded an animal rescue organization that saved hundreds of abandoned pets and found them loving homes.",
    },
   
    {
      title: "🩺 Tom Raised $30,000 for Cancer Treatment",
      content:
        "Tom used our platform to raise $30,000 for his cancer treatment, receiving immense support from his community.",
    },
    
    {
      title: "💖 Anna Raised $40,000 for Mental Health Care",
      content:
        "Anna successfully raised $40,000 to provide mental health care for individuals who couldn't afford therapy or counseling services.",
    },
    {
      title: "🐶 Megan Raised $20,000 for Animal Rescue",
      content:
        "Megan raised $20,000 to fund an animal rescue operation, providing food, shelter, and medical care for abandoned pets.",
    },
  ];

  return (
    <SuccessStoriesWrapper key={Math.random()}>
 {/* Add a key prop to trigger re-render */}
      <Title>🌟 Our Success Stories</Title>
      <StoryGrid>
        {stories.map((story, index) => (
          <StoryCard key={index}>
            <StoryTitle>{story.title}</StoryTitle>
            <StoryContent>{story.content}</StoryContent>
          </StoryCard>
        ))}
      </StoryGrid>
      <BackButton href="/">← Back to Home</BackButton>
    </SuccessStoriesWrapper>
  );
};

export default SuccessStories;
