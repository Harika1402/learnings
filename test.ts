import React from 'react';
import {
  useStarredEntities,
} from '@backstage/plugin-catalog-react';
import {
  catalogApiRef,
  useApi,
  Entity,
} from '@backstage/core-plugin-api';
import {
  Table,
  EntityRefLink,
} from '@backstage/core-components';
import { IconButton, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export function StarredUsersTable() {
  const catalogApi = useApi(catalogApiRef);
  const { starredEntities, toggleStarredEntity } = useStarredEntities();

  // Filter only starred users
  const userEntities: Entity[] = starredEntities.filter(
    e => e.kind.toLowerCase() === 'user'
  );

  const columns = [
    {
      title: 'Name',
      field: 'name',
      render: (rowData: any) => (
        <EntityRefLink entityRef={rowData.entity} defaultKind="User" />
      ),
    },
    {
      title: 'Display Name',
      field: 'displayName',
    },
    {
      title: 'Email',
      field: 'email',
    },
    {
      title: 'Actions',
      field: 'actions',
      sorting: false,
      render: (rowData: any) => (
        <Tooltip title="Unstar">
          <IconButton
            onClick={() => toggleStarredEntity(rowData.entity)}
            size="small"
          >
            <StarIcon color="warning" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = userEntities.map(entity => {
    const metadata = entity.metadata || {};
    const spec = entity.spec || {};
    return {
      name: metadata.name,
      displayName: spec?.profile?.displayName ?? '',
      email: spec?.profile?.email ?? '',
      entity,
    };
  });

  return (
    <Table
      title="Starred Users"
      options={{ paging: true, search: true }}
      columns={columns}
      data={rows}
    />
  );
}
