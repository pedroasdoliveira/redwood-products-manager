import React from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

const ReturnPage = () => {
  return (
    <Box as="div" w={'100%'} marginBottom={'1rem'}>
      <Link to={routes.products()}>
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="gray"
          aria-label="Create"
          fontSize="1.5rem"
          w={'40px'}
          h={'40px'}
          icon={<ArrowBackIcon />}
        />
      </Link>
    </Box>
  )
}

export default ReturnPage
