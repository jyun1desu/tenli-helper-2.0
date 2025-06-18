import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Header = ({ currentPage }) => {
  const { t, i18n } = useTranslation('header');

  if (currentPage === 'home') {
    return null;
  }

  const isZh = i18n.language.startsWith('zh');
  const letterSpacing = isZh ? '5px' : '1px';

  return (
    <Box display="flex" bg="white" pt="4" pb="3" px="4" height="80px">
      <Heading
        mt="auto"
        textAlign="left"
        color="content.highlight"
        size="3xl"
        letterSpacing={letterSpacing}
        fontWeight={600}
      >
        {t(`title.${currentPage}`)}
      </Heading>
    </Box>
  );
};

export default Header;
