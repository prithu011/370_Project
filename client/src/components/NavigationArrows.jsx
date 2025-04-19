const NavigationArrows = () => {
  return (
    <div className="flex gap-2 items-center">
      <button aria-label="Previous" className="cursor-pointer">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_183_828)">
            <path
              d="M7.828 11.4715L13.192 5.95436L11.778 4.5L4 12.5L11.778 20.5L13.192 19.0456L7.828 13.5285L20 13.5285V11.4715L7.828 11.4715Z"
              fill="#A4A4A4"
            />
          </g>
          <defs>
            <clipPath id="clip0_183_828">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="matrix(-1 0 0 1 24 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button aria-label="Next" className="cursor-pointer">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_183_831)">
            <path
              d="M16.172 11.4715L10.808 5.95436L12.222 4.5L20 12.5L12.222 20.5L10.808 19.0456L16.172 13.5285H4V11.4715H16.172Z"
              fill="#A4A4A4"
            />
          </g>
          <defs>
            <clipPath id="clip0_183_831">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default NavigationArrows;
