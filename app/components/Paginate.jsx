// import ReactPaginate from "react-paginate";
// import { useRouter } from "next/navigation";
// import "../styles/paginate.css"

// const Paginate = ({pageCount,link}) => {

//   const router =useRouter()
//   return (

// <ReactPaginate
//         nextLabel="next >"
//         onPageChange={(data) => {
//           console.log(data.selected + 1, "data.selected");
//           router.push(`${link}/${data.selected + 1}`);
//         }} // Handle page change event
//         pageRangeDisplayed={3}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//   );
// };

// export default Paginate;

import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import "../styles/paginate.css";

import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Paginate = ({ pageCount, link }) => {
  const router = useRouter();

   

  const handlePageChange = (data) => {
    console.log(data.selected + 1, "data.selected");
    router.push(`${link}/${data.selected + 1}`);
  };
  

  return ( 
    <div id="container">
    {/* // <div className="paginationContainer"> */}
      {/* <ReactPaginate
        activeClassName={"pagination-page active"}
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
      /> */}

<ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={pageOffset}
      />
    </div>
  );
};

export default Paginate;
