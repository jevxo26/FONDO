import { motion } from "framer-motion";
import Image from "next/image";

const imageVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ProductGallery({ coverImage, name }: { coverImage: string; name: string }) {
  return (
    <motion.div variants={imageVariants} className="lg:col-span-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-card)] border border-border/40">
        <Image src={coverImage} alt={name} fill priority unoptimized className="object-cover" />
      </div>
    </motion.div>
  );
}
