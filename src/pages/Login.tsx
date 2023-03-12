import { auth } from '@adapters/auth';
import { Button, Input } from '@components';
import { useAuth } from '@hooks';

const Login = () => {
  const state = useAuth();
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const target = event.currentTarget;
          const formData = new FormData(target);

          const email = formData.get('email');
          const password = formData.get('password');

          if (typeof email === 'string' && typeof password === 'string') auth.signIn(email, password);
        }}
      >
        <Input name="email" />
        <Input name="password" />
        <Button type="submit">Sign In</Button>
      </form>
      <span>{state.isSignedIn ? 'authorized' : 'unauthorized'}</span>
      <br />
      <span>{state.currentUser?.uid}</span>
      {state.isSignedIn && <Button onClick={state.signOut}>Sign Out</Button>}
    </div>
  );
};

export default Login;
