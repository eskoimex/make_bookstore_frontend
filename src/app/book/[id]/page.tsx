"use client";
import ImageWithFallback from "@src/components/ImageFallback";
import Loader from "@src/components/Loader/Loader";
import useBooks from "@src/hooks/fetch-set-books/books";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface IProps {
  params: { id: string };
}

const BookDetails = ({ params }: IProps) => {
  const router = useRouter();

  const { isLoading, books } = useBooks({
    noScroll: true,
  });

  const book = useMemo(
    () => books.find((ele) => ele.title === decodeURIComponent(params.id)),
    [books, params.id]
  );

  const goBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <main>
      <header className="flex items-center py-3">
        <div onClick={goBack}>
          <Image
            width={32}
            height={32}
            alt="nodp"
            src="../assets/ARROW.svg"
            priority
          />
        </div>
        <p className="flex-grow text-center text-lg font-bold sticky left-0 top-0">
          {decodeURIComponent(params.id)}
        </p>
        <div className="w-[32px] h-[32px]" />
      </header>
      {isLoading || !book ? (
        <Loader />
      ) : (
        <div>
          <ImageWithFallback
            src={book?.coverImage || ""}
            width="100%"
            height="auto"
            alt={book?.title || ""}
          />
          <div className="p-2">
            <p className="text-lg font-bold">{book?.title}</p>
            <p className="text-xs font-normal">
              {book?.description} Description of the book... Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <div className="flex items-center justify-between my-2">
              <p className="text-red-600 text-sm font-bold">
                {book?.discountRate}%
              </p>
              <p className="font-bold text-base"> {book?.price} 원</p>
            </div>
          </div>
          <div className="h-[2px] bg-[#f7f8fad9] w-full" />
        </div>
      )}
    </main>
  );
};

export default BookDetails;
