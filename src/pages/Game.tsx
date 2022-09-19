import HowToPlayModal from '../components/HowToPlayModal';
import MapsWrapper from '../components/Map/MapsWrapper';

export default function Game() {
  return (
    <div className="h-full w-full flex flex-col">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-medium text-stone-500">
          Welcome to{' '}
          <span className=" text-stone-800 dark:text-stone-100 underline underline-offset-4 decoration-sky-700">
            Earthle
          </span>
        </h1>

        <HowToPlayModal />
      </header>
      <MapsWrapper />
    </div>
  );
}
