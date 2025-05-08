import { useState } from 'react'
import Navigator from '@/components/navigator/Navigator.jsx';
import { Box } from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box fontWeight="500" color="content.primary" width="100dvw" height="100dvh" bg="white">
      <Box bg="bg.primary" display="flex" flexDirection="column" width="100%" height="100%">
        <Box flex="0 0 auto">
          header
        </Box>
        <Box flex="1 1 auto" overflowY="auto">
          <Box>content</Box>
        </Box>
        <Box flex="0 0 auto">
          <Navigator />
        </Box>
      </Box>
    </Box>
  )
}

export default App
