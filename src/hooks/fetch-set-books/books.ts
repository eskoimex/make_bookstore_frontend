import getBooks from '@src/services/api/getbooks';
import {useInfiniteQuery} from 'react-query';
import {useRecoilState} from 'recoil';
import {useEffect,useCallback} from 'react';
import { bookState } from '@src/recoil/atoms/books';

const useBooks = ({noScroll = false}:{noScroll?: boolean}) => {

    const {fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
      isLoading,
    data} = useInfiniteQuery({
      queryKey:"booksData",
      queryFn: ({ pageParam = 1 }) => getBooks({
        query:pageParam
      }),
      getNextPageParam: (lastPage, allPages) => {
        const numberItems = allPages.reduce((prev,curr)=>[...prev,...curr.data], [])
        return lastPage.hasNext ?  Math.ceil(numberItems.length/10) + 1: null;
      },
    });
    

    const [books, setBooks] = useRecoilState(bookState);
    
    const handleScroll = useCallback(() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (
        scrollTop + clientHeight >= ( scrollHeight-1) &&
        !isLoading &&
        !isFetchingNextPage
      ) {
         if(hasNextPage && !noScroll){
          fetchNextPage()
         }
      }
    }, [isLoading, isFetchingNextPage, hasNextPage, noScroll, fetchNextPage]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
 
    useEffect(() => {
        if (data) {
          setBooks(data.pages.reduce((prev,curr)=>[...prev,...curr.data],[]));
        }
      }, [data, setBooks]);

  return {
    isLoading : isLoading && !!books.length,
    nextPageLoading: isFetchingNextPage,
    books
  }
}

export default useBooks