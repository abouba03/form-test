'use client';

import { useState, useEffect } from 'react';
import MainLayout from './components/Layout/MainLayout';
import FormContainer from './components/Form/FormContainer';
import FormField from './components/Form/FormField';
import FormButton from './components/Form/FormButton';
import Pagination from './components/Pagination/Pagination';
import FormHeader from './components/Form/FormHeader';

const genres = [
  'Драма', 'Комедия', 'Триллер', 'Боевик', 'Приключения', 'Фантастика',
  'Фэнтези', 'Ужасы', 'Мелодрама', 'Документальный', 'Анимация', 'Детектив'
];
const formats = ['Онлайн-платформа', 'Большой экран', 'Интернет'];
const countries = [
  'Россия', 'США', 'Франция', 'Германия', 'Япония', 'Китай', 'Индия',
  'Великобритания', 'Испания', 'Италия', 'Южная Корея', 'Канада', 'Австралия'
];

export default function FormPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [formData, setFormData] = useState({
    projectName: '',
    genre: '',
    format: '',
    productionNumber: '',
    country: 'Россия',
    cost: '',
    synopsis: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('filmForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.projectName) newErrors.projectName = 'Поле обязательно';
    if (!formData.genre) newErrors.genre = 'Поле обязательно';
    if (!formData.format) newErrors.format = 'Поле обязательно';
    if (!formData.country) newErrors.country = 'Поле обязательно';
    if (!/^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$/.test(formData.productionNumber)) {
      newErrors.productionNumber = '';
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('filmForm', JSON.stringify(formData));
    alert('Данные сохранены!');
  };

  const handleCancel = () => {
    localStorage.clear();
    setFormData({
      projectName: '',
      genre: '',
      format: '',
      productionNumber: '',
      country: 'Россия',
      cost: '',
      synopsis: ''
    });
    alert('Все данные были удалены!');
  };

  return (
    <MainLayout>
      <FormContainer>
        <div className="flex justify-between items-center mb-4">
          <FormHeader />
          <FormButton text="Отменить заполнение" variant="secondary" onClick={handleCancel} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Название проекта" name="projectName" placeholder="Название" value={formData.projectName} onChange={handleChange} required error={errors.projectName} />
          <FormField label="Страна-производитель (копродукция)" name="country" isSelect options={countries} value={formData.country} onChange={handleChange} required error={errors.country} />
          <FormField label="Жанр" name="genre" isSelect placeholder="Выберите жанр" options={genres} value={formData.genre} onChange={handleChange} required error={errors.genre} />
          <FormField label="Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть" name="cost" placeholder="Сметная стоимость" value={formData.cost} onChange={handleChange} />
          <FormField label="Формат (для онлайн-платформ, большого экрана, интернета, другое)" name="format" isSelect options={formats} value={formData.format} onChange={handleChange} required error={errors.format} />
          <FormField label="Синопсис" name="synopsis" placeholder="Напишите краткое изложение" value={formData.synopsis} onChange={handleChange} isTextarea />
          <FormField label="№ УНФ или отсутствует" name="productionNumber" placeholder="890-000-000-00-000" value={formData.productionNumber} onChange={handleChange} error={errors.productionNumber} />
        </div>


        <div className="flex justify-between items-center mt-6 relative">

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>


          <div className="ml-auto">
            <FormButton text="Следующий шаг" onClick={handleSave} disabled={isButtonDisabled} />
          </div>
        </div>
      </FormContainer>
    </MainLayout>
  );
}
