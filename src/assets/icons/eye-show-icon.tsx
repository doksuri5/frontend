const EyeShowIcon = ({ color = "#C5C5C5" }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={25} fill="none">
    <g clipPath="url(#eyeShow_icon_svg__a)">
      <path
        fill={color}
        d="M12 6.953a9.77 9.77 0 0 1 8.82 5.5 9.76 9.76 0 0 1-8.82 5.5 9.76 9.76 0 0 1-8.82-5.5 9.77 9.77 0 0 1 8.82-5.5m0-2c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5"
      />
    </g>
    <defs>
      <clipPath id="eyeShow_icon_svg__a">
        <path fill="#fff" d="M0 .453h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default EyeShowIcon;
