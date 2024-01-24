import { useCallback } from "react";
import {
  AddIcon,
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  Page,
  SpaceBetween,
  Table,
  TooltipIconButton
} from '../../components';
import {
  useColumn,
  useModal,
  useQueryFilters
} from '../../hooks';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation
} from '../../services/category';
import { ICategory } from '../../types';
import { Medicine } from "../../types/medicine";
import { replaceUnderscoreToSpace } from '../../utils/string';
import CategoryModal from './components/CategoryModal';

const Category = (): JSX.Element => {
  const { query, setQuery } = useQueryFilters();
  const { data: categories = [] } = useFetchCategoryQuery(query);
  const [ createCategory ] = useCreateCategoryMutation();
  const [ updateCategory ] = useUpdateCategoryMutation();
  const [ deleteCategory ] = useDeleteCategoryMutation();
  const { getSearchProps } = useColumn(setQuery);
  const { isOpenModal, content: selectedCategory, hideModal, openModal } = useModal<ICategory>();
  const handleOpenModal = (category?: ICategory | null) => {
    if ( category ) return  openModal(category);
    
    openModal();
  };
  
  const handleCreateOrUpdate = useCallback((category: ICategory) => {
    if ( selectedCategory ) {
      updateCategory(category);
      return;
    }
    
    createCategory(category);
  }, [selectedCategory]);
  
  return (
    <Page
      extra={
        <TooltipIconButton
          tooltip="Add category"
          size="large"
          icon={<AddIcon />}
          data-testid="create-category-btn"
          onClick={() => handleOpenModal()}
        />
      }
    >
      <Table
        rowKey="id"
        size="small"
        dataSource={categories}
        scroll={{ y: 350 }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            ...getSearchProps('name'),
            render: (category) => replaceUnderscoreToSpace(category.name)?.toUpperCase()
          },
          {
            title: 'Action',
            key: 'action',
            width: 110,
            render: (_, category: ICategory) => (
              <SpaceBetween size="middle">
                <CircleButton
                  data-testid="edit-category-btn"
                  icon={<EditIcon />}
                  type="primary"
                  onClick={() => { handleOpenModal(category); }}
                />
                <Confirm
                  title={`Are you sure to delete "${category.name}"?`}
                  placement="leftTop"
                  onConfirm={() => { deleteCategory(category.id as number); }}
                >
                  <CircleButton type="primary" icon={<DeleteIcon />} />
                </Confirm>
              </SpaceBetween>
            )
          }
        ]}
      />
      {isOpenModal && (
        <CategoryModal
          isOpen={isOpenModal}
          category={selectedCategory}
          onCancel={hideModal}
          onSave={handleCreateOrUpdate}
        />
      )}
    </Page>
  );
};

export default Category;
