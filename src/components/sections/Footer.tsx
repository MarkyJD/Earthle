interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return (
    <footer className={className}>
      <div className="h-full w-full flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 font-medium">
        <a
          className="hover:text-stone-400 hover:dark:text-stone-500"
          href="https://github.com/MarkyJD"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Mark Dodson
        </a>
        <p>All Rights Reserved &copy; 2023</p>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  className: '',
};
