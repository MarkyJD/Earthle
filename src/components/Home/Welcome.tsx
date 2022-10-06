interface WelcomeProps {
  title: string;
  description: string;
  cta: string;
}

export default function Welcome({ title, description, cta }: WelcomeProps) {
  return (
    <>
      <h1 className="text-center text-shadow text-3xl md:text-5xl font-medium mb-5">
        Welcome to <span className="font-customSerif font-bold">{title}</span>
      </h1>
      <p className="text-lg text-stone-300 mb-10 text-center">{description}</p>
      <hr className="border-emerald-700 mb-10" />
      <p className="text-center text-lg font-hand  mb-5">{cta}</p>
    </>
  );
}
