export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="shrink-0 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
      {title}
    </h2>
  );
};
