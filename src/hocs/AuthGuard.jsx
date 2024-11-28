// Third-party Imports


import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth/next';

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
import { authOptions } from '@/libs/auth';

export default async function AuthGuard({ children, locale }) {

  const session = await getServerSession(authOptions)

  return <>
    {session?.user?.role == "admin" ?
      children : session?.user?.role == "super admin" ? redirect(`/${locale}/admin-talkright/dashboard`)
        :
        <AuthRedirect lang={locale} />}
  </>
}
