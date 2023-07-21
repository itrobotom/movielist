import React, { useState } from "react";
import './Pagination.css'

function Pagination() {
  const arrNumber = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const [currentPage, setcurrentPage] = useState(1);
  const [steps, setStep] = useState(4);
  const itemsPerPage = 4;
  const totalpage = Math.ceil(arrNumber.length / itemsPerPage);
  const startIndex = steps - itemsPerPage;

  function nextPage() {
    if (totalpage > currentPage) {
      setStep(steps + itemsPerPage);
      setcurrentPage(currentPage + 1);
    }
  }
  function downPage() {
    if (!(currentPage <= 1)) {
      setStep(steps - itemsPerPage);
      setcurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="pagination">
      <div>{arrNumber.slice(startIndex, steps)}</div>
      <div className="pagination-btn">
        <button className="button-pag" onClick={downPage}>
          Назад
        </button>
        <button className="button-pag" onClick={nextPage}>
          Вперед
        </button>
      </div>

      <p>
        Страница&nbsp;
        {currentPage} из {totalpage}
      </p>
    </div>
  );
}

export default Pagination;
