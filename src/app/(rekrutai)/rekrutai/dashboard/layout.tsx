import type { Metadata } from 'next';
import QueryProvider from '@/shared/providers/QueryProvider';
import { Toaster } from '@/shared/ui/shadcn/toaster';
import { getSession, SessionPovider } from '@/features/auth';
import { signout } from '@/features/auth/api/auth-actions';

export const metadata: Metadata = {
  title: 'RekrutAI|Дашборд',
};

// robots: {
//   index: false,
//   follow: false,
// }


export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  if (!session.isAuthorized) {
    await signout()
    return null
  }

  return (
    <div
      className={`overflow-x-hidden`}
    >
      <SessionPovider session={session}>
        <QueryProvider>

          {children}
        </QueryProvider>
      </SessionPovider>
      <Toaster />
    </div>
  );
}
