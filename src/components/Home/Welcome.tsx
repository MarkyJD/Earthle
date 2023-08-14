interface WelcomeProps {
  title: string;
  description: string;
  cta: string;
}

export default function Welcome({ title, description, cta }: WelcomeProps) {
  return (
    <>
      <h1 className="max-w-md mx-auto w-full text-shadow text-xl md:text-2xl font-medium mb-3 md:mb-5">
        Welcome to{' '}
        <span className="block font-customSerif text-5xl md:text-7xl font-bold">
          {title}
        </span>
      </h1>
      <p className="max-w-md mx-auto text-base dark:text-stone-300 text-stone-700">
        {description}
      </p>
      <hr className="border-emerald-700 my-3 md:my-10  max-w-lg mx-auto w-full" />
      <p className="max-w-md mx-auto text-base font-hand w-full text-center mb-5">
        {cta}
      </p>
    </>
  );
}
