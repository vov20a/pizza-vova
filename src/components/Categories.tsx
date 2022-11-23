import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onChangeCategory(index)}
            className={index === value ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
