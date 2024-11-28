// Next Imports
import dynamic from 'next/dynamic'

const AccountTab = dynamic(() => import('@views/pages/account-settings/account'))

const AccountSettingsPage = () => {
  return <AccountTab  />
}

export default AccountSettingsPage
