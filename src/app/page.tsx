'use client';
import BookTile from '@src/components/book-tile';
import Image from 'next/image';
import Loader from '@src/components/Loader/Loader';
import useBooks from '@src/hooks/fetch-set-books/books';

export default function Home() {
  const { isLoading, books, nextPageLoading } = useBooks({});
  return (
    <main className="main">
      <header className="flex items-center py-3">
        <div className="w-[32px] h-[32px]" />
        <p className="flex-grow text-center text-lg font-bold sticky left-0 top-0">
          Books
        </p>
        <Image
          width={32}
          height={32}
          alt="nodp"
          src="./assets/no-profile.svg"
          priority
        />
      </header>
      <div className="books-container">
        {books.map((ele) => (
          <BookTile {...ele} key={ele.title} />
        ))}
      </div>
      {(nextPageLoading || isLoading) && <Loader />}
    </main>
  );
}
