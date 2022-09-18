import Footer from './sections/Footer';
import Header from './sections/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-customSans">
      <div className="h-screen flex flex-col max-w-screen-lg mx-auto border-stone-300 dark:border-stone-600">
        <Header className="h-16 border-b border-inherit p-5" />
        <main className="flex-1 p-5">{children}</main>
        <Footer className="h-12 border-t border-inherit p-5" />
      </div>
    </div>
  );
}
