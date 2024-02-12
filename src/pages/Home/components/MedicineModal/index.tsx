import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input,
  Select
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { useFetchCategoryQuery } from '../../../../services/category';
import { Medicine } from '../../../../types/medicine';
import { generateOptions } from '../../../../utils/form';

import {
  createInitFormValues,
  generateMedicine,
  IFormValues
} from '../helpers';

interface IMedicineModalProps {
  isOpen: boolean;
  medicine: Medicine | null;
  onCreate: (medicine: Medicine) => void;
  onUpdate: (medicine: Medicine) => void;
  onCancel: () => void
}

const MedicineModal: FC<IMedicineModalProps> = ({ isOpen, medicine, onCreate, onUpdate, onCancel }) => {
  const { data: categories = [] } = useFetchCategoryQuery({});
  const initialValues = createInitFormValues(medicine);
  const [ form ] = Form.useForm();
  
  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: IFormValues): void => {
    const newMed = generateMedicine(values, medicine, categories);
    
    onCloseModal();
    
    if ( medicine ) {
      onUpdate(newMed);
      return;
    }
  
    onCreate(newMed);
  };

  return (
    <BasicModal
      title={medicine?.id ? 'Edit medicine' : 'Add new medicine'}
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
          name="categoryNames"
          label="Category"
          rules={[
            { required: true, message: 'Please select category!' }
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select category"
            allowClear
            options={generateOptions(categories, 'name')}
          />
        </Form.Item>
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
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: 'Please input Amount!' },
            {
              type: 'number',
              min: 1,
              message: 'Amount must be minimum 1 characters!'
            }
          ]}
        >
          <Input type="number" min={1} data-testid="modal-medicine-amount" />
        </Form.Item>
        <Form.Item
          label="Expiration date"
          name="expiration_date"
          data-testid="expiration_date"
          rules={[ { required: true, message: 'Please input date!' } ]}
        >
          <Input type="datepicker" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          data-testid="description"
        >
          <Input type="textarea" rows={4} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(MedicineModal);
