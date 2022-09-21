/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BiLogIn } from 'react-icons/bi';

export default function LoginButton() {
  function handleLogin() {
    console.log('Logged in');
  }
  return (
    <div
      role="button"
      className="h-full w-full flex justify-center items-center text-3xl"
      onClick={() => handleLogin()}
    >
      <p className="flex items-center space-x-3">
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
          Login
        </span>
        <BiLogIn />
      </p>
    </div>
  );
}
