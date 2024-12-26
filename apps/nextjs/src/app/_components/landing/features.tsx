import { Icons } from "@court-base/ui/icons";

const features = [
  {
    title: "Case Management",
    description:
      "Efficiently organize and track all your legal cases in one place",
    icon: Icons.featureCaseManagement,
  },
  {
    title: "Calendar & Deadlines",
    description:
      "Never miss important dates with our integrated calendar system",
    icon: Icons.featureCalendar,
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team members and partners",
    icon: Icons.featureTeam,
  },
  {
    title: "Analytics & Insights",
    description: "Make data-driven decisions with powerful analytics",
    icon: Icons.featureAnalytics,
  },
] as const;

export function Features() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-24 dark:bg-transparent sm:py-32"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to manage your legal practice efficiently
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-lg border bg-background p-2"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <feature.icon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
