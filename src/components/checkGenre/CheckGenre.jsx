import './CheckGenre.css'

function CheckGenre({
  genres,
  selectedGenresIds,
  onChangeItem
}) {
  
  return genres.map((genre) => (
    <div className="chek-genre" key={genre.id}>
      <input 
        type="checkbox"
        checked={selectedGenresIds.includes(genre.id)} // Проверяем, содержит ли массив выбранных идентификаторов текущий идентификатор жанра
        onChange={() => {
          onChangeItem(genre);
          console.log(genre); //видим в консоле инпут, по которому кликаем
        }}
      />
      <label className="label-genre">{genre.name}</label>
    </div>
  ));
}

export default CheckGenre;

// В input добавлен атрибут checked, который устанавливает состояние чекбокса в зависимости от того, содержится ли идентификатор жанра в массиве selectedGenresIds. Для этого мы используем метод includes, который проверяет, включает ли массив указанный элемент.
// В функции onChange передается сам объект genre вместо измененного объекта. Теперь функция onChangeItem будет вызываться с объектом жанра, который был выбран или снят с выбора.
// Теперь, при выборе/снятии выбора чекбоксов, функция onChangeItem будет вызываться с объектом жанра, и массив selectedGenresIds будет обновляться соответствующим образом.
