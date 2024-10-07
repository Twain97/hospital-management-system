/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      width:{
        wd05:"5vw",
        wd1:"10vw",
        wd2:"20vw",
        wd3:"30vw",
        wd4:"40vw",
        wd45:"45vw",
        wd5:"50vw",
        wd6:"60vw",
        wd7:"70vw",
        wd8:"80vw",
        wd9:"90vw",
        98:"98vw",
        wdFull:"100vw"
      },
      height:{
        ht05:"5vh",
        ht1:"10vh",
        ht2:"20vh",
        ht3:"30vh",
        ht4:"40vh",
        ht45:"45vh",
        ht5:"50vh",
        ht6:"60vh",
        ht7:"70vh",
        ht8:"80vh",
        ht9:"90vh",
        ht:"98vh",
        htFull:"100vh"
      }
    },
  },
  plugins: [],
}

