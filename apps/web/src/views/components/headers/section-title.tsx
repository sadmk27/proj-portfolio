export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="w-full sm:w-1/3 rounded-[1.75rem] border border-primary/20 bg-card px-6 py-4 text-3xl font-extrabold tracking-tight text-foreground shadow-lg shadow-primary/10 transition-colors duration-300 sm:text-4xl lg:text-5xl mb-12 justify-center text-center">
      {title}
    </h2>
  );
};
