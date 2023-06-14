import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
const router = useRouter();

const Paginate = ({pageCount}) => {

  return (
    <ReactPaginate
    pageCount={pageCount} 
    pageRangeDisplayed={3} 
    marginPagesDisplayed={0}
    breakLabel="..."
    nextLabel=">"
    previousLabel="< "
    onPageChange={(data) => {
      console.log(data.selected+1, "data.selected");
      router.push(`/allManga/${data.selected + 1}`);
    }} // Handle page change event
    containerClassName={"pagination"} // Set CSS class for container
    activeClassName={"active"} // Set CSS class for active page
  />
  );
};

export default Paginate;
