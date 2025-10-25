import React from "react";
import styled from "styled-components";

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="coffee-picker-pattern" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .coffee-picker-pattern {
    /* Basic dimensions and centering */
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    /* Dark mode colors and gradient */
    background: #121212; /* Fallback for browsers that don't support gradients */
    background: linear-gradient(
      135deg,
      #121212 25%,
      #1a1a1a 25%,
      #1a1a1a 50%,
      #121212 50%,
      #121212 75%,
      #1a1a1a 75%,
      #1a1a1a
    );
    background-size: 40px 40px;

    /* Animation */
    animation: move 4s linear infinite;
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 40px;
    }
  }
`;

export default Pattern;
