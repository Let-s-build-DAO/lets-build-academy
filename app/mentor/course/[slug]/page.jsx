import SingleCourse from '@/app/_components/views/SingleCourse';
import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';

const page = () => {
  return (
    <AdminLayout>
      <SingleCourse />
    </AdminLayout>
  );
};

export default page;