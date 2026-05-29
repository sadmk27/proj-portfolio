import { DescriptionCard } from "@/views/components/about/descript-card";
import { InterestsCard } from "@/views/components/about/interests-card";
import { ProfileCard } from "@/views/components/about/profile-card";
import { StatsCard } from "@/views/components/about/stats-card";

interface AboutSectionProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string | null;
  interests: string[];
}
export function AboutSection({
  name,
  role,
  description,
  imageUrl,
  interests,
}: AboutSectionProps) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-4 md:min-h-full md:grid-cols-3 md:gap-5 md:auto-rows-fr">
      <div className="md:col-span-1 row-span-1">
        <ProfileCard name={name} role={role} imageUrl={imageUrl} />
      </div>
      <div className="md:col-span-1 row-span-1">
        <InterestsCard interests={interests} />
      </div>
      <div className="md:col-span-1 row-span-2">
        <DescriptionCard description={description} />
      </div>
      <div className="md:col-span-2 row-span-1">
        <StatsCard />
      </div>
    </div>
  );
}
