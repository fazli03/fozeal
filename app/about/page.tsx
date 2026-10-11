import { ProfileStoryCard } from "@/app/about/profile-story-card";
import { ToolsSkills } from "@/components/home/tools-skills";

export default function AboutPage() {
  return (
    <main className="w-full">
      <ProfileStoryCard />
      <ToolsSkills />
    </main>
  );
}