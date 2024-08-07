export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-shade border-accent flex flex-col">
      {children}
    </div>
  );

}