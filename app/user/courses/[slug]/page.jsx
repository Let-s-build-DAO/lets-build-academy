import SingleCourse from '@/app/_components/views/SingleCourse';
import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';

const CoursesPage = () => {
  return (
    <AdminLayout header={false}>
      <SingleCourse />
    </AdminLayout>
  );
};

export default CoursesPage;