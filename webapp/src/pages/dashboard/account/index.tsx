import { Box, Text } from '@chakra-ui/react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Account() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    deleteCookie(process.env.NEXT_PUBLIC_JWT_NAME ?? 'cje-jwt');
    router.reload();
    router.push('/');
  };

  return (
    <Box pt={12} px={8}>
      <Link href="" onClick={handleLogout} color="blue">
        <Text fontWeight="medium" color="primary.500">
          Déconnexion
        </Text>
      </Link>
    </Box>
  );
}
