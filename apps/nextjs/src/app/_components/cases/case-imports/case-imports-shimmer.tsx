const Shimmer = () => (
  <div className="animate-pulse rounded-lg bg-card p-4">
    <div className="h-2 rounded bg-accent"></div>
    <div className="mt-2 h-2 rounded bg-accent"></div>
    <div className="mt-2 h-2 rounded bg-accent"></div>
    <div className="mt-2 h-2 rounded bg-accent"></div>
    <div className="mt-2 h-2 rounded bg-accent"></div>
  </div>
);

export default function CaseImportShimmer() {
  return (
    <div className="flex flex-col gap-4">
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
    </div>
  );
}
