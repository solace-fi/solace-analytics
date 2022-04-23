const BKPT_1 = 380;
const BKPT_NAVBAR = 600;
const BKPT_2 = 770;
const BKPT_3 = 900;
const BKPT_4 = 1060;
const BKPT_5 = 1232;
const BKPT_6 = 1370;
const BKPT_7 = 1640;

module.exports = {
  // content: [],
  // mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      // screen sizes
      screens: {
        xs: BKPT_1 + "px",
        sm: BKPT_2 + "px",
        md: BKPT_3 + "px",
        lg: BKPT_4 + "px",
        xl: BKPT_5 + "px",
        "2xl": BKPT_6 + "px",
        "3xl": BKPT_7 + "px",
      },
    },
    // colors
    colors: {
      transparent: "transparent",
      current: "currentColor",
      light: "#fafafa",
      white: "#fff",
      lightNeutral: "#efefef",
      text: {
        dark: {
          secondary: "#c0c2c3",
        },
      },
      bg: {
        dark: "#252934",
        darkRaised: "#2e3440",
        darkDoubleRaised: "#3a3e4a",
      },
      separator: {
        dark: "#84898f",
      },
      blue: "#5F5DF9",
      black: "#000",
      dark: "#5E5E5E",
      select: "#DA3325",
      warmGradientA: "rgba(243, 211, 126, 1)",
      warmGradientB: "rgba(240, 77, 66, 1)",
      techyGradientA: "rgb(212, 120, 216)",
      techyGradientB: "rgb(95, 93, 249)",
    },
    // font families
    fontFamily: {
      // body: open sans, title: montserrat
      body: ["Open Sans", "sans-serif"],
      title: ["Montserrat", "sans-serif"],
    },
    extend: {
      // spacing
      spacing: {
        // standard small margin / padding between foreign elements: 30px
        7.5: "30px",
        // standard medium margin / padding between foreign elements: 100px
        12.5: "50px",
        // standard double margin / padding between foreign elements: 60px
        15: "60px",
        // standard double margin / padding between foreign elements: 70px
        17.5: "70px",
        // standard big margin / padding between foreign elements: 100px
        25: "100px",
        // big solace logo ball on desktop: 78px
        logoBallDesktop: "78px",
        // big solace logo ball on mobile: 35.69px
        logoBallMobile: "35.69px",
        // button width default: 200px
        50: "200px",
      },
      // border radius
      borderRadius: {
        std: "10px",
      },
      // box shadow
      boxShadow: {
        // standard shadow
        std: "0px 0px 30px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
