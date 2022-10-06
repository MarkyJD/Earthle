import coords from '../../assets/challengeLocations/coords.json';

interface DebugDatesProps {
  debugDate: Date | null;
  setDebugDate: (date: Date) => void;
}

export default function DebugDates({
  debugDate,
  setDebugDate,
}: DebugDatesProps) {
  return (
    <div className="mt-7 w-full flex justify-center text-stone-900 dark:text-stone-100">
      <label htmlFor="dates" className="font-bold">
        Change Date: &nbsp;
        <select
          className="bg-stone-100 dark:bg-stone-800 font-normal text-stone-800 dark:text-stone-300 px-2 py-1 border border-stone-600 dark:border-stone-300 rounded-md"
          value={debugDate?.toDateString()}
          onChange={({ target: { value } }) => setDebugDate(new Date(value))}
          name="dates"
          id="dates"
        >
          {coords.map((coord) => (
            <option
              key={coord.date}
              value={new Date(coord.date).toDateString()}
            >
              {new Date(coord.date).toDateString()}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
