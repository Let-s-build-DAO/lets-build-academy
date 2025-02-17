import SingleCourse from '@/src/components/views/SingleCourse';
import AdminLayout from '@/src/layouts/AdminLayout';
import React from 'react';

const page = () => {
  return (
    <AdminLayout>
      <SingleCourse />
    </AdminLayout>
  );
};

export default page;