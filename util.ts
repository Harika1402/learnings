export function StarredUserPicker({ onSelect }: { onSelect: (ref: string) => void }) {
  const catalogApi = useApi(catalogApiRef);
  const { suggestions, loading } = useEntityPicker({ kind: ['User'] });
  const {
    isStarredEntity,
    toggleStarredEntity,
  } = useStarredEntities();

  return (
    <Autocomplete
      options={suggestions}
      getOptionLabel={(option) => humanizeEntityRef(option.entity)}
      loading={loading}
      onChange={(_, value) => {
        if (value) {
          const ref = catalogApi.getEntityRef(value.entity);
          onSelect(ref);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select a user" variant="outlined" />
      )}
      renderOption={(props, option) => {
        const ref = catalogApi.getEntityRef(option.entity);
        const starred = isStarredEntity(option.entity);

        return (
          <Box
            component="li"
            {...props}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span>{humanizeEntityRef(option.entity)}</span>
            <Tooltip title={starred ? 'Unstar' : 'Star'}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Don't trigger selection
                  toggleStarredEntity(option.entity);
                }}
              >
                {starred ? <StarIcon color="warning" /> : <StarBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        );
      }}
    />
  );
}
