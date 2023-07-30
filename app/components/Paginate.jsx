import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import "../styles/paginate.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Paginate = ({ link,pageCount }) => {
  const router = useRouter();

   

  const handlePageChange = (data) => {
    router.push(`${link}/${data.selected + 1}`);
  };
  

  return ( 
      <div className="paginationContainer"> 
      <ReactPaginate
        activeClassName={"item active"}
        breakClassName={"item break-me"}
        breakLabel={"..."}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next"}
        pageCount={pageCount}
        pageClassName={"item pagination-page"}
        pageRangeDisplayed={5}
        previousClassName={"item previous"}
        previousLabel={
          <AiOutlineArrowLeft style={{ fontSize: 18, width: 150 }} />
        }
        nextLabel={<AiOutlineArrowRight style={{ fontSize: 18, width: 150 }} />}
      />

    </div>
  );
};

export default Paginate;
