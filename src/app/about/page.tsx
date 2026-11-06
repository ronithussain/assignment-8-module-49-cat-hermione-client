import Link from "next/link";
import Image from "next/image";
import { Users, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-240px)] bg-background text-foreground">
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-24 border-b  border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <Users className="size-4" />
              About Sodila Events
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Bringing people together, one event at a time.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Sodila Events is an event management platform built to help you
              create, discover, and join meaningful gatherings in your
              community. From cleanups and plantations to donations and social
              welfare, we make organizing simple.
            </p>
            <Link
              href="/upcoming-events"
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              Explore Events <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What we stand for
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mission is to make event creation accessible to everyone,
              while keeping communities safe, informed, and connected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="size-5" />}
              title="Safe &amp; Verified"
              description="Every event is reviewed to keep our community trustworthy and secure."
            />
            <FeatureCard
              icon={<Zap className="size-5" />}
              title="Quick to Set Up"
              description="Create and publish your event in minutes with an intuitive organizer dashboard."
            />
            <FeatureCard
              icon={<Users className="size-5" />}
              title="Community Driven"
              description="Join local events, meet new people, and make a real impact together."
            />
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-gray-200 dark:border-gray-700 bg-muted/30 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Our story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Sodila Events started with a simple idea: organizing a community
                event should not be complicated. We built a platform that handles
                the logistics — RSVPs, dates, locations, and reminders — so you
                can focus on what matters: showing up.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, thousands of organizers use Sodila Events to run cleanups,
                food drives, workshops, and celebrations across the country.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Sodila Events"
                width={400}
                height={200}
                className="rounded-2xl  object-cover object-center"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-card p-6 ">
      <div className="rounded-lg bg-foreground/5 p-3 text-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
