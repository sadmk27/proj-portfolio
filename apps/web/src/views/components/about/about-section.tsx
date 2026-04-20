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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
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
