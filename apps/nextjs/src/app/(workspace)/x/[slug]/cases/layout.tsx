export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col border-accent bg-shade">
      {children}
    </div>
  );
}
