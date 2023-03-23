import { FormEvent, useState } from 'react';
import { useLogin, useNotify, useGetList, useCreate, Button, Show, Labeled, TextField } from 'react-admin';
import { Card, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const MyLoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const [create] = useCreate();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ name, password })
            .then(() => {
                let data = { name, date: new Date(), activityType: "login", activityDetail: "new login session started" }
                create('reports', { data })
            })
            .catch(() => notify('Invalid email or password'));

    };

    return (
        <div className="loginPage">
            <div className="login_box p-4">
                <h1 className="m-0 mb-5">Welcome to RCO</h1>
                <form id="form" onSubmit={handleSubmit}>
                    <div className='mb-3 text_boxes'>
                        <label className='mb-1'>Username</label>
                        <input type="text" required name="username" placeholder='username' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-3 text_boxes'>
                        <label className='mb-1'>Password</label>
                        <input type="password" required name="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <Button className='subnit_btn' type='submit' label='Login' color='primary' size='large' startIcon={<LoginIcon />} ></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyLoginPage;