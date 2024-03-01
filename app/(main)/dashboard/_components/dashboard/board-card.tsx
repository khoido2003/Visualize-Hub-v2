import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";

interface BoardCardProps {
  id?: string;
  imageUrl: string;
}

export const BoardCard = ({ id, imageUrl }: BoardCardProps) => {
  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border border-black">
        <div className="relative flex-1 bg-white/60">
          <Image src={imageUrl} fill alt="Picture" />
        </div>

        <Footer />
      </div>
    </Link>
  );
};
