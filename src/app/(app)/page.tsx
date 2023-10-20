'use client';

import * as React from 'react';

import Map from '@/components/Charts/Map/Map';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchProject } from '@/reducers/Projects/actions';
import { fetchUser } from '@/reducers/User/actions';

export default function Dashboard() {
  const { projects, user } = useAppSelector((state) => ({
    user: state.users,
    projects: state.projects,
  }));
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function useFetchProjectDispatch() {
      try {
        await Promise.all([dispatch(fetchProject()), dispatch(fetchUser())]);
      } catch (err) {
        toast('Unable to fetch projects', 'error');
      }
    }

    useFetchProjectDispatch();
  }, []);

  return (
    <main className="layout-app">
      <Map />
    </main>
  );
}
