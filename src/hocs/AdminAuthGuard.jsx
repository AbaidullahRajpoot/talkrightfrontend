
import { redirect } from 'next/navigation';

// Third-party Imports
import { getServerSession } from 'next-auth/next';

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
import { authOptions } from '@/libs/auth';

export default async function AuthGuard({ children, locale }) {

    const session = await getServerSession(authOptions)

    return <>{session?.user?.role == "super admin" ? children : session?.user?.role == "admin" ? redirect(`/${locale}/talk-right/dashboard`) : <AuthRedirect lang={locale} />}</>

}
