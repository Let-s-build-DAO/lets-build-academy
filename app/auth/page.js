import Image from "next/image";
import Button from "../_components/Button";

const Auth = () => {
  return (
    <div className="w-full h-full md:h-[100vh] md:pr-[213px] bg-gray-200 justify-start items-center gap-[75px] md:inline-flex">
      <div className="w-full md:flex justify-between items-center gap-4 inline-flex hidden">
        <Image src={"/auth-img.png"} alt="auth-img" width={650} height={200} />
      </div>
      <div className="w-full p-4 md:p-0 md:w-[649px] self-stretch flex-col justify-start items-start gap-12 inline-flex">
        <div className="flex-col justify-start items-start gap-8 flex">
          <h1 className="w-[468px] text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            Connect Your <br />
            wallet
          </h1>
          <p className="w-full text-black text-[14px] md:text-lg font-normal font-['Poppins'] md:leading-loose">
            Choose your preferred blockchain and connect your on-chain Identity.
          </p>
        </div>
        <div className="flex-col justify-start items-start gap-6 flex">
          <h3 className="text-black text-lg font-bold font-['Poppins'] leading-loose">
            Blockchain
          </h3>
          <div className="justify-start items-start gap-[20px] inline-flex">
            <Button
              bg="bg-[#E9CFF1]"
              text="Ethereum"
              icon={
                <svg
                  width="20"
                  height="34"
                  viewBox="0 0 20 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_897_285)">
                    <path
                      d="M9.99717 0L9.77881 0.77458V23.2511L9.99717 23.4786L19.9942 17.3115L9.99717 0Z"
                      fill="#343434"
                    />
                    <path
                      d="M9.99703 0L0 17.3115L9.99703 23.4787V12.5692V0Z"
                      fill="#8C8C8C"
                    />
                    <path
                      d="M9.99707 25.4541L9.87402 25.6106V33.6172L9.99707 33.9924L20 19.29L9.99707 25.4541Z"
                      fill="#3C3C3B"
                    />
                    <path
                      d="M9.99703 33.9923V25.4539L0 19.2899L9.99703 33.9923Z"
                      fill="#8C8C8C"
                    />
                    <path
                      d="M9.99707 23.4786L19.9939 17.3116L9.99707 12.5693V23.4786Z"
                      fill="#141414"
                    />
                    <path
                      d="M0 17.3116L9.99688 23.4786V12.5693L0 17.3116Z"
                      fill="#393939"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_897_285">
                      <rect width="20" height="34" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              hover="hover:bg-[#8F0FBA]"
            />
            <Button
              bg="bg-[#E9CFF1]"
              text="DeSo"
              icon={
                <svg
                  width="29"
                  height="34"
                  viewBox="0 0 29 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.000976562 0V8.49866L21.712 20.925L0.000976562 33.9999H17.8896C23.6054 33.9999 28.235 29.816 28.235 24.654V17.0026L0.000976562 0Z"
                    fill="url(#paint0_linear_897_305)"
                  />
                  <path
                    d="M0.000976562 0L28.235 17.0026V9.34594C28.235 4.18396 23.6004 0 17.8896 0H0.000976562Z"
                    fill="url(#paint1_linear_897_305)"
                  />
                  <path
                    d="M14.853 17.0027L0 25.5013V34L21.711 20.9251L14.853 17.0027Z"
                    fill="url(#paint2_linear_897_305)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_897_305"
                      x1="3.90628"
                      y1="7.43326"
                      x2="27.3898"
                      y2="34.7521"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#0085FF" />
                      <stop offset="1" stop-color="#7EC0FF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_897_305"
                      x1="15.2358"
                      y1="11.732"
                      x2="24.4965"
                      y2="-1.14192"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#CEEAFF" />
                      <stop offset="0.626823" stop-color="#72B9FF" />
                      <stop
                        offset="1"
                        stop-color="#63B1FF"
                        stop-opacity="0.58"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_897_305"
                      x1="-4.68089"
                      y1="33.2258"
                      x2="27.0883"
                      y2="14.9087"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#2875EA" />
                      <stop offset="1" stop-color="#0038FF" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              hover="hover:bg-[#8F0FBA]"
            />
          </div>
        </div>
        <Button
          bg="bg-[#8F0FBA]"
          text="Connect with Metamask"
          width="md:w-[468px]"
          icon={
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.4131 4.45703L21.9209 13.7351L24.231 8.26117L34.4131 4.45703Z"
                fill="#E2761B"
                stroke="#E2761B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.57462 4.45703L17.9663 13.823L15.7692 8.26117L5.57462 4.45703ZM29.9186 25.9636L26.5916 31.0609L33.7102 33.0195L35.7567 26.0766L29.9186 25.9636ZM4.25635 26.0766L6.29025 33.0195L13.4089 31.0609L10.0818 25.9636L4.25635 26.0766Z"
                fill="#E4761B"
                stroke="#E4761B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.0071 17.3509L11.0234 20.3516L18.0919 20.6654L17.8408 13.0697L13.0071 17.3509ZM26.9807 17.3509L22.0843 12.9818L21.9211 20.6654L28.977 20.3516L26.9807 17.3509ZM13.4089 31.0609L17.6524 28.9893L13.9864 26.1268L13.4089 31.0609ZM22.3354 28.9893L26.5915 31.0609L26.0015 26.1268L22.3354 28.9893Z"
                fill="#E4761B"
                stroke="#E4761B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.5914 31.0609L22.3352 28.9894L22.6742 31.764L22.6366 32.9316L26.5914 31.0609ZM13.4087 31.0609L17.3635 32.9316L17.3384 31.764L17.6523 28.9894L13.4087 31.0609Z"
                fill="#D7C1B3"
                stroke="#D7C1B3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4262 24.2938L13.8857 23.2518L16.3842 22.1093L17.4262 24.2938ZM22.5612 24.2938L23.6033 22.1093L26.1142 23.2518L22.5612 24.2938Z"
                fill="#233447"
                stroke="#233447"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.4086 31.0609L14.0112 25.9636L10.0815 26.0766L13.4086 31.0609ZM25.9886 25.9636L26.5913 31.0609L29.9183 26.0766L25.9886 25.9636ZM28.9767 20.3516L21.9208 20.6654L22.5737 24.2938L23.6158 22.1093L26.1267 23.2517L28.9767 20.3516ZM13.8857 23.2517L16.3967 22.1093L17.4262 24.2938L18.0916 20.6654L11.0232 20.3516L13.8857 23.2517Z"
                fill="#CD6116"
                stroke="#CD6116"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0234 20.3516L13.9864 26.1268L13.886 23.2517L11.0234 20.3516ZM26.127 23.2517L26.0015 26.1268L28.977 20.3516L26.127 23.2517ZM18.0919 20.6654L17.4265 24.2938L18.2551 28.575L18.4434 22.9379L18.0919 20.6654ZM21.9211 20.6654L21.5821 22.9253L21.7328 28.575L22.574 24.2938L21.9211 20.6654Z"
                fill="#E4751F"
                stroke="#E4751F"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.5738 24.2938L21.7326 28.575L22.3352 28.9893L26.0012 26.1268L26.1268 23.2517L22.5738 24.2938ZM13.8857 23.2517L13.9862 26.1268L17.6522 28.9893L18.2549 28.575L17.4262 24.2938L13.8857 23.2517Z"
                fill="#F6851B"
                stroke="#F6851B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.6366 32.9316L22.6742 31.764L22.3604 31.4878H17.6271L17.3384 31.764L17.3635 32.9316L13.4087 31.0609L14.7897 32.1909L17.5895 34.1369H22.398L25.2103 32.1909L26.5914 31.0609L22.6366 32.9316Z"
                fill="#C0AD9E"
                stroke="#C0AD9E"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.3352 28.9894L21.7326 28.5751H18.2549L17.6523 28.9894L17.3384 31.764L17.6271 31.4878H22.3604L22.6742 31.764L22.3352 28.9894Z"
                fill="#161616"
                stroke="#161616"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.9406 14.3378L36.0077 9.21535L34.4133 4.45703L22.3354 13.4212L26.9807 17.3509L33.547 19.2718L35.0033 17.5769L34.3756 17.125L35.38 16.2084L34.6016 15.6058L35.606 14.84L34.9406 14.3378ZM3.99268 9.21535L5.05984 14.3378L4.38188 14.84L5.38627 15.6058L4.62042 16.2084L5.62482 17.125L4.99707 17.5769L6.44089 19.2718L13.0071 17.3509L17.6524 13.4212L5.5746 4.45703L3.99268 9.21535Z"
                fill="#763D16"
                stroke="#763D16"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M33.547 19.2718L26.9808 17.3509L28.977 20.3515L26.0015 26.1268L29.9186 26.0765H35.7567L33.547 19.2718ZM13.0071 17.3509L6.4409 19.2718L4.25635 26.0765H10.0818L13.9864 26.1268L11.0235 20.3515L13.0071 17.3509ZM21.9211 20.6654L22.3354 13.4212L24.2438 8.26111H15.7692L17.6525 13.4212L18.0919 20.6654L18.2425 22.9504L18.2551 28.575H21.7328L21.7579 22.9504L21.9211 20.6654Z"
                fill="#F6851B"
                stroke="#F6851B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          hover="hover:bg-[#E9CFF1]"
        />
      </div>
    </div>
  );
};

export default Auth;
