interface NameFormProps {
  name: string;
  setName: (name: string) => void;
  isValidName: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function NameForm({
  name,
  setName,
  isValidName,
  handleSubmit,
}: NameFormProps) {
  return (
    <form
      action="play"
      onSubmit={handleSubmit}
      className="flex flex-col items-center max-w-screen-sm mx-auto"
    >
      <label
        htmlFor="name"
        className="font-customSerif font-bold text-2xl mb-5"
      >
        Name:{' '}
      </label>
      <input
        id="name"
        type="text"
        placeholder="Armadeus"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-5  px-3 py-1 text-3xl rounded bg-emerald-100 outline-none border-2 border-emerald-600 focus:outline-emerald-400 shadow font-customSans font-bold text-stone-800"
      />
      <button
        disabled={!isValidName}
        type="submit"
        className={`${
          !isValidName ? 'cursor-default opacity-50' : 'hover:bg-emerald-800'
        } w-44 px-2 text-white py-2 shadow border-2 border-emerald-900 rounded-md bg-emerald-700 text-xl font-customSans transition`}
      >
        Play
      </button>
    </form>
  );
}
