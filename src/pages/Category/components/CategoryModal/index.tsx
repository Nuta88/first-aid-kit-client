import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { ICategory } from '../../../../types';
import { replaceSpaceToUnderscore } from '../../../../utils/string';

interface ICategoryModalProps {
  isOpen: boolean;
  category: ICategory | null;
  onSave: (category: ICategory) => void;
  onCancel: () => void
}

const CategoryModal: FC<ICategoryModalProps> = ({ isOpen, category, onSave, onCancel }) => {
  const title: string = category ? 'Edit category' : 'Add new category';
  const initialValues = category || {name: ''};
  const [ form ] = Form.useForm();
  
  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: ICategory): void => {
    onSave({
      ...initialValues,
      ...values,
      name: replaceSpaceToUnderscore(values.name).toLowerCase()
    })
    onCloseModal();
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText="Save"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="medicine-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          data-testid="name"
          rules={[
            { required: true, message: 'Please input name!' },
            {
              type: 'string',
              min: 2,
              max: 50,
              message: 'Recipient must be from 2 characters to 50 characters!'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(CategoryModal);
