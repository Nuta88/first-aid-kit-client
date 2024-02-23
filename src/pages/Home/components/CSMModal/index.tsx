import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input,
  Select,
  SelectOption
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { MedicinePriorityEnum } from '../../../../constants/medicine';
import { useFetchCategoryQuery } from '../../../../services/category';
import {
  useCreateConstantlyStoredMedicineMutation,
  useUpdateConstantlyStoredMedicineMutation
} from '../../../../services/constantlyStoredMedicine';
import { IConstantlyStoredMedicine } from '../../../../types/medicine';
import { generateOptions } from "../../../../utils/form";

import {
  createInitFormValues,
  generateMedicine,
  IFormValues,
  isMedicineExisted
} from './helpers';

interface IMedicineModalProps {
  isOpen: boolean;
  medicine: IConstantlyStoredMedicine | null;
  onCancel: () => void
}

const CSMModal: FC<IMedicineModalProps> = ({ isOpen, medicine, onCancel }) => {
  const isCreateMedicine = !medicine || !medicine.id || !medicine.priority;
  const title = isCreateMedicine ? 'Add medication to permanent storage' : 'Edit constantly stored medicine';
  const initialValues = createInitFormValues(medicine);
  const { data: categories = [] } = useFetchCategoryQuery({});
  const [ createConstantlyStoredMedicine ] = useCreateConstantlyStoredMedicineMutation({});
  const [ updateConstantlyStoredMedicine ] = useUpdateConstantlyStoredMedicineMutation({});
  const [ form ] = Form.useForm();
  const isDisabledFormItem = !!medicine && !isMedicineExisted(medicine);
  
  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };
  
  const onFinish = (values: IFormValues): void => {
    if (isCreateMedicine) {
      createConstantlyStoredMedicine(generateMedicine(values, categories));
    } else {
      updateConstantlyStoredMedicine({id: medicine.id, ...generateMedicine(values, categories)})
    }
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
          name="priority"
          label="Priority"
          rules={[
            { required: true, message: 'Please select priority!' }
          ]}
        >
          <Select
            placeholder="Select priority"
            allowClear
          >
            {Object.values(MedicinePriorityEnum).map((priority: string) => (
              <SelectOption
                key={priority}
                value={priority}>
                {priority}
              </SelectOption>
            ))}
          </Select>
        </Form.Item>
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
            disabled={isDisabledFormItem}
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
          <Input disabled={isDisabledFormItem} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          data-testid="description"
        >
          <Input type="textarea" rows={4} disabled={isDisabledFormItem} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(CSMModal);
