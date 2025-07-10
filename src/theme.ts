// src/theme.ts
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        // Your brand colors are now first-class citizens
        primary: '#4D0080',
        accent: '#FFD700',
        background: '#F9F7FB',
        text: '#1E1E1E',
        playful: '#00BFA6',
    },
    fonts: {
        // Your brand font
        body: '"Inter", sans-serif',
        heading: '"Inter", sans-serif',
    },
})

export default theme