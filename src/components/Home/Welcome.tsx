interface WelcomeProps {
  title: string;
  description: string;
  cta: string;
}

export default function Welcome({ title, description, cta }: WelcomeProps) {
  return (
    <>
      <h1 className="max-w-md mx-auto w-full text-shadow text-lg md:text-2xl font-medium mb-5">
        Welcome to{' '}
        <span className="font-display text-5xl block mt-2 text-emerald-600">
          {title}
        </span>
      </h1>
      <p className="max-w-md mx-auto w-full text-lg text-stone-300 mb-10 ">
        {description}
      </p>
      <hr className="border-emerald-700 mb-10" />
      <p className="text-center text-lg font-hand  mb-5">{cta}</p>
    </>
  );
}
