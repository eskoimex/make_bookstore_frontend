import { IBook } from "@src/types/IBook";
import { useCallback } from "react";
import ImageWithFallback from "../ImageFallback";
import { useRouter } from "next/navigation";

const BookTile = ({ title, price, discountRate, coverImage }: IBook) => {
  const router = useRouter();

  const onClickNavigation = useCallback(() => {
    router.push(`/book/${encodeURIComponent(title)}`);
  }, [title, router]);

  return (
    <div onClick={onClickNavigation} className="book-tile">
      <ImageWithFallback
        src={coverImage}
        alt={title}
        width={"100%"}
        height={"auto"}
      />
      <div className="p-2">
        <p className="font-medium text-sm">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-red-600 text-sm font-bold">{discountRate}%</p>
          <p className="font-bold text-base"> {price} 원</p>
        </div>
      </div>
    </div>
  );
};

export default BookTile;
