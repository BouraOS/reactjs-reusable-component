import styled from "styled-components";
const Preloader = () => {
  const LoaderContainer = styled.div`
    .loader-container {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
    }

    .spinner {
      width: 64px;
      height: 64px;
      border: 8px solid;
      border-color: #48a627 transparent #48a627 transparent;
      border-radius: 50%;
      animation: spin-anim 1.2s linear infinite;
    }

    @keyframes spin-anim {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  return (
    <>
      <LoaderContainer>
        <div className={"loader-container"}>
          <div className="spinner"></div>
        </div>
      </LoaderContainer>
    </>
  );
};

export default Preloader;
