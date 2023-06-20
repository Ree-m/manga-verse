import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

const Paginate = ({pageCount,link,linkSecondHalf}) => {

  const router =useRouter()
  return (
   
<ReactPaginate
        nextLabel="next >"
        onPageChange={(data) => {
          console.log(data.selected + 1, "data.selected");
          router.push(`${link}/${data.selected + 1}`);
        }} // Handle page change event
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
  );
};

export default Paginate;
