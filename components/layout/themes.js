const light = {
    color: "#000",
    bgColor: '#efe7fd',
    bgImage: 'linear-gradient(180deg, #efe7fd 0%, #bdccf7 60%)',
    bgDiv: '#fff',
    bgSubDiv: '#efe7fd'
}

const dark = {
    color: '#E0E0E0', // Light gray for better readability
    bgColor: '#1E1E2F', // Dark but not pure black, easier on the eyes
    bgImage: 'linear-gradient(180deg,rgb(0, 0, 0) 5%,rgb(0, 0, 0) 90%)', // Softer dark gradient
    bgDiv: '#2A2A3A', // Dark grayish-blue for content sections
    bgSubDiv: '#383B45' // Slightly lighter for contrast
};


const themes = {
    light: light,
    dark: dark,
}

export default themes;