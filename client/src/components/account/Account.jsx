import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import './account.scss';

const Account = ({ account }) => {


    return (
        <div className='account'>
            <div className='container'>

                <div className='top'>
                    {/* <h2>Account</h2> */}
                    {account.name}
                    <div className='button'> <SettingsTwoToneIcon /></div>

                </div>

                <hr />

                <div className="bottom">
                    {account.type}

                    <span>{account.balance < 0 ? `-$${Math.abs(account.balance)}` : `$${account.balance}`}</span>

                </div>
            </div>
        </div >
    )
}
export default Account;