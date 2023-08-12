import React from 'react';
import './AllPagination.css'
import Pagination from '@mui/material/Pagination';

function AllPagination( {page, setPage} ) {
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };
  const totalPages = 500;

  return (
    <>
      <Pagination sx = {{ mt: 12 }} count={totalPages} color="primary" siblingCount={0} onChange={handleChange}/> 
    </>
  );
}

export default AllPagination;



//Пагинация вручную без применения MUI

// function AllPagination() {
//   const DATA = [
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//     { id: 3, name: 'Item 3' },
//     { id: 4, name: 'Item 4' },
//     { id: 5, name: 'Item 5' },
//     { id: 6, name: 'Item 6' },
//     { id: 7, name: 'Item 7' },
//     { id: 8, name: 'Item 8' },
//     { id: 9, name: 'Item 9' },
//     { id: 10, name: 'Item 10' },
//     { id: 11, name: 'Item 11' },
//     { id: 12, name: 'Item 12' },
//     { id: 13, name: 'Item 13' },
//     { id: 14, name: 'Item 14' },
//     { id: 15, name: 'Item 15' },
//     { id: 16, name: 'Item 16' },
//     { id: 17, name: 'Item 17' },
//     { id: 18, name: 'Item 18' },
//     { id: 19, name: 'Item 19' },
//     { id: 20, name: 'Item 20' },
//     { id: 21, name: 'Item 21' }

//   ];
  
//   const paginationInit = {
//     totalPages: 30,  //общее число элементов item (должно быть больше 21, чем в data)
//     currentPage: 1,  // начальное значение страницы
//     itemsForPage: 5, // по 5 элементов из массива будет выведено
//   };

//   const stepPage = 1;

//   //повешали хук на объект целиком. То есть страница состоит из полей объекта
//   const [pagination, setPages] = useState(paginationInit);

//   function BackBtn() {

//     function backBtnClick() {
//             // условие, чтобы не уйти в отрицательные страницы
//       if (pagination.currentPage * pagination.itemsForPage > pagination.itemsForPage) {		
//                 //создаем новую страницу с обновленным полем текущей страницы	
//                 const newPage = {...pagination, currentPage: pagination.currentPage - stepPage}
//         setPages(newPage)
//       }	
//     }
//     return (
//       <button onClick={backBtnClick}> Назад </button>
//     )
//   }

//   function ForwardBtn() {
//     function forwardBtnClick() {
//             //создаем новую страницу с обновленным полем текущей страницы
//       if (pagination.totalPages - pagination.currentPage * pagination.itemsForPage >= pagination.itemsForPage) {
//                 const newPage = {...pagination, currentPage: pagination.currentPage + stepPage}
//         setPages(newPage)
//       }			
//     }
//     return (
//       <button onClick={forwardBtnClick}> Вперед </button>
//     )
//   }

//   function CreateDiv() {
//     //получаем новый массив из 5 чисел исходя из выбранной страницы
//     const newArr = DATA.slice(pagination.currentPage * pagination.itemsForPage - pagination.itemsForPage, pagination.currentPage * pagination.itemsForPage);
//     console.log(newArr);
//     return (
//     <>
//       <ul>
//         {
//             //через map создаем новый массив из разметки, данные для которого берутся из чисел, полуяенных при преобразовании в slice
//             newArr.map((item) => (
//                 <li key={item.id}>{item.name}</li>
//             ))
//         }
//       </ul>
//       <div>Текущая страница: {pagination.currentPage}</div>
//     </>
      
//     );
//   }

//   return (
//   <>
//     <CreateDiv />
//     <BackBtn />
//   </>
//   );
// }

// export default AllPagination;