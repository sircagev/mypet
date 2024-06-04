import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige al usuario a /Login cuando accede a /
  redirect('/Login');
  return null; // No se renderiza ningún contenido
}
