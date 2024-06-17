import { getSession } from 'next-auth/react';

const withAuth = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }

    req.session = session; // Añadir sesión al objeto de la solicitud
    return handler(req, res);
  };
};

export default withAuth;
