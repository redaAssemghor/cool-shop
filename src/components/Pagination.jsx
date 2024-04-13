const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="join">
      {pageNumbers.map((page) => (
        <button
          className={`join-item btn ${
            currentPage === page ? "btn-active" : ""
          }`}
          key={page}
          onClick={() => paginate(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
